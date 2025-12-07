export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
}

export interface Skill {
    name: string;
    icon: string;
    order: number;
}

export interface Achievement {
    title: string;
    description: string;
    icon: string;
    url: string;
    order: number;
}

export interface Project {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    repoUrl: string;
    liveUrl: string;
    order: number;
}

export interface Experience {
    role: string;
    company: string;
    duration: string;
    description: string;
    responsibilities: string[];
    order: number;
}

export interface Certification {
    name: string;
    issuer: string;
    year: string;
    icon: string;
    imageUrl: string;
    url: string;
    order: number;
}

export interface BlogPost {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    url: string;
    order: number;
}

export interface PortfolioData {
    name: string;
    title: string;
    bio: string;
    email: string;
    avatarUrl: string;
    social: SocialLinks;
    skills: Skill[];
    achievements: Achievement[];
    projects: Project[];
    experience: Experience[];
    certifications: Certification[];
    blogPosts: BlogPost[];
}
