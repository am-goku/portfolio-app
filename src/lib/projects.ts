export interface Project {
    id: string;
    title: string;
    year: number;
    description: string;
    thumbnail: string;
    live: string | null;
    repos: { 
        label: string; // e.g., 'Frontend', 'Backend', 'Monorepo'
        url: string 
    }[];
    tech: string[];
}

const PROJECTS: Project[] = [
    {
        id: 'relink',
        title: 'Relink — Social Media Platform',
        year: 2024,
        description:
            'Next.js-based social platform with real-time chat, Google OAuth, image uploads and AWS deployment. Built with NextAuth, Socket.IO and Firebase for media.',
        thumbnail: '/thumbs/relink.svg',
        live: 'https://relink.itsmegokul.site',
        repos: [
            { label: 'Monorepo', url: 'https://github.com/am-goku/RELINK-NEXTJS' }
        ],
        tech: ['Next.js', 'Node.js', 'MongoDB', 'Socket.IO', 'TailwindCSS', 'Firebase', 'AWS']
    },
    {
        id: 'trendly',
        title: 'Trendly — E‑Commerce Platform',
        year: 2023,
        description:
            'Secure e-commerce solution with admin dashboard, Twilio OTP, and RazorPay payments. Admin panel built using Angular.',
        thumbnail: '/thumbs/github.png',
        live: 'https://trendly.itsmegokul.site',
        repos: [{ label: 'Repo', url: 'https://github.com/am-goku/trendly' }],
        tech: ['Express', 'Node.js', 'MongoDB', 'RazorPay', 'Twilio', 'AWS', 'MERN']
    },
    {
        id: 'fitpro',
        title: 'FitPro — Fitness App Backend',
        year: 2024,
        description:
            'Scalable backend for fitness tracking with NestJS, JWT-auth and AWS S3 media storage. Focused on clean API design and caching via Redis.',
        thumbnail: '/thumbs/github.png',
        live: null,
        repos: [{ label: 'Server', url: 'https://github.com/am-goku/fitpro_server' }],
        tech: ['Express', 'TypeScript', 'MongoDB', 'Redis', 'AWS S3']
    },
    {
        id: 'netflix-clone',
        title: 'Netflix Clone',
        year: 2023,
        description: 'Responsive React UI powered by TMDB API. Focus on responsive layout and polished animations.',
        thumbnail: '/thumbs/github.png',
        live: null,
        repos: [{ label: 'Repo', url: 'https://github.com/am-goku/netflix-clone' }],
        tech: ['React', 'TMDB API', 'TailwindCSS']
    },
    {
        id: 'olx-clone',
        title: 'OLX React Clone',
        year: 2023,
        description: 'Marketplace clone using Firebase Firestore for realtime listing and storage.',
        thumbnail: '/thumbs/github.png',
        live: null,
        repos: [{ label: 'Repo', url: 'https://github.com/am-goku/OLX-React-Clone' }],
        tech: ['React', 'Firebase Firestore']
    },
    {
        id: 'todo',
        title: 'To‑Do App (MERN)',
        year: 2022,
        description: 'Classic MERN task manager demonstrating CRUD, auth and RESTful APIs.',
        thumbnail: '/thumbs/github.png',
        live: null,
        repos: [{ label: 'Server', url: 'https://github.com/am-goku/todo-server' }],
        tech: ['MERN']
    }
];

export default PROJECTS;