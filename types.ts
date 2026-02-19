
export type DocCategory = 'Manual' | 'News' | 'Standard' | 'Roadmap' | 'Other';

export interface Document {
  id: string;
  title: string;
  category: DocCategory;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  author?: string;
  version?: string;
}

export interface TrainingStep {
  title: string;
  description: string;
  duration: string;
  resources: string[];
}

export interface TrainingRoadmap {
  title: string;
  objective: string;
  steps: TrainingStep[];
}
