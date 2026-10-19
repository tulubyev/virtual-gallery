"""
Схемы структурного вывода и промпты для разбора лица и оборота произведения.

Правила, зашитые в промпты (см. docs/AI-ML-DESIGN.md, решения 4 и 9):
* только то, что видно на снимке; отсутствующее — null или пустой список, не догадки;
* никаких вердиктов о подлинности и никаких процентов «уверенности» (модель их выдумывает) —
  вместо них список `uncertainties`;
* автор указывается как кандидат с основанием, а не как установленный факт;
* оборот читается дословно, нечитаемое перечисляется отдельно.
Все поля обязательны (strict-режим json_schema); «пусто» выражается null или [].
"""

from typing import Any, Dict

NULLABLE_STRING = {"type": ["string", "null"]}
STRING_LIST = {"type": "array", "items": {"type": "string"}}


def _object(properties: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "type": "object",
        "properties": properties,
        "required": list(properties.keys()),
        "additionalProperties": False,
    }


FRONT_SCHEMA = _object({
    "suggested_title": NULLABLE_STRING,
    "description": {"type": "string"},
    "style": NULLABLE_STRING,
    "period": NULLABLE_STRING,
    "technique": NULLABLE_STRING,
    "genre": NULLABLE_STRING,
    "composition": {"type": "string"},
    "color_palette": STRING_LIST,
    "artistic_elements": STRING_LIST,
    "condition_notes": NULLABLE_STRING,
    "visible_text": STRING_LIST,
    "suggested_artist": NULLABLE_STRING,
    "attribution_basis": NULLABLE_STRING,
    "influences": STRING_LIST,
    "uncertainties": STRING_LIST,
})

BACK_SCHEMA = _object({
    "signatures": STRING_LIST,
    "stamps": STRING_LIST,
    "labels": STRING_LIST,
    "inventory_numbers": STRING_LIST,
    "inscriptions": STRING_LIST,
    "dates": STRING_LIST,
    "gallery_marks": STRING_LIST,
    "auction_marks": STRING_LIST,
    "provenance": NULLABLE_STRING,
    "conservation_notes": NULLABLE_STRING,
    "raw_text": {"type": "string"},
    "illegible": STRING_LIST,
    "languages": STRING_LIST,
    "contains_personal_data": {"type": "boolean"},
})

FRONT_SYSTEM_PROMPT = """Ты — помощник искусствоведа в виртуальной арт-галерее. Тебе показывают фотографию лицевой стороны произведения.
Опиши только то, что действительно видно на снимке, на русском языке.
Правила:
1. Если признак не виден или ты не уверен — верни null (для строк) или пустой список, а сомнения перечисли в поле uncertainties.
2. Не придумывай автора, название, дату и место. Автора указывай в suggested_artist только как кандидата, если на работе есть читаемая подпись или явные стилистические основания; основание запиши в attribution_basis. Иначе оба поля null.
3. Не делай выводов о подлинности и не называй цену или оценочную стоимость.
4. Не называй проценты или баллы уверенности.
5. description — 2–4 предложения о сюжете и манере письма без оценочных эпитетов и без выдуманных фактов.
6. visible_text — дословно весь читаемый текст на лицевой стороне (подпись, дата, надписи).
Ответь только JSON по заданной схеме."""

BACK_SYSTEM_PROMPT = """Ты — помощник по документированию произведений искусства. Тебе показывают фотографию оборота произведения (или кропы его частей).
Прочитай все надписи и отметки на русском, латинице и других языках, которые видишь.
Правила:
1. Переписывай текст дословно, сохраняя написание, регистр, знаки и язык оригинала; ничего не исправляй и не переводи.
2. Нечитаемое или сомнительное не угадывай: опиши место и характер в поле illegible (например «нижний левый угол, чернила, не разобрать»).
3. Каждую надпись относи к одной категории: подпись, штамп/печать, наклейка, инвентарный или каталожный номер, дата, отметка галереи, отметка аукциона, прочие надписи.
4. provenance заполняй только если история владения прямо написана на обороте; иначе null. Историю владения не восстанавливай.
5. raw_text — весь читаемый текст построчно, дословно.
6. contains_personal_data = true, если на обороте есть имена частных лиц, адреса, телефоны или иные персональные данные.
7. Не делай выводов о подлинности. Не называй проценты уверенности.
Ответь только JSON по заданной схеме."""

FRONT_USER_TEXT = "Фотография лицевой стороны произведения. Заполни схему."
BACK_USER_TEXT = "Фотография оборота произведения. Заполни схему."
