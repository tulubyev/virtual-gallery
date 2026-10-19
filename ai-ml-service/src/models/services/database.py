"""
Database service for PostgreSQL connection and operations
"""

import asyncpg
import logging
from typing import Optional, Dict, Any
from ..config import settings

logger = logging.getLogger(__name__)

class DatabaseService:
    """Database service for managing PostgreSQL connections"""

    def __init__(self):
        self.pool: Optional[asyncpg.Pool] = None

    async def connect(self):
        """Initialize database connection pool"""
        try:
            self.pool = await asyncpg.create_pool(
                settings.database_url,
                min_size=5,
                max_size=20,
                command_timeout=60
            )
            logger.info("Database connection pool created successfully")
        except Exception as e:
            logger.error(f"Failed to create database connection pool: {e}")
            raise

    async def disconnect(self):
        """Close database connection pool"""
        if self.pool:
            await self.pool.close()
            logger.info("Database connection pool closed")

    async def execute(self, query: str, *args) -> str:
        """Execute a query and return the status"""
        async with self.pool.acquire() as conn:
            return await conn.execute(query, *args)

    async def fetch(self, query: str, *args) -> list:
        """Fetch multiple rows"""
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, *args)

    async def fetchrow(self, query: str, *args) -> Optional[Dict[str, Any]]:
        """Fetch a single row"""
        async with self.pool.acquire() as conn:
            row = await conn.fetchrow(query, *args)
            return dict(row) if row else None

    async def fetchval(self, query: str, *args) -> Any:
        """Fetch a single value"""
        async with self.pool.acquire() as conn:
            return await conn.fetchval(query, *args)

# Global database service instance
db_service = DatabaseService()

async def init_db():
    """Initialize database service"""
    await db_service.connect()

async def close_db():
    """Close database service"""
    await db_service.disconnect()

async def check_db_connection() -> Dict[str, Any]:
    """Check database connection health"""
    try:
        # Simple query to test connection
        result = await db_service.fetchval("SELECT 1")
        return {
            "healthy": True,
            "response_time": "ok",
            "details": "Database connection successful"
        }
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return {
            "healthy": False,
            "error": str(e),
            "details": "Database connection failed"
        }