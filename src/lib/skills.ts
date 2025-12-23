import type { IconType } from 'react-icons';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiAngular,
  SiNestjs,
  SiMongodb,
  SiTailwindcss,
  SiSocketdotio,
  SiTypescript,
  SiJavascript,
  SiFirebase,
  SiPostman,
  SiGithub,
  SiRedux,
  SiRedis,
  SiExpress,
  SiPostgresql,
  SiFigma,
  SiLinux,
  SiBootstrap,
} from 'react-icons/si';

export interface Skill {
  name: string;
  icon: IconType;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: IconType;
  description: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: FaCode,
    description: 'Building user interfaces and experiences',
    skills: [
      { name: 'React', icon: FaReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Angular', icon: SiAngular },
      { name: 'TailwindCSS', icon: SiTailwindcss },
      { name: 'Bootstrap', icon: SiBootstrap },
      { name: 'Redux', icon: SiRedux },
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: FaServer,
    description: 'Server-side logic and API development',
    skills: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Express', icon: SiExpress },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'Socket.IO', icon: SiSocketdotio },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
    ]
  },
  {
    id: 'database',
    name: 'Databases',
    icon: FaDatabase,
    description: 'Data storage and management',
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Redis', icon: SiRedis },
      { name: 'Firebase', icon: SiFirebase },
    ]
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    icon: FaTools,
    description: 'Development tools and deployment',
    skills: [
      { name: 'Docker', icon: FaDocker },
      { name: 'AWS', icon: FaAws },
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Postman', icon: SiPostman },
      { name: 'Figma', icon: SiFigma },
      { name: 'Linux', icon: SiLinux },
    ]
  }
];

// Export for backward compatibility if needed
const SKILLS: Skill[] = SKILL_CATEGORIES.flatMap(cat => cat.skills);
export default SKILLS;
