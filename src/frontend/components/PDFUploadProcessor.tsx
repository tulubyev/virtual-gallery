/**
 * PDF Upload and Processing component
 */

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Upload, FileText, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { aiService, PDFProcessingResponse, AnalysisStatusResponse } from '../services/aiService';

interface PDFUploadProcessorProps {
  onProcessingComplete?: (result: AnalysisStatusResponse) => void;
  className?: string;
}

export const PDFUploadProcessor: React.FC<PDFUploadProcessorProps> = ({
  onProcessingComplete,
  className
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState<AnalysisStatusResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.includes('pdf')) {
        setError('Please select a PDF file');
        return;
      }

      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setProcessingStatus(null);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      // In a real implementation, you would upload the file to your server/storage
      // For now, we'll simulate this and use a placeholder URL
      setUploadProgress(50);

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockPdfUrl = `https://example.com/uploads/${selectedFile.name}`;

      setUploadProgress(100);

      // Start PDF processing
      await handleProcessPdf(mockPdfUrl);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [selectedFile]);

  const handleProcessPdf = useCallback(async (pdfUrl: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      const documentId = `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const response: PDFProcessingResponse = await aiService.processPdf({
        pdfUrl,
        documentId
      });

      // Poll for completion
      const result = await aiService.pollAnalysisStatus(response.task_id, 'pdf');

      setProcessingStatus(result);

      if (onProcessingComplete) {
        onProcessingComplete(result);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
    } finally {
      setIsProcessing(false);
    }
  }, [onProcessingComplete]);

  const resetForm = useCallback(() => {
    setSelectedFile(null);
    setProcessingStatus(null);
    setError(null);
    setUploadProgress(0);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          PDF Document Processor
          <span className="text-sm font-normal text-gray-500">AI-Powered Analysis</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* File Selection */}
        <div className="space-y-2">
          <label
            htmlFor="pdf-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF files only (max 50MB)</p>
            </div>
            <input
              id="pdf-upload"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileSelect}
              disabled={isUploading || isProcessing}
            />
          </label>

          {selectedFile && (
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-blue-700">{selectedFile.name}</span>
              <span className="text-xs text-blue-500 ml-auto">
                {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading || isProcessing}
            className="flex-1"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Process PDF
              </>
            )}
          </Button>

          {(selectedFile || processingStatus) && (
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Processing Status */}
        {processingStatus && (
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(processingStatus.status)}
                <span className="font-medium capitalize">{processingStatus.status}</span>
              </div>

              {processingStatus.status === 'completed' && processingStatus.result && (
                <div className="space-y-2 text-sm">
                  <div>Pages processed: {processingStatus.result.processing_stats?.total_pages || 0}</div>
                  <div>Chunks created: {processingStatus.result.processing_stats?.chunks_created || 0}</div>
                  <div className="text-green-600 font-medium">
                    Document ready for AI queries!
                  </div>
                </div>
              )}

              {processingStatus.status === 'failed' && (
                <div className="text-red-600 text-sm">
                  {processingStatus.error || 'Processing failed'}
                </div>
              )}

              {processingStatus.status === 'processing' && (
                <div className="text-blue-600 text-sm">
                  Analyzing document content...
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>How it works:</strong>
          <ol className="mt-1 ml-4 list-decimal space-y-1">
            <li>Upload a PDF document about art, artists, or art history</li>
            <li>AI extracts and analyzes the content</li>
            <li>Document becomes searchable via the Art Assistant chat</li>
            <li>Ask questions about the content using natural language</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFUploadProcessor;