export interface Experience {
  company: string;
  location: string;
  position: string;
  period: string;
  responsibilities: {
    period: string;
    description: string;
  }[];
  projectsAndAchievements: string[];
  tech: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  gpa: string;
  thesis: string;
  thesis_link: string;
}

export interface Skill {
  category: string;
  items: {
    name: string;
    level: number;
    note?: string;
    link?: string;
  }[];
}