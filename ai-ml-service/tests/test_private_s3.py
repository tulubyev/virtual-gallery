"""Приватные объекты S3 для оборота, подписанные ссылки и обработка персональных данных на обороте."""

import base64
import json
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from src.models.config import settings
from src.models.routes import digitization
from src.models.services.s3_service import S3Service


def service_with_fake_client():
    service = S3Service()
    service.client = MagicMock()
    service.bucket = settings.s3_bucket
    service._initialized = True
    return service


@pytest.mark.asyncio
async def test_upload_is_private_by_default_and_public_only_on_request():
    service = service_with_fake_client()
    private = await service.upload_bytes(b"x", "digitized/b.jpg")
    public = await service.upload_bytes(b"x", "digitized/f.jpg", public=True)
    acls = [call.kwargs["ExtraArgs"]["ACL"] for call in service.client.upload_fileobj.call_args_list]
    assert acls == ["private", "public-read"]
    assert private["url"] is None and private["uri"] == f"s3://{settings.s3_bucket}/digitized/b.jpg"
    assert public["url"].endswith("/digitized/f.jpg")


@pytest.mark.asyncio
async def test_upload_base64_passes_public_flag():
    service = service_with_fake_client()
    await service.upload_base64(base64.b64encode(b"data").decode(), "k.jpg", public=True)
    assert service.client.upload_fileobj.call_args.kwargs["ExtraArgs"]["ACL"] == "public-read"


def test_presigned_url_and_present_url():
    import boto3

    service = S3Service()
    service.client = boto3.client("s3", aws_access_key_id="AK", aws_secret_access_key="SK",
                                  endpoint_url="https://s3.example.org", region_name="ru-1")
    service.bucket = settings.s3_bucket
    service._initialized = True
    url = service.generate_presigned_url("digitized/b.jpg", expires=120)
    assert "digitized/b.jpg" in url and "X-Amz-Expires=120" in url and "X-Amz-Signature=" in url

    assert service.present_url(f"s3://{settings.s3_bucket}/digitized/b.jpg").startswith("https://s3.example.org")
    assert service.present_url("https://cdn.example.org/a.jpg") == "https://cdn.example.org/a.jpg"
    assert service.present_url(None) is None
    assert service.present_url("s3://other-bucket/x.jpg") is None      # чужой бакет не подписываем
    assert service.present_url(f"s3://{settings.s3_bucket}/") is None


class Ctx:
    task_id = "dig_abc"

    async def progress(self, percent, step):
        pass


FRONT = {"suggested_title": "Т", "suggested_artist": None, "style": "реализм", "period": None, "technique": None,
         "genre": None, "description": "Д", "color_palette": [], "uncertainties": []}


def back(pii):
    return {"signatures": [], "stamps": [], "labels": [], "inventory_numbers": [], "inscriptions": [], "dates": [],
            "gallery_marks": [], "auction_marks": [], "provenance": "Коллекция И. Петрова, ул. Ленина 5",
            "conservation_notes": None, "raw_text": "…", "illegible": [], "languages": ["ru"],
            "contains_personal_data": pii}


async def run(pii):
    payload = {"front_image_url": "https://example.org/f.jpg", "back_image_url": "https://example.org/b.jpg",
               "visible_watermark": False, "invisible_watermark": True, "generate_nft": True}
    uploads = []

    async def upload(**kwargs):
        uploads.append(kwargs)
        side = kwargs["metadata"]["side"]
        return {"success": True, "url": f"https://s3/{side}.jpg" if kwargs.get("public") else None,
                "uri": f"s3://{settings.s3_bucket}/{side}.jpg"}

    mark = {"watermarked_image_base64": "QQ==", "verification_hash": "a" * 32,
            "visible_watermark_applied": False, "invisible_watermark_applied": True}
    fetchrow = AsyncMock(return_value={"id": 5})
    with patch.object(digitization.ai_service, "analyze_artwork_front", AsyncMock(return_value=dict(FRONT))), \
         patch.object(digitization.ai_service, "analyze_artwork_back", AsyncMock(return_value=back(pii))), \
         patch.object(digitization.watermark_service, "apply_watermarks", AsyncMock(return_value=mark)), \
         patch.object(digitization.watermark_service, "apply_watermarks_with_hash", AsyncMock(return_value=mark)), \
         patch.object(digitization.s3_service, "upload_base64", side_effect=upload), \
         patch.object(digitization.db_service, "fetchrow", fetchrow):
        result = await digitization.run_digitization(payload, Ctx())
    return result, uploads, fetchrow.call_args.args


@pytest.mark.asyncio
async def test_front_is_public_back_is_private_and_stored_as_uri():
    result, uploads, args = await run(pii=False)
    by_side = {u["metadata"]["side"]: u for u in uploads}
    assert by_side["front"]["public"] is True and not by_side["back"].get("public")
    assert "https://s3/front.jpg" in args                                   # публичный URL лица
    assert f"s3://{settings.s3_bucket}/back.jpg" in args                    # у оборота только URI
    assert "https://s3/back.jpg" not in args


@pytest.mark.asyncio
async def test_personal_data_on_back_stays_out_of_provenance_and_nft():
    _, _, args = await run(pii=True)
    assert "Коллекция И. Петрова, ул. Ленина 5" not in [a for a in args if isinstance(a, str) and not a.startswith("{")]
    nft = next(json.loads(a) for a in args if isinstance(a, str) and a.startswith('{"name"'))
    assert "Петрова" not in json.dumps(nft, ensure_ascii=False) and "Ленина" not in json.dumps(nft, ensure_ascii=False)
    analysis = next(json.loads(a) for a in args if isinstance(a, str) and a.startswith('{"front"'))
    assert analysis["contains_personal_data"] is True                          # внутренняя запись сохраняет флаг


@pytest.mark.asyncio
async def test_without_personal_data_provenance_is_kept():
    _, _, args = await run(pii=False)
    assert "Коллекция И. Петрова, ул. Ленина 5" in args


@pytest.mark.asyncio
async def test_index_excludes_back_text_when_personal_data_flag_set():
    analysis = {"front": dict(FRONT), "back": back(True), "contains_personal_data": True}
    row = {"id": 5, "title": "Т", "artist": None, "style": None, "period": None, "technique": None, "genre": None,
           "ai_analysis": json.dumps(analysis), "provenance": None}
    with patch.object(digitization.ai_service, "generate_embeddings", AsyncMock(return_value=[[0.1]])) as embed, \
         patch.object(digitization.qdrant_service, "ensure_collection"), \
         patch.object(digitization.qdrant_service, "upsert_points") as upsert:
        assert await digitization.index_artwork_in_qdrant(row) is True
    assert "Петрова" not in embed.call_args.args[0][0] and "Провенанс" not in embed.call_args.args[0][0]
    payload = upsert.call_args.kwargs["points"][0]["payload"]
    assert payload["back_analysis"] is None and payload["contains_personal_data"] is True and payload["access"] == "internal"
    assert not payload["provenance"]
