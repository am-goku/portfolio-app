import type { IconType } from 'react-icons';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
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

const SKILLS: Skill[] = [
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Angular', icon: SiAngular },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express', icon: SiExpress },
  { name: 'NestJS', icon: SiNestjs },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Redis', icon: SiRedis },
  { name: 'Docker', icon: FaDocker },
  { name: 'AWS', icon: FaAws },
  { name: 'TailwindCSS', icon: SiTailwindcss },
  { name: 'Bootstrap', icon: SiBootstrap },
  { name: 'Socket.IO', icon: SiSocketdotio },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Redux', icon: SiRedux },
  { name: 'Git', icon: FaGitAlt },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Postman', icon: SiPostman },
  { name: 'Figma', icon: SiFigma },
  { name: 'Linux', icon: SiLinux },
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'CSS3', icon: FaCss3Alt },
];

export default SKILLS;
