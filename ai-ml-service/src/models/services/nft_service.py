"""
NFT/TAE Metadata Service
Generates ERC-721 compatible metadata for digitized artworks
Supports limited edition token attribute extensions
"""

import logging
import hashlib
import copy
from datetime import datetime
from typing import Dict, Any, Optional, List
import json

logger = logging.getLogger(__name__)


class NFTMetadataService:
    """Generate ERC-721 compatible NFT metadata for digitized artworks"""
    
    def __init__(self):
        self.gallery_name = "Virtual Art Gallery"
        self.gallery_url = "https://virtual-art-gallery.replit.app"
        
    def generate_metadata(
        self,
        title: str,
        artist: str,
        front_analysis: Dict[str, Any],
        back_analysis: Optional[Dict[str, Any]] = None,
        image_url: str = "",
        verification_hash: str = "",
        edition_number: int = 1,
        edition_total: int = 1,
        external_url: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate ERC-721 compatible NFT metadata
        
        Returns JSON structure compatible with OpenSea, Rarible, and other marketplaces
        """
        
        description = self._generate_description(
            title=title,
            artist=artist,
            front_analysis=front_analysis,
            back_analysis=back_analysis
        )
        
        attributes = self._generate_attributes(
            front_analysis=front_analysis,
            back_analysis=back_analysis,
            artist=artist,
            edition_number=edition_number,
            edition_total=edition_total,
            verification_hash=verification_hash
        )
        
        properties = self._generate_properties(
            front_analysis=front_analysis,
            back_analysis=back_analysis,
            verification_hash=verification_hash
        )
        
        metadata = {
            "name": title,
            "description": description,
            "image": image_url,
            "external_url": external_url or f"{self.gallery_url}/artwork/{verification_hash}",
            "attributes": attributes,
            "properties": properties,
            "background_color": self._extract_background_color(front_analysis),
            "animation_url": None,
            "created_by": artist,
            "edition": {
                "number": edition_number,
                "total": edition_total
            },
            # Разбор выполнен ИИ; подлинность и провенанс экспертом не проверены, пока куратор не подтвердит
            "verification": {
                "verification_hash": verification_hash,
                "gallery": self.gallery_name,
                "digitized_at": datetime.utcnow().isoformat() + "Z",
                "certificate_type": "TAE",
                "status": "ai_analysis_unverified",
                "expert_verified": False,
                "provenance_documented": bool(back_analysis and back_analysis.get("provenance"))
            }
        }
        
        return metadata
    
    def _generate_description(
        self,
        title: str,
        artist: str,
        front_analysis: Dict[str, Any],
        back_analysis: Optional[Dict[str, Any]] = None
    ) -> str:
        """Generate artwork description from AI analysis"""
        
        parts = []
        
        ai_description = front_analysis.get("description", "")
        if ai_description:
            parts.append(ai_description)
        else:
            parts.append(f'"{title}" by {artist}.')
        
        style = front_analysis.get("style")
        period = front_analysis.get("period")
        technique = front_analysis.get("technique")
        
        if style or period or technique:
            style_parts = []
            if style:
                style_parts.append(style)
            if period:
                style_parts.append(f"({period})")
            if technique:
                style_parts.append(f"executed in {technique}")
            parts.append(" ".join(style_parts))
        
        if back_analysis and back_analysis.get("provenance"):
            parts.append(f"\n\nProvenance: {back_analysis['provenance']}")
        
        parts.append(f"\n\nDigitized by {self.gallery_name}. Description is AI-assisted and not verified by an expert.")
        
        return " ".join(parts)
    
    def _generate_attributes(
        self,
        front_analysis: Dict[str, Any],
        back_analysis: Optional[Dict[str, Any]],
        artist: str,
        edition_number: int,
        edition_total: int,
        verification_hash: str
    ) -> List[Dict[str, Any]]:
        """Generate OpenSea-compatible attributes array"""
        
        attributes = []
        
        attributes.append({
            "trait_type": "Artist",
            "value": artist
        })
        
        if front_analysis.get("style"):
            attributes.append({
                "trait_type": "Style",
                "value": front_analysis["style"]
            })
        
        if front_analysis.get("period"):
            attributes.append({
                "trait_type": "Period",
                "value": front_analysis["period"]
            })
        
        if front_analysis.get("technique"):
            attributes.append({
                "trait_type": "Technique",
                "value": front_analysis["technique"]
            })
        
        if front_analysis.get("genre"):
            attributes.append({
                "trait_type": "Genre",
                "value": front_analysis["genre"]
            })
        
        if front_analysis.get("medium"):
            attributes.append({
                "trait_type": "Medium",
                "value": front_analysis["medium"]
            })
        
        if front_analysis.get("dimensions"):
            attributes.append({
                "trait_type": "Dimensions",
                "value": front_analysis["dimensions"]
            })
        
        dominant_colors = front_analysis.get("dominant_colors", [])
        if dominant_colors:
            for i, color in enumerate(dominant_colors[:3]):
                attributes.append({
                    "trait_type": f"Color {i+1}",
                    "value": color
                })
        
        mood = front_analysis.get("mood")
        if mood:
            attributes.append({
                "trait_type": "Mood",
                "value": mood
            })
        
        subject = front_analysis.get("subject")
        if subject:
            attributes.append({
                "trait_type": "Subject",
                "value": subject
            })
        
        attributes.append({
            "trait_type": "Edition",
            "value": f"{edition_number} of {edition_total}"
        })
        
        attributes.append({
            "trait_type": "Rarity",
            "value": self._calculate_rarity(edition_total)
        })
        
        attributes.append({
            "display_type": "number",
            "trait_type": "Edition Number",
            "value": edition_number,
            "max_value": edition_total
        })
        
        attributes.append({
            "trait_type": "Verification",
            "value": "AI analysis, not expert-verified"
        })
        
        attributes.append({
            "trait_type": "Gallery",
            "value": self.gallery_name
        })
        
        if back_analysis:
            if back_analysis.get("provenance"):
                attributes.append({
                    "trait_type": "Provenance Status",
                    "value": "Documented"
                })
            
            if back_analysis.get("exhibition_history"):
                attributes.append({
                    "trait_type": "Exhibition History",
                    "value": "Available"
                })
            
            if back_analysis.get("condition"):
                attributes.append({
                    "trait_type": "Condition",
                    "value": back_analysis["condition"]
                })
        
        return attributes
    
    def _generate_properties(
        self,
        front_analysis: Dict[str, Any],
        back_analysis: Optional[Dict[str, Any]],
        verification_hash: str
    ) -> Dict[str, Any]:
        """Generate extended properties for TAE (Token Authenticity Extension)"""
        
        properties = {
            "category": "art",
            "files": [],
            "creators": [],
            "royalty": {
                "basis_points": 1000,
                "locked": False
            },
            "tae": {
                "version": "1.0",
                "verification_hash": verification_hash,
                "digitization_method": "AI-assisted",
                "watermark_embedded": True,
                "expert_verified": False
            }
        }
        
        if front_analysis.get("suggested_artist"):
            properties["creators"].append({
                "address": "",
                "share": 100,
                "name": front_analysis["suggested_artist"]
            })
        
        if back_analysis and back_analysis.get("provenance"):
            properties["tae"]["provenance"] = {
                "text": back_analysis["provenance"],
                "verified": False,
                "source": "back_image_analysis"
            }
        
        if back_analysis and back_analysis.get("exhibition_history"):
            properties["tae"]["exhibition_history"] = back_analysis["exhibition_history"]
        
        return properties
    
    def _calculate_rarity(self, edition_total: int) -> str:
        """Calculate rarity tier based on edition size"""
        if edition_total == 1:
            return "Unique (1/1)"
        elif edition_total <= 3:
            return "Ultra Rare"
        elif edition_total <= 10:
            return "Rare"
        elif edition_total <= 50:
            return "Limited"
        elif edition_total <= 100:
            return "Numbered"
        else:
            return "Open Edition"
    
    def _extract_background_color(self, front_analysis: Dict[str, Any]) -> str:
        """Extract background color for marketplace display"""
        colors = front_analysis.get("dominant_colors", [])
        if colors:
            color = colors[-1]
            if color.startswith("#"):
                return color[1:]
            return "FFFFFF"
        return "FFFFFF"
    
    def generate_edition_set(
        self,
        base_metadata: Dict[str, Any],
        edition_total: int
    ) -> List[Dict[str, Any]]:
        """Generate metadata set for limited edition tokens"""
        editions = []
        
        for i in range(1, edition_total + 1):
            edition_metadata = copy.deepcopy(base_metadata)
            edition_metadata["edition"]["number"] = i
            
            for attr in edition_metadata["attributes"]:
                if attr.get("trait_type") == "Edition":
                    attr["value"] = f"{i} of {edition_total}"
                elif attr.get("trait_type") == "Edition Number":
                    attr["value"] = i
            
            editions.append(edition_metadata)
        
        return editions
    
    def validate_metadata(self, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Validate metadata against ERC-721 standards"""
        required_fields = ["name", "description", "image"]
        errors = []
        warnings = []
        
        for field in required_fields:
            if field not in metadata or not metadata[field]:
                errors.append(f"Missing required field: {field}")
        
        if "attributes" in metadata:
            for i, attr in enumerate(metadata["attributes"]):
                if "trait_type" not in attr or "value" not in attr:
                    errors.append(f"Invalid attribute at index {i}")
        
        if "external_url" not in metadata:
            warnings.append("No external_url provided")
        
        if "background_color" in metadata:
            bg = metadata["background_color"]
            if len(bg) != 6 or not all(c in "0123456789ABCDEFabcdef" for c in bg):
                warnings.append("Invalid background_color format (should be 6-char hex)")
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "warnings": warnings
        }


nft_service = NFTMetadataService()


def generate_nft_metadata(
    title: str,
    artist: str,
    front_analysis: Dict[str, Any],
    back_analysis: Optional[Dict[str, Any]] = None,
    image_url: str = "",
    verification_hash: str = "",
    edition_number: int = 1,
    edition_total: int = 1
) -> Dict[str, Any]:
    """Convenience function for backward compatibility"""
    return nft_service.generate_metadata(
        title=title,
        artist=artist,
        front_analysis=front_analysis,
        back_analysis=back_analysis,
        image_url=image_url,
        verification_hash=verification_hash,
        edition_number=edition_number,
        edition_total=edition_total
    )
