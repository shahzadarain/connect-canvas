import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string | null;
  category: string;
  tags: string[] | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProjectSectionType {
  id: number;
  title: string;
  category: string;
  icon: string;
  display_order: number | null;
  created_at: string | null;
  updated_at: string | null;
}