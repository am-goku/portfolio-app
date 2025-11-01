import { useState } from 'react';
import { motion } from 'framer-motion';
import PROFILE from './lib/data';
import SkillsGrid from './components/SkillGrid';
import TestimonialsTab from './components/tabs/TestimonialsTab';
import ProjectsTab from './components/tabs/ProjectsTab';
import HomeTab from './components/tabs/HomeTab';
import TabSwitchButtons from './components/buttons/TabSwitchButtons';

export default function PortfolioApp() {
  const [tab, setTab] = useState<'home' | 'projects' | 'testimonials'>('home');

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black text-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: profile card */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 bg-linear-to-br from-white/3 to-white/2/5 p-6 rounded-2xl shadow-2xl border border-white/6 backdrop-blur"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden ring-2 ring-white/10 mb-4">
              <img src={PROFILE.photo} alt="Profile" className="object-cover w-full h-full" />
            </div>
            <h1 className="text-2xl font-semibold">{PROFILE.name}</h1>
            <p className="text-sm text-gray-300 mt-1">{PROFILE.title}</p>

            <div className="mt-4 flex gap-3">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-sm underline">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-sm underline">
                LinkedIn
              </a>
            </div>

            <div className="mt-6 w-full text-left">
              <h3 className="text-sm text-gray-200 font-medium">Contact</h3>
              <p className="text-xs text-gray-300 mt-1">{PROFILE.email} • {PROFILE.phone}</p>

              <div className="mt-4 flex gap-3">
                <a
                  href={PROFILE.resume}
                  download
                  className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 shadow-md text-white text-sm"
                >
                  Download Resume
                </a>
                <button
                  onClick={() => setTab('projects')}
                  className="px-4 py-2 rounded-md border border-white/10 text-sm"
                >
                  View Projects
                </button>
              </div>
            </div>

            <div className="mt-6 w-full">
              <h3 className="text-sm text-gray-200 font-medium">Skills</h3>
              <SkillsGrid />
            </div>
          </div>
        </motion.aside>

        {/* Right column: content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white/3 p-6 rounded-2xl shadow-2xl border border-white/6 backdrop-blur"
        >
          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <TabSwitchButtons setTab={setTab} tab={tab} />

            <div className="text-sm text-gray-300 hidden md:block">MERN • NestJS • Angular • Cloud & DevOps</div>
          </div>

          {/* Content area */}
          {tab === 'home' && <HomeTab />}

          {tab === 'projects' && <ProjectsTab />}

          {tab === 'testimonials' && <TestimonialsTab />}
        </motion.main>
      </div>

      <footer className="max-w-6xl mx-auto mt-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} {PROFILE.name}</footer>
    </div>
  );
}
