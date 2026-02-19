
import React, { useState } from 'react';
import { Document } from '../types';
import { summarizeDocument } from '../services/geminiService';

interface DocumentViewerProps {
  doc: Document;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ doc, onClose }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const summary = await summarizeDocument(doc);
      setAiSummary(summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-6 lg:p-12">
      <div className="bg-neutral-900 w-full h-full md:max-w-5xl md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden flex flex-col border-0 md:border border-neutral-800 neo-shadow">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-neutral-800 flex justify-between items-start sticky top-0 bg-neutral-900 z-10">
          <div className="pr-8">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[10px] px-2 py-1 bg-neutral-800 text-neutral-400 rounded-sm uppercase tracking-widest">
                {doc.category}
              </span>
              <span className="text-xs text-neutral-600">{doc.date}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">{doc.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-white transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-8">
          {/* AI Helper Panel */}
          <div className="p-5 md:p-6 bg-black rounded-2xl border border-neutral-800 neo-inset">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Gemini Insight</h4>
              </div>
              {!aiSummary && !loading && (
                <button 
                  onClick={handleSummarize}
                  className="text-xs px-3 py-1.5 bg-white text-black rounded hover:bg-neutral-200 transition-colors w-full sm:w-auto"
                >
                  Generate AI Summary
                </button>
              )}
            </div>
            
            {loading && (
              <div className="flex items-center space-x-3 text-neutral-500">
                <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-300 rounded-full animate-spin"></div>
                <span className="text-sm">Synthesizing document details...</span>
              </div>
            )}

            {aiSummary && (
              <div className="text-sm text-neutral-300 leading-relaxed animate-fade-in">
                {aiSummary}
              </div>
            )}

            {!aiSummary && !loading && (
              <p className="text-sm text-neutral-600">Need a quick brief? Let AI process this document for you.</p>
            )}
          </div>

          {/* Actual Content */}
          <div className="prose prose-invert max-w-none pb-12">
            <div className="whitespace-pre-wrap text-neutral-400 leading-relaxed md:leading-loose font-light text-base md:text-lg">
              {doc.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-neutral-600 bg-neutral-900/50">
          <div className="flex flex-wrap gap-3">
            {doc.tags.map(tag => (
              <span key={tag} className="hover:text-neutral-400 transition-colors cursor-pointer bg-neutral-800/50 px-2 py-0.5 rounded">#{tag}</span>
            ))}
          </div>
          {doc.author && <span className="opacity-80">Author: {doc.author}</span>}
        </div>
      </div>
    </div>
  );
};
