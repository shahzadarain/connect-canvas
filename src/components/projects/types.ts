import { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectSectionType {
  title: string;
  icon: LucideIcon;
  projects: Project[];
}