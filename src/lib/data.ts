export interface Profile {
    name: string;
    title: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    website: string;
    photo: string;
    resume: string;
}

const PROFILE: Profile = {
    name: 'Gokul Krishna G H',
    title: 'MERN Stack Developer',
    email: 'gokulkrishnagh@gmail.com',
    phone: '+91 8848876169',
    github: 'https://github.com/am-goku',
    linkedin: 'https://www.linkedin.com/in/am-goku',
    website: 'https://itsmegokul.site/',
    // Replace this path with your real photo path (public/profile.png)
    photo: '/image/profile.png',
    resume: '/resume/Gokul_Krishna_G_H__Resume.pdf' // drop the uploaded PDF into your public/static folder
};

export default PROFILE;