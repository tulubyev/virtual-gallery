"""
PDF processing service for text extraction, OCR, and chunking
"""

import hashlib
import logging
import pypdfium2 as pdfium  # PDFium: Apache-2.0/BSD (вместо PyMuPDF под AGPL-3.0)
from typing import List, Dict, Any, Optional
import re
from ..config import settings
from .chunking import chunk_pages
from .safe_fetch import fetch_pdf

logger = logging.getLogger(__name__)

class PDFProcessingService:
    """Service for processing PDF documents"""

    def __init__(self):
        pass

    async def download_pdf(self, pdf_url: str) -> bytes:
        """Download PDF from URL (безопасная загрузка: белый список, лимиты)"""
        return await fetch_pdf(pdf_url)

    def extract_text(self, pdf_bytes: bytes) -> Dict[str, Any]:
        """Текст по страницам из текстового слоя PDF (pypdfium2)"""
        pdf = pdfium.PdfDocument(pdf_bytes)
        pages_text = []
        try:
            for page_num in range(len(pdf)):
                page = pdf[page_num]
                textpage = page.get_textpage()
                try:
                    text = textpage.get_text_range().replace("\x00", "")     # NUL не принимает PostgreSQL
                finally:
                    textpage.close()
                    page.close()
                pages_text.append({
                    "page_number": page_num + 1,
                    "text": text,
                    "char_count": len(text)
                })
        finally:
            pdf.close()
        return {
            "total_pages": len(pages_text),
            "pages": pages_text,
            "total_chars": sum(page["char_count"] for page in pages_text)
        }

    @staticmethod
    def render_pages(pdf_bytes: bytes, dpi: int = 200):
        """Страницы как изображения для OCR (pypdfium2, без poppler); по одной, чтобы не держать весь документ в памяти"""
        pdf = pdfium.PdfDocument(pdf_bytes)
        try:
            for page_num in range(len(pdf)):
                page = pdf[page_num]
                try:
                    yield page.render(scale=dpi / 72).to_pil()
                finally:
                    page.close()
        finally:
            pdf.close()

    def perform_ocr(self, pdf_bytes: bytes) -> Dict[str, Any]:
        """Perform OCR on PDF pages"""
        try:
            # Try to import required modules
            try:
                import pytesseract
            except ImportError as e:
                logger.warning(f"OCR dependencies not available: {e}. Skipping OCR.")
                return {
                    "total_pages": 0,
                    "pages": [],
                    "total_chars": 0,
                    "error": "OCR dependencies not installed"
                }

            ocr_results = []
            for i, image in enumerate(self.render_pages(pdf_bytes)):
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
        """Скачать PDF по адресу (безопасная загрузка) и обработать"""
        return await self.process_pdf_bytes(await self.download_pdf(pdf_url), document_id, pdf_url)

    async def process_pdf_bytes(self, pdf_bytes: bytes, document_id: str, pdf_url: Optional[str] = None) -> Dict[str, Any]:
        """Complete PDF processing pipeline"""
        try:
            logger.info(f"Starting PDF processing for {document_id}")

            # Extract text
            text_extraction = self.extract_text(pdf_bytes)

            # Perform OCR if text extraction yielded little content
            ocr_performed = False
            if text_extraction["total_chars"] < 1000:  # Threshold for OCR
                logger.info("Text extraction yielded low content, performing OCR")
                text_extraction = self.perform_ocr(pdf_bytes)
                ocr_performed = True

            full_text = " ".join(page["text"] for page in text_extraction["pages"])

            # Фрагменты по страницам: у каждого цитаты есть номер страницы
            chunks = chunk_pages(text_extraction["pages"], target=settings.chunk_size,
                                 overlap=min(settings.chunk_overlap, settings.chunk_size // 4))

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
                "content_sha256": hashlib.sha256(pdf_bytes).hexdigest(),
                "full_text": full_text[:1000] + "..." if len(full_text) > 1000 else full_text
            }

        except Exception as e:
            logger.error(f"PDF processing failed: {e}")
            raise

# Global PDF service instance
pdf_service = PDFProcessingService()