import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PROFILE from './lib/data';
import SkillsGrid from './components/SkillGrid';
import TestimonialsTab from './components/tabs/TestimonialsTab';
import ProjectsTab from './components/tabs/ProjectsTab';
import HomeTab from './components/tabs/HomeTab';
import TabSwitchButtons from './components/buttons/TabSwitchButtons';
import ResumeButton from './components/buttons/ResumeButton';
import Socials from './components/Socials';
import ContactForm from './components/tabs/ContactForm';
import { getViews, increaseViews } from './lib/service/counter-api';
import { FiEye } from 'react-icons/fi';

export default function PortfolioApp() {
  const [viewers, setViewers] = useState<number | null>(null);

  const [tab, setTab] = useState<'home' | 'projects' | 'testimonials' | 'contact'>('home');

  const contentRef = useRef<HTMLDivElement | null>(null);

  const scrollToProjects = () => {
    setTab('projects');
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    getViews().then(res => setViewers(res)).catch(() => setViewers(0));
    console.log(viewers)
  }, [viewers]);

  //Updating views
  useEffect(() => {
    increaseViews().then(res => {
      setViewers(prev => {
        if (prev) {
          if (res > prev) return res;
          else return prev;
        } else return res;
      })
    }).catch(() => setViewers(0));
  }, [])

  return (
    <div className="min-h-screen relative bg-linear-to-b from-gray-900 via-gray-950 to-black text-gray-100 p-6">
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
              <img src={PROFILE.photo} alt="Profile" loading='lazy' className="object-cover w-full h-full" />
            </div>
            <h1 className="text-2xl font-semibold">{PROFILE.name}</h1>
            <p className="text-sm text-gray-300 mt-1">{PROFILE.title}</p>

            <Socials />

            <div className="mt-6 w-full text-left">
              <h3 className="text-sm text-gray-200 font-medium">Contact</h3>
              <p className="text-xs text-gray-300 mt-1">{PROFILE.email} • {PROFILE.phone}</p>

              <div className="mt-4 flex gap-3">
                <ResumeButton resume={PROFILE.resume} />
                <button
                  onClick={scrollToProjects}
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
          ref={contentRef}
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

          {tab === 'contact' && <ContactForm />}
        </motion.main>
      </div>

      <footer className="max-w-6xl mx-auto mt-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} {PROFILE.name}</footer>
      {viewers ? (
        <p className='absolute bottom-4 left-4 text-xs text-gray-500 flex justify-center items-center gap-1'>
          <FiEye />
          {viewers}
        </p>
      ) : null}
    </div>
  );
}
