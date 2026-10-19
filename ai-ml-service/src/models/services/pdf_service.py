"""
PDF processing service for text extraction, OCR, and chunking
"""

import logging
import fitz  # PyMuPDF
from typing import List, Dict, Any, Optional
import re
from ..config import settings
from .safe_fetch import fetch_pdf

logger = logging.getLogger(__name__)

class PDFProcessingService:
    """Service for processing PDF documents"""

    def __init__(self):
        pass

    async def download_pdf(self, pdf_url: str) -> bytes:
        """Download PDF from URL (безопасная загрузка: белый список, лимиты)"""
        return await fetch_pdf(pdf_url)

    def extract_text_with_pymupdf(self, pdf_bytes: bytes) -> Dict[str, Any]:
        """Extract text using PyMuPDF"""
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        pages_text = []

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text()
            pages_text.append({
                "page_number": page_num + 1,
                "text": text,
                "char_count": len(text)
            })

        doc.close()
        return {
            "total_pages": len(pages_text),
            "pages": pages_text,
            "total_chars": sum(page["char_count"] for page in pages_text)
        }

    def perform_ocr(self, pdf_bytes: bytes) -> Dict[str, Any]:
        """Perform OCR on PDF pages"""
        try:
            # Try to import required modules
            try:
                from pdf2image import convert_from_bytes
                import pytesseract
            except ImportError as e:
                logger.warning(f"OCR dependencies not available: {e}. Skipping OCR.")
                return {
                    "total_pages": 0,
                    "pages": [],
                    "total_chars": 0,
                    "error": "OCR dependencies not installed"
                }

            # Convert PDF to images
            images = convert_from_bytes(pdf_bytes)

            ocr_results = []
            for i, image in enumerate(images):
                try:
                    # Perform OCR
                    text = pytesseract.image_to_string(image, lang='rus+eng')

                    ocr_results.append({
                        "page_number": i + 1,
                        "text": text,
                        "char_count": len(text),
                        "confidence": 0.0  # pytesseract doesn't provide confidence easily
                    })
                except Exception as e:
                    logger.warning(f"OCR failed for page {i+1}: {e}")
                    ocr_results.append({
                        "page_number": i + 1,
                        "text": "",
                        "char_count": 0,
                        "confidence": 0.0,
                        "error": str(e)
                    })

            return {
                "total_pages": len(ocr_results),
                "pages": ocr_results,
                "total_chars": sum(page["char_count"] for page in ocr_results)
            }

        except Exception as e:
            logger.error(f"OCR processing failed: {e}")
            raise

    def chunk_text(self, text: str, chunk_size: int = None, overlap: int = None) -> List[Dict[str, Any]]:
        """Chunk text into smaller pieces"""
        if chunk_size is None:
            chunk_size = settings.chunk_size
        if overlap is None:
            overlap = settings.chunk_overlap

        # Split into sentences (simple approach)
        sentences = re.split(r'(?<=[.!?])\s+', text.strip())

        chunks = []
        current_chunk = ""
        current_sentences = []

        for sentence in sentences:
            if len(current_chunk) + len(sentence) <= chunk_size:
                current_chunk += sentence + " "
                current_sentences.append(sentence)
            else:
                if current_chunk:
                    chunks.append({
                        "content": current_chunk.strip(),
                        "sentences": current_sentences,
                        "char_count": len(current_chunk),
                        "token_estimate": len(current_chunk.split())  # rough estimate
                    })

                # Start new chunk with overlap
                overlap_sentences = current_sentences[-2:] if len(current_sentences) >= 2 else current_sentences
                current_chunk = " ".join(overlap_sentences) + " " + sentence + " "
                current_sentences = overlap_sentences + [sentence]

        # Add final chunk
        if current_chunk:
            chunks.append({
                "content": current_chunk.strip(),
                "sentences": current_sentences,
                "char_count": len(current_chunk),
                "token_estimate": len(current_chunk.split())
            })

        return chunks

    async def process_pdf(self, pdf_url: str, document_id: str) -> Dict[str, Any]:
        """Complete PDF processing pipeline"""
        try:
            logger.info(f"Starting PDF processing for {document_id}")

            # Download PDF
            pdf_bytes = await self.download_pdf(pdf_url)

            # Extract text
            text_extraction = self.extract_text_with_pymupdf(pdf_bytes)

            # Combine all text
            full_text = " ".join(page["text"] for page in text_extraction["pages"])

            # Perform OCR if text extraction yielded little content
            ocr_performed = False
            if text_extraction["total_chars"] < 1000:  # Threshold for OCR
                logger.info("Text extraction yielded low content, performing OCR")
                ocr_results = self.perform_ocr(pdf_bytes)
                full_text = " ".join(page["text"] for page in ocr_results["pages"])
                ocr_performed = True
                text_extraction = ocr_results

            # Chunk text
            chunks = self.chunk_text(full_text)

            return {
                "document_id": document_id,
                "pdf_url": pdf_url,
                "processing_stats": {
                    "total_pages": text_extraction["total_pages"],
                    "total_chars": text_extraction["total_chars"],
                    "ocr_performed": ocr_performed,
                    "chunks_created": len(chunks)
                },
                "chunks": chunks,
                "full_text": full_text[:1000] + "..." if len(full_text) > 1000 else full_text
            }

        except Exception as e:
            logger.error(f"PDF processing failed: {e}")
            raise

# Global PDF service instance
pdf_service = PDFProcessingService()