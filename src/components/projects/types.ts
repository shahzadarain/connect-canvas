export interface ProjectType {
  title: string;
  description: string;
  tags: string[];
  expectedImpact: string;
}

export interface ProjectSectionType {
  title: string;
  icon: React.ReactNode;
  projects: ProjectType[];
}