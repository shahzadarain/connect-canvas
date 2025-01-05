export interface Course {
  title: string;
  platform: string;
  instructor?: string;
  completed: string;
  description?: string;
  featured?: boolean;
}

export interface CourseCategory {
  category: string;
  items: Course[];
}