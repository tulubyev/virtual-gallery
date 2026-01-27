/**
 * Component for displaying AI artwork analysis results
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface AnalysisResult {
  task_id: string;
  status: string;
  result?: {
    analysis: string;
    model: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
  error?: string;
  created_at?: string;
  updated_at?: string;
}

interface ArtworkAnalysisResultProps {
  result: AnalysisResult;
  onRetry?: () => void;
}

export const ArtworkAnalysisResult: React.FC<ArtworkAnalysisResultProps> = ({
  result,
  onRetry
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      completed: "default",
      failed: "destructive",
      processing: "secondary",
      queued: "outline"
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(result.status)}
          AI Artwork Analysis
          {getStatusBadge(result.status)}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {result.status === 'processing' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Analyzing artwork...</span>
              <span>Please wait</span>
            </div>
            <Progress value={66} className="w-full" />
          </div>
        )}

        {result.status === 'failed' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Analysis failed: {result.error}
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="ml-2 underline hover:no-underline"
                >
                  Try again
                </button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {result.status === 'completed' && result.result && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <h4 className="text-lg font-semibold mb-2">Analysis Result</h4>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {result.result.analysis}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Model:</span> {result.result.model}
              </div>
              <div>
                <span className="font-medium">Tokens Used:</span> {result.result.usage.total_tokens}
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Completed at: {result.updated_at ? new Date(result.updated_at).toLocaleString() : 'Unknown'}
            </div>
          </div>
        )}

        {result.status === 'queued' && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Analysis queued for processing...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtworkAnalysisResult;