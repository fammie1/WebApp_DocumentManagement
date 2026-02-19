
import React, { useState } from 'react';
import { Document, TrainingRoadmap } from '../types';
import { generateTrainingRoadmap } from '../services/geminiService';

interface RoadmapGeneratorProps {
  documents: Document[];
}

export const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({ documents }) => {
  const [topic, setTopic] = useState('');
  const [roadmap, setRoadmap] = useState<TrainingRoadmap | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const result = await generateTrainingRoadmap(topic, documents);
      setRoadmap(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 neo-shadow glass-gradient">
        <h2 className="text-2xl font-light text-white mb-6">AI Training Architect</h2>
        <p className="text-neutral-500 text-sm mb-8 max-w-xl">
          Enter a focus area to generate a custom training roadmap derived from your existing manuals and standard documents.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Onboarding for Senior Engineers, Quality Assurance Protocol"
            className="flex-1 bg-black border border-neutral-800 rounded-xl px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Architecting...</span>
              </>
            ) : (
              <span>Generate Roadmap</span>
            )}
          </button>
        </div>
      </div>

      {roadmap && (
        <div className="space-y-12 animate-fade-in py-12">
          <div className="border-l-2 border-white pl-8">
            <h3 className="text-4xl font-light text-white mb-4">{roadmap.title}</h3>
            <p className="text-neutral-400 max-w-2xl leading-relaxed">{roadmap.objective}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmap.steps.map((step, idx) => (
              <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative neo-shadow">
                <span className="absolute -top-4 -left-4 w-10 h-10 bg-white text-black flex items-center justify-center rounded-lg font-bold text-lg shadow-xl">
                  {idx + 1}
                </span>
                <div className="mt-4">
                  <h4 className="text-xl font-medium text-white mb-2">{step.title}</h4>
                  <p className="text-neutral-500 text-sm mb-4 leading-relaxed">{step.description}</p>
                  <div className="flex items-center text-[10px] text-neutral-400 uppercase tracking-widest mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.duration}
                  </div>
                  {step.resources.length > 0 && (
                    <div className="pt-4 border-t border-neutral-800">
                      <p className="text-[10px] font-bold text-neutral-600 uppercase mb-2">Reference Materials</p>
                      <ul className="space-y-1">
                        {step.resources.map((res, i) => (
                          <li key={i} className="text-xs text-neutral-400 flex items-center">
                            <span className="w-1 h-1 bg-neutral-600 rounded-full mr-2"></span>
                            {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
