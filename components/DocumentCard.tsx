
import React from 'react';
import { Document } from '../types';

interface DocumentCardProps {
  doc: Document;
  onClick: (doc: Document) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onClick }) => {
  return (
    <div 
      onClick={() => onClick(doc)}
      className="group bg-neutral-900 border border-neutral-800/50 rounded-2xl p-6 transition-all duration-500 hover:border-neutral-600 cursor-pointer relative overflow-hidden flex flex-col h-full neo-shadow glass-gradient"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
         <span className="text-4xl font-black italic tracking-tighter">{doc.category.charAt(0)}</span>
      </div>
      
      <div className="mb-4">
        <span className="text-[10px] px-2 py-1 bg-neutral-800 border border-neutral-700 text-neutral-400 rounded-full uppercase tracking-wider">
          {doc.category}
        </span>
      </div>

      <h3 className="text-lg font-medium text-white mb-2 leading-tight group-hover:text-neutral-200 line-clamp-2">
        {doc.title}
      </h3>
      
      <p className="text-sm text-neutral-500 line-clamp-3 mb-6 font-light">
        {doc.summary}
      </p>

      <div className="mt-auto flex items-center justify-between text-[11px] text-neutral-600 uppercase tracking-widest border-t border-neutral-800 pt-4">
        <span>{doc.date}</span>
        {doc.version && <span>V{doc.version}</span>}
      </div>
    </div>
  );
};
