const AI_CORE_URL = '/api/ai';

export interface PDFProcessingRequest {
  pdfUrl: string;
  documentId: string;
}

export interface PDFProcessingResponse {
  task_id: string;
  status: string;
  message: string;
}

export interface AnalysisStatusResponse {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: {
    analysis: string;
    model: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    processing_stats?: {
      total_pages?: number;
      chunks_created?: number;
      duration?: number;
      [key: string]: unknown;
    };
  };
  error?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RAGQueryRequest {
  query: string;
  contextLimit?: number;
}

export interface RAGSource {
  id: number;
  document_id: string;
  title: string | null;
  page: number | null;
  license: string | null;
  cited: boolean;
  content: string;
}

export interface RAGQueryResponse {
  outcome: 'answered' | 'insufficient_evidence' | 'no_sources' | 'citations_failed';
  answer: string;
  insufficient_evidence: boolean;
  sources: RAGSource[];
  processing_time: number;
}

export interface ImageAnalysisRequest {
  imageUrl: string;
  analysisType?: 'full' | 'style' | 'technique' | 'period';
}

export interface ImageAnalysisResponse {
  task_id: string;
  status: string;
  message: string;
}

class AIService {
  private baseUrl: string;

  constructor(baseUrl: string = AI_CORE_URL) {
    this.baseUrl = baseUrl;
  }

  async processPdf(request: PDFProcessingRequest): Promise<PDFProcessingResponse> {
    const response = await fetch(`${this.baseUrl}/process-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pdf_url: request.pdfUrl,
        document_id: request.documentId,
      }),
    });

    if (!response.ok) {
      throw new Error(`PDF processing failed: ${response.statusText}`);
    }

    return response.json();
  }

  async ragQuery(request: RAGQueryRequest): Promise<RAGQueryResponse> {
    const response = await fetch(`${this.baseUrl}/rag-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: request.query,
        contextLimit: request.contextLimit || 8,
      }),
    });

    if (!response.ok) {
      throw new Error(`RAG query failed: ${response.statusText}`);
    }

    return response.json();
  }

  async analyzeImage(request: ImageAnalysisRequest): Promise<ImageAnalysisResponse> {
    const response = await fetch(`${this.baseUrl}/analyze-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: request.imageUrl,
        analysis_type: request.analysisType || 'full',
      }),
    });

    if (!response.ok) {
      throw new Error(`Image analysis failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getAnalysisStatus(taskId: string, type: 'pdf' | 'image' = 'image'): Promise<AnalysisStatusResponse> {
    const endpoint = type === 'pdf' ? `/pdf-status/${taskId}` : `/analysis/${taskId}`;
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to get status: ${response.statusText}`);
    }

    return response.json();
  }

  async pollAnalysisStatus(
    taskId: string,
    type: 'pdf' | 'image' = 'pdf',
    maxAttempts: number = 60,
    intervalMs: number = 2000
  ): Promise<AnalysisStatusResponse> {
    let attempts = 0;

    while (attempts < maxAttempts) {
      const status = await this.getAnalysisStatus(taskId, type);

      if (status.status === 'completed' || status.status === 'failed') {
        return status;
      }

      await new Promise(resolve => setTimeout(resolve, intervalMs));
      attempts++;
    }

    throw new Error('Analysis timeout: maximum attempts reached');
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const aiService = new AIService();
