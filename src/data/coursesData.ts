import { CourseCategory } from "./types/course";
import { aiCourses } from "./courses/aiCourses";
import { securityCourses } from "./courses/securityCourses";
import { analyticsCourses } from "./courses/analyticsCourses";
import { cloudCourses } from "./courses/cloudCourses";
import { managementCourses } from "./courses/managementCourses";
import { businessCourses } from "./courses/businessCourses";

export const courses: CourseCategory[] = [
  {
    category: "Artificial Intelligence and Machine Learning",
    items: aiCourses
  },
  {
    category: "Cybersecurity and Privacy",
    items: securityCourses
  },
  {
    category: "Data Analytics and Visualization",
    items: analyticsCourses
  },
  {
    category: "Cloud Computing and IT Strategy",
    items: cloudCourses
  },
  {
    category: "Project Management and Leadership",
    items: managementCourses
  },
  {
    category: "Business Analysis and Design",
    items: businessCourses
  }
];