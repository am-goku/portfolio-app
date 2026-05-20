export interface Profile {
    name: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    photo: string;
    resume: string;

    //Socials
    github?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
}

export interface Education {
    id: string;
    institution: string;
    program: string;
    duration: string;
    type: 'training' | 'education' | 'certification';
    color: 'blue' | 'purple';
}

const PROFILE: Profile = {
    name: import.meta.env.VITE_NAME || 'Your Name',
    title: import.meta.env.VITE_TITLE || 'Full Stack Developer',
    email: import.meta.env.VITE_EMAIL || 'email@example.com',
    phone: import.meta.env.VITE_PHONE || '+1 234 567 890',
    website: import.meta.env.VITE_WEBSITE || 'https://example.com',
    photo: import.meta.env.VITE_PROFILE_IMAGE || 'https://via.placeholder.com/150',
    resume: import.meta.env.VITE_RESUME_PATH || '/resume.pdf',

    // Socials
    github: import.meta.env.VITE_GITHUB_URL,
    linkedin: import.meta.env.VITE_LINKEDIN_URL,
    instagram: import.meta.env.VITE_INSTAGRAM_URL,
    twitter: import.meta.env.VITE_TWITTER_URL,
    facebook: import.meta.env.VITE_FACEBOOK_URL,
};

export const EDUCATION: Education[] = [
    {
        id: 'ibm-fullstack-engineer',
        institution: 'IBM (Coursera)',
        program: 'IBM Full Stack Software Engineer Professional Certificate',
        duration: '2025',
        type: 'certification',
        color: 'blue'
    },
    {
        id: 'ibm-fullstack-js',
        institution: 'IBM (Coursera)',
        program: 'IBM Full Stack JavaScript Developer Professional Certificate',
        duration: '2025',
        type: 'certification',
        color: 'purple'
    },
    {
        id: 'brototype',
        institution: 'Brototype',
        program: 'MERN Stack Development Program',
        duration: '2022 – 2024',
        type: 'training',
        color: 'blue'
    },
    {
        id: 'st-thomas',
        institution: 'St. Thomas College',
        program: 'Bachelor of Commerce (B.Com)',
        duration: '2019 – 2022',
        type: 'education',
        color: 'purple'
    }
];

export default PROFILE;