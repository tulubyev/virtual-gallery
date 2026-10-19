"""
External Art Sources Service
Integrates with WikiArt, Museum APIs, and other art databases
for enriching the RAG knowledge base
"""

import logging
import aiohttp
from aiohttp import ClientTimeout
import json
from typing import Dict, Any, Optional, List
from datetime import datetime
import asyncio

logger = logging.getLogger(__name__)


class ExternalSourcesService:
    """Service for fetching and indexing data from external art sources"""
    
    def __init__(self):
        self.wikiart_base = "https://www.wikiart.org/en/api/2"
        self.met_base = "https://collectionapi.metmuseum.org/public/collection/v1"
        self.rijks_base = "https://www.rijksmuseum.nl/api/en/collection"
        self.harvard_base = "https://api.harvardartmuseums.org"
        self.session = None
        
    async def _get_session(self):
        if self.session is None or self.session.closed:
            self.session = aiohttp.ClientSession()
        return self.session
    
    async def close(self):
        if self.session and not self.session.closed:
            await self.session.close()
    
    async def fetch_wikiart_artists(self, letter: str = None, page: int = 1) -> List[Dict[str, Any]]:
        """Fetch artists from WikiArt"""
        try:
            session = await self._get_session()
            url = f"{self.wikiart_base}/Artists"
            params = {"page": page}
            if letter:
                params["letter"] = letter
            
            async with session.get(url, params=params, timeout=ClientTimeout(total=30)) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("data", []) if isinstance(data, dict) else data
                logger.warning(f"WikiArt API returned status {response.status}")
                return []
        except Exception as e:
            logger.error(f"Failed to fetch WikiArt artists: {e}")
            return []
    
    async def fetch_wikiart_artist_details(self, artist_url: str) -> Optional[Dict[str, Any]]:
        """Fetch detailed artist info from WikiArt"""
        try:
            session = await self._get_session()
            url = f"{self.wikiart_base}/Artist/{artist_url}"
            
            async with session.get(url, timeout=ClientTimeout(total=30)) as response:
                if response.status == 200:
                    return await response.json()
                return None
        except Exception as e:
            logger.error(f"Failed to fetch WikiArt artist details: {e}")
            return None
    
    async def fetch_wikiart_artworks(self, artist_url: str) -> List[Dict[str, Any]]:
        """Fetch artworks by artist from WikiArt"""
        try:
            session = await self._get_session()
            url = f"{self.wikiart_base}/Paintings"
            params = {"artistUrl": artist_url}
            
            async with session.get(url, params=params, timeout=ClientTimeout(total=30)) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("data", []) if isinstance(data, dict) else data
                return []
        except Exception as e:
            logger.error(f"Failed to fetch WikiArt artworks: {e}")
            return []
    
    async def fetch_met_objects(self, department_id: int = None, search_query: str = None) -> List[int]:
        """Fetch object IDs from Metropolitan Museum of Art"""
        try:
            session = await self._get_session()
            
            if search_query:
                url = f"{self.met_base}/search"
                params = {"q": search_query, "hasImages": "true"}
            else:
                url = f"{self.met_base}/objects"
                params = {"departmentIds": department_id} if department_id else {}
            
            async with session.get(url, params=params, timeout=ClientTimeout(total=60)) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("objectIDs", [])[:100]
                return []
        except Exception as e:
            logger.error(f"Failed to fetch MET objects: {e}")
            return []
    
    async def fetch_met_object_details(self, object_id: int) -> Optional[Dict[str, Any]]:
        """Fetch detailed object info from MET"""
        try:
            session = await self._get_session()
            url = f"{self.met_base}/objects/{object_id}"
            
            async with session.get(url, timeout=ClientTimeout(total=30)) as response:
                if response.status == 200:
                    data = await response.json()
                    return {
                        "source": "met",
                        "external_id": str(object_id),
                        "title": data.get("title"),
                        "artist": data.get("artistDisplayName"),
                        "artist_bio": data.get("artistDisplayBio"),
                        "date": data.get("objectDate"),
                        "period": data.get("period") or data.get("dynasty"),
                        "culture": data.get("culture"),
                        "medium": data.get("medium"),
                        "dimensions": data.get("dimensions"),
                        "department": data.get("department"),
                        "classification": data.get("classification"),
                        "image_url": data.get("primaryImage"),
                        "gallery_url": data.get("objectURL"),
                        "country": data.get("country"),
                        "region": data.get("region"),
                        "provenance": data.get("creditLine"),
                        "is_public_domain": data.get("isPublicDomain", False)
                    }
                return None
        except Exception as e:
            logger.error(f"Failed to fetch MET object details: {e}")
            return None
    
    async def fetch_rijks_collection(self, query: str = None, page: int = 1, api_key: str = None) -> List[Dict[str, Any]]:
        """Fetch artworks from Rijksmuseum"""
        try:
            if not api_key:
                logger.warning("Rijksmuseum API key not provided")
                return []
            
            session = await self._get_session()
            params = {
                "key": api_key,
                "p": page,
                "ps": 100,
                "format": "json",
                "imgonly": "True"
            }
            if query:
                params["q"] = query
            
            async with session.get(self.rijks_base, params=params, timeout=ClientTimeout(total=30)) as response:
                if response.status == 200:
                    data = await response.json()
                    artworks = []
                    for obj in data.get("artObjects", []):
                        artworks.append({
                            "source": "rijksmuseum",
                            "external_id": obj.get("objectNumber"),
                            "title": obj.get("title"),
                            "artist": obj.get("principalOrFirstMaker"),
                            "image_url": obj.get("webImage", {}).get("url") if obj.get("webImage") else None,
                            "gallery_url": obj.get("links", {}).get("web") if obj.get("links") else None
                        })
                    return artworks
                return []
        except Exception as e:
            logger.error(f"Failed to fetch Rijksmuseum collection: {e}")
            return []
    
    async def fetch_harvard_objects(self, query: str = None, classification: str = None, api_key: str = None) -> List[Dict[str, Any]]:
        """Fetch artworks from Harvard Art Museums"""
        try:
            if not api_key:
                logger.warning("Harvard Art Museums API key not provided")
                return []
            
            session = await self._get_session()
            params = {
                "apikey": api_key,
                "size": 100,
                "hasimage": 1
            }
            if query:
                params["q"] = query
            if classification:
                params["classification"] = classification
            
            url = f"{self.harvard_base}/object"
            
            async with session.get(url, params=params, timeout=ClientTimeout(total=30)) as response:
                if response.status == 200:
                    data = await response.json()
                    artworks = []
                    for record in data.get("records", []):
                        people = record.get("people", [])
                        artist = people[0].get("name") if people else None
                        
                        artworks.append({
                            "source": "harvard",
                            "external_id": str(record.get("id")),
                            "title": record.get("title"),
                            "artist": artist,
                            "date": record.get("dated"),
                            "period": record.get("period"),
                            "culture": record.get("culture"),
                            "medium": record.get("medium"),
                            "classification": record.get("classification"),
                            "technique": record.get("technique"),
                            "dimensions": record.get("dimensions"),
                            "image_url": record.get("primaryimageurl"),
                            "gallery_url": record.get("url"),
                            "department": record.get("department"),
                            "provenance": record.get("provenance")
                        })
                    return artworks
                return []
        except Exception as e:
            logger.error(f"Failed to fetch Harvard objects: {e}")
            return []
    
    def normalize_artwork_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize artwork data from different sources to common format"""
        
        text_parts = []
        
        if data.get("title"):
            text_parts.append(f"Title: {data['title']}")
        if data.get("artist"):
            text_parts.append(f"Artist: {data['artist']}")
        if data.get("artist_bio"):
            text_parts.append(f"Artist Bio: {data['artist_bio']}")
        if data.get("date"):
            text_parts.append(f"Date: {data['date']}")
        if data.get("period"):
            text_parts.append(f"Period: {data['period']}")
        if data.get("medium"):
            text_parts.append(f"Medium/Technique: {data['medium']}")
        if data.get("culture"):
            text_parts.append(f"Culture: {data['culture']}")
        if data.get("classification"):
            text_parts.append(f"Classification: {data['classification']}")
        if data.get("dimensions"):
            text_parts.append(f"Dimensions: {data['dimensions']}")
        if data.get("department"):
            text_parts.append(f"Museum Department: {data['department']}")
        if data.get("provenance"):
            text_parts.append(f"Provenance: {data['provenance']}")
        if data.get("country") or data.get("region"):
            location = ", ".join(filter(None, [data.get("country"), data.get("region")]))
            text_parts.append(f"Origin: {location}")
        
        return {
            "source": data.get("source", "unknown"),
            "external_id": data.get("external_id"),
            "title": data.get("title"),
            "artist": data.get("artist"),
            "searchable_text": "\n".join(text_parts),
            "metadata": {
                "date": data.get("date"),
                "period": data.get("period"),
                "medium": data.get("medium"),
                "technique": data.get("technique"),
                "culture": data.get("culture"),
                "classification": data.get("classification"),
                "dimensions": data.get("dimensions"),
                "department": data.get("department"),
                "country": data.get("country"),
                "region": data.get("region"),
                "provenance": data.get("provenance"),
                "is_public_domain": data.get("is_public_domain")
            },
            "image_url": data.get("image_url"),
            "gallery_url": data.get("gallery_url"),
            "indexed_at": datetime.utcnow().isoformat()
        }
    
    async def batch_fetch_met_details(self, object_ids: List[int], concurrency: int = 10) -> List[Dict[str, Any]]:
        """Batch fetch MET object details with rate limiting"""
        semaphore = asyncio.Semaphore(concurrency)
        
        async def fetch_with_limit(obj_id: int):
            async with semaphore:
                await asyncio.sleep(0.1)
                return await self.fetch_met_object_details(obj_id)
        
        tasks = [fetch_with_limit(obj_id) for obj_id in object_ids]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        return [r for r in results if isinstance(r, dict)]


external_sources_service = ExternalSourcesService()
