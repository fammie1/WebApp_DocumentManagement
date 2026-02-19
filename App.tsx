
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { DocumentCard } from './components/DocumentCard';
import { DocumentViewer } from './components/DocumentViewer';
import { RoadmapGenerator } from './components/RoadmapGenerator';
import { DocCategory, Document } from './types';

// Mock data initialization
const INITIAL_DOCS: Document[] = [
  {
    id: '1',
    title: 'Employee Conduct Handbook 2024',
    category: 'Manual',
    date: 'Jan 15, 2024',
    summary: 'Comprehensive guide covering ethics, communication standards, and professional behavior within the organization.',
    content: '1. Professional Ethics: All employees must adhere to the highest standards of integrity. 2. Communication: Open dialogue is encouraged but must remain professional at all times. 3. Compliance: Failure to follow these guidelines may lead to disciplinary action...',
    tags: ['hr', 'policy', 'compliance'],
    version: '2.1'
  },
  {
    id: '2',
    title: 'ISO 27001 Security Protocols',
    category: 'Standard',
    date: 'Dec 02, 2023',
    summary: 'Standardized information security management system (ISMS) requirements for digital assets and data handling.',
    content: 'Security Management: Implement a risk management process. Asset Management: Identify and classify assets. Access Control: Restrict access to information and facilities...',
    tags: ['security', 'iso', 'standard'],
    version: '4.0'
  },
  {
    id: '3',
    title: 'Q1 Market Expansion Strategy',
    category: 'News',
    date: 'Feb 10, 2024',
    summary: 'Announcement regarding the upcoming expansion into the European and Asian markets starting March 2024.',
    content: 'We are excited to announce our aggressive expansion strategy for the first quarter. Data suggests high demand in Berlin and Tokyo. Our logistics team is already preparing...',
    tags: ['strategy', 'expansion', 'growth'],
  },
  {
    id: '4',
    title: 'Emergency Response Manual',
    category: 'Manual',
    date: 'Nov 20, 2023',
    summary: 'Critical procedures for fire, medical, and structural emergencies within corporate headquarters.',
    content: 'Fire Protocol: Evacuate immediately using marked exits. Medical Emergency: Call internal security and 911. Structural Failure: Proceed to safe zones...',
    tags: ['safety', 'manual', 'emergency'],
    version: '1.5'
  },
  {
    id: '5',
    title: 'Project Phoenix Roadmap',
    category: 'Roadmap',
    date: 'Mar 01, 2024',
    summary: 'High-level timeline and milestones for the cloud migration initiative.',
    content: 'Phase 1: Audit existing infrastructure. Phase 2: Select cloud vendor. Phase 3: Pilot migration. Phase 4: Full deployment...',
    tags: ['cloud', 'migration', 'it'],
  }
];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DocCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredDocs = useMemo(() => {
    return INITIAL_DOCS.filter(doc => {
      const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <header className="flex flex-col gap-6 mb-12 md:mb-16">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="lg:hidden flex items-center space-x-2">
               <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rotate-45"></div>
              </div>
              <span className="text-sm tracking-widest uppercase font-light">Lumina</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-2">Knowledge Space</h2>
              <p className="text-neutral-500 text-sm font-light">Navigating {filteredDocs.length} assets in your repository.</p>
            </div>

            <div className="relative group max-w-md w-full">
              <input 
                type="text"
                placeholder="Search library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-12 py-3.5 focus:outline-none focus:border-neutral-500 transition-all neo-inset text-sm font-light"
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-neutral-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </header>

        {activeCategory === 'Roadmap' && (
          <div className="mb-16">
             <RoadmapGenerator documents={INITIAL_DOCS} />
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredDocs.map(doc => (
            <DocumentCard 
              key={doc.id} 
              doc={doc} 
              onClick={(d) => setSelectedDoc(d)} 
            />
          ))}
          {filteredDocs.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-neutral-800 rounded-3xl">
              <p className="text-neutral-600 font-light">No documents found in this section.</p>
            </div>
          )}
        </section>

        {selectedDoc && (
          <DocumentViewer 
            doc={selectedDoc} 
            onClose={() => setSelectedDoc(null)} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
