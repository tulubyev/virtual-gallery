import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { PDFUploadProcessor } from './components/PDFUploadProcessor';
import { ArtworkAnalysisResult } from './components/ArtworkAnalysisResult';
import { ArtRAGChat } from './components/ArtRAGChat';

function mountComponent(
  Component: React.ComponentType<any>,
  containerId: string,
  props: Record<string, any> = {}
) {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<Component {...props} />);
  }
}

function initReactWidgets() {
  const pdfUploadContainer = document.getElementById('react-pdf-upload');
  if (pdfUploadContainer) {
    mountComponent(PDFUploadProcessor, 'react-pdf-upload', {
      onProcessingComplete: (result: any) => {
        console.log('PDF processing complete:', result);
      },
    });
  }

  const ragChatContainer = document.getElementById('react-rag-chat');
  if (ragChatContainer) {
    mountComponent(ArtRAGChat, 'react-rag-chat');
  }

  const analysisContainers = document.querySelectorAll('[data-react-analysis-result]');
  analysisContainers.forEach((container) => {
    const resultData = container.getAttribute('data-result');
    if (resultData) {
      try {
        const result = JSON.parse(resultData);
        const root = createRoot(container as HTMLElement);
        root.render(<ArtworkAnalysisResult result={result} />);
      } catch (e) {
        console.error('Failed to parse analysis result:', e);
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReactWidgets);
} else {
  initReactWidgets();
}

declare global {
  interface Window {
    VirtualGallery: {
      mountComponent: typeof mountComponent;
      PDFUploadProcessor: typeof PDFUploadProcessor;
      ArtworkAnalysisResult: typeof ArtworkAnalysisResult;
      ArtRAGChat: typeof ArtRAGChat;
    };
  }
}

window.VirtualGallery = {
  mountComponent,
  PDFUploadProcessor,
  ArtworkAnalysisResult,
  ArtRAGChat,
};

export { PDFUploadProcessor, ArtworkAnalysisResult, ArtRAGChat, mountComponent };
