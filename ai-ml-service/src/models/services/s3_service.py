"""
S3 Storage Service for AI/ML service
Handles uploading watermarked images to S3-compatible storage (beget.com)
"""

import boto3
from botocore.config import Config
import logging
import asyncio
import io
import uuid
from datetime import datetime
from typing import Optional, Dict, Any

from ..config import settings

logger = logging.getLogger(__name__)


class S3Service:
    """Service for S3-compatible storage operations"""
    
    def __init__(self):
        self.client = None
        self._initialized = False
        
    def _ensure_client(self):
        """Lazy initialization of S3 client"""
        if self._initialized:
            return
            
        try:
            self.client = boto3.client(
                's3',
                aws_access_key_id=getattr(settings, 's3_access_key_id', None),
                aws_secret_access_key=getattr(settings, 's3_secret_access_key', None),
                endpoint_url=getattr(settings, 's3_endpoint', 'https://s3.beget.com'),
                region_name=getattr(settings, 's3_region', 'ru-msk'),
                config=Config(
                    signature_version='s3v4',
                    s3={'addressing_style': 'path'}
                )
            )
            self.bucket = getattr(settings, 's3_bucket', 'virtual-gallery-images')
            self._initialized = True
            logger.info(f"S3 client initialized for bucket: {self.bucket}")
        except Exception as e:
            logger.error(f"Failed to initialize S3 client: {e}")
            self._initialized = False
    
    def generate_s3_key(
        self,
        filename: str,
        prefix: str = "digitized",
        artwork_id: Optional[str] = None
    ) -> str:
        """Generate unique S3 key for the file"""
        timestamp = datetime.utcnow().strftime('%Y%m%d')
        unique_id = uuid.uuid4().hex[:8]
        
        if artwork_id:
            return f"{prefix}/{timestamp}/{artwork_id}/{unique_id}_{filename}"
        return f"{prefix}/{timestamp}/{unique_id}_{filename}"
    
    async def upload_bytes(
        self,
        data: bytes,
        key: str,
        content_type: str = "image/jpeg",
        metadata: Optional[Dict[str, str]] = None
    ) -> Dict[str, Any]:
        """Upload bytes to S3 and return URL"""
        self._ensure_client()
        
        if not self.client:
            logger.warning("S3 client not available, returning mock URL")
            return {
                "success": False,
                "url": None,
                "key": key,
                "error": "S3 client not initialized"
            }
        
        try:
            extra_args = {
                'ContentType': content_type,
                'ACL': 'public-read'
            }
            
            if metadata:
                extra_args['Metadata'] = metadata
            
            # boto3 синхронный: выполняем в потоке, чтобы не блокировать цикл событий
            await asyncio.to_thread(
                self.client.upload_fileobj,
                io.BytesIO(data),
                self.bucket,
                key,
                ExtraArgs=extra_args
            )
            
            url = f"{getattr(settings, 's3_endpoint', 'https://s3.beget.com')}/{self.bucket}/{key}"
            
            logger.info(f"Uploaded to S3: {key}")
            
            return {
                "success": True,
                "url": url,
                "key": key,
                "bucket": self.bucket
            }
            
        except Exception as e:
            logger.error(f"S3 upload failed: {e}")
            return {
                "success": False,
                "url": None,
                "key": key,
                "error": str(e)
            }
    
    async def upload_base64(
        self,
        base64_data: str,
        key: str,
        content_type: str = "image/jpeg",
        metadata: Optional[Dict[str, str]] = None
    ) -> Dict[str, Any]:
        """Upload base64 encoded data to S3"""
        import base64 as b64
        
        try:
            data = b64.b64decode(base64_data)
            return await self.upload_bytes(data, key, content_type, metadata)
        except Exception as e:
            logger.error(f"Failed to decode base64 for upload: {e}")
            return {
                "success": False,
                "url": None,
                "key": key,
                "error": str(e)
            }
    
    async def delete_file(self, key: str) -> bool:
        """Delete file from S3"""
        self._ensure_client()
        
        if not self.client:
            return False
        
        try:
            await asyncio.to_thread(self.client.delete_object, Bucket=self.bucket, Key=key)
            logger.info(f"Deleted from S3: {key}")
            return True
        except Exception as e:
            logger.error(f"Failed to delete from S3: {e}")
            return False
    
    def get_public_url(self, key: str) -> str:
        """Get public URL for S3 object"""
        return f"{getattr(settings, 's3_endpoint', 'https://s3.beget.com')}/{self.bucket}/{key}"


s3_service = S3Service()
