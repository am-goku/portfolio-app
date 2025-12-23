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
    type: 'training' | 'education';
    color: 'blue' | 'purple';
}

const PROFILE: Profile = {
    name: 'Gokul Krishna G H',
    title: 'MERN Stack Developer',
    email: 'gokulkrishnagh@gmail.com',
    phone: '+91 8848876169',
    website: 'https://itsmegokul.site/',
    photo: '/image/profile.png',
    resume: '/resume/Gokul_Krishna_G_H__Resume.pdf', // drop the uploaded PDF into your public/static folder

    // Socials
    github: 'https://github.com/am-goku',
    linkedin: 'https://www.linkedin.com/in/am-goku',
    instagram: 'https://www.instagram.com/am_._goku/',
    twitter: 'https://x.com/am_goku_',
    facebook: 'https://www.facebook.com/am.goku',
};

export const EDUCATION: Education[] = [
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