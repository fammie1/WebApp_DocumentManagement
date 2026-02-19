
import React from 'react';
import { DocCategory } from '../types';

interface SidebarProps {
  activeCategory: DocCategory | 'All';
  setActiveCategory: (cat: DocCategory | 'All') => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories: (DocCategory | 'All')[] = ['All', 'Manual', 'News', 'Standard', 'Roadmap', 'Other'];

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 w-72 lg:w-64 border-r border-neutral-800 bg-black h-screen flex flex-col p-6 space-y-8 transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-black rotate-45"></div>
            </div>
            <h1 className="text-xl font-light tracking-widest text-white uppercase">Lumina</h1>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-neutral-500 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col space-y-1 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-4 font-semibold">Library</p>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                onClose();
              }}
              className={`text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-neutral-800 text-white font-medium neo-inset' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-neutral-800 pt-6">
          <div className="p-4 bg-neutral-900 rounded-xl neo-shadow glass-gradient border border-neutral-800/50">
            <p className="text-xs text-neutral-400 mb-2">AI Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs text-neutral-300">Gemini Engine Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
