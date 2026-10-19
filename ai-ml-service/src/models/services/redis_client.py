"""
Redis client service for caching and task queues
"""

import redis.asyncio as redis
import logging
from typing import Optional, Dict, Any
from ..config import settings

logger = logging.getLogger(__name__)

class RedisService:
    """Redis service for caching and queues"""

    def __init__(self):
        self.client: Optional[redis.Redis] = None

    async def connect(self):
        """Initialize Redis client"""
        try:
            self.client = redis.from_url(settings.redis_url)
            # Test connection
            await self.client.ping()
            logger.info("Redis client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Redis client: {e}")
            raise

    async def disconnect(self):
        """Close Redis connection"""
        if self.client:
            await self.client.close()
            logger.info("Redis connection closed")

    async def set(self, key: str, value: str, expire: int = None):
        """Set a key-value pair"""
        await self.client.set(key, value, ex=expire)

    async def get(self, key: str) -> Optional[str]:
        """Get a value by key"""
        return await self.client.get(key)

    async def delete(self, key: str):
        """Delete a key"""
        await self.client.delete(key)

    async def exists(self, key: str) -> bool:
        """Check if key exists"""
        return await self.client.exists(key)

    async def publish(self, channel: str, message: str):
        """Publish message to channel"""
        await self.client.publish(channel, message)

    async def subscribe(self, channel: str):
        """Subscribe to channel"""
        pubsub = self.client.pubsub()
        await pubsub.subscribe(channel)
        return pubsub

# Global Redis service instance
redis_service = RedisService()

async def init_redis():
    """Initialize Redis service"""
    await redis_service.connect()

async def close_redis():
    """Close Redis service"""
    await redis_service.disconnect()

async def check_redis_connection() -> Dict[str, Any]:
    """Check Redis connection health"""
    try:
        # Test ping
        pong = await redis_service.client.ping()
        if pong:
            return {
                "healthy": True,
                "response_time": "ok",
                "details": "Redis connection successful"
            }
        else:
            return {
                "healthy": False,
                "error": "No pong response",
                "details": "Redis ping failed"
            }
    except Exception as e:
        logger.error(f"Redis health check failed: {e}")
        return {
            "healthy": False,
            "error": str(e),
            "details": "Redis connection failed"
        }