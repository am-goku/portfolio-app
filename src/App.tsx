import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import PROFILE from './lib/data';
import SkillsGrid from './components/SkillGrid';
import TabSwitchButtons from './components/buttons/TabSwitchButtons';
import ResumeButton from './components/buttons/ResumeButton';
import Socials from './components/Socials';
import { getViews, increaseViews } from './lib/service/counter-api';
import { FiEye, FiCopy, FiCheck } from 'react-icons/fi';
import { FaHome, FaProjectDiagram, FaEnvelope, FaCodeBranch } from 'react-icons/fa';
import BackToTopButton from './components/BackToTopButton';

// Lazy load tab components for better performance
const HomeTab = lazy(() => import('./components/tabs/HomeTab'));
const ProjectsTab = lazy(() => import('./components/tabs/ProjectsTab'));
const ActivityTab = lazy(() => import('./components/tabs/ActivityTab'));
const ContactForm = lazy(() => import('./components/tabs/ContactForm'));

export default function PortfolioApp() {
  const [viewers, setViewers] = useState<number | null>(null);

  const [tab, setTab] = useState<'home' | 'projects' | 'activity' | 'testimonials' | 'contact'>('home');
  const [emailCopied, setEmailCopied] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const scrollToProjects = () => {
    setTab('projects');
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top of content when changing tabs on mobile
  const handleTabChange = (newTab: 'home' | 'projects' | 'activity' | 'contact') => {
    setTab(newTab);
    if (contentRef.current && window.innerWidth < 768) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Copy email to clipboard
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = PROFILE.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  useEffect(() => {
    getViews().then(res => setViewers(res)).catch(() => setViewers(0));
  }, []); // Fixed: Removed viewers from dependency array to prevent infinite loop

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
          role="complementary"
          aria-label="Profile information"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden ring-2 ring-white/10 mb-4">
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.name} - ${PROFILE.title}`}
                width="144"
                height="144"
                fetchPriority="high"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-2xl font-semibold">{PROFILE.name}</h1>
            <p className="text-sm text-gray-300 mt-1">{PROFILE.title}</p>

            <Socials />

            <div className="mt-6 w-full text-left">
              <h3 className="text-sm text-gray-200 font-medium">Contact</h3>
              <div className="text-xs text-gray-300 mt-1 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1"
                    title="Send me an email"
                  >
                    📧 {PROFILE.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded hover:bg-white/10 transition-colors group"
                    title={emailCopied ? "Copied!" : "Copy email"}
                    aria-label="Copy email to clipboard"
                  >
                    {emailCopied ? (
                      <FiCheck className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <FiCopy className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-400" />
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${PROFILE.phone}`}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                  title="Call me"
                >
                  📞 {PROFILE.phone}
                </a>
              </div>

              <div className="mt-5 flex gap-3">
                <ResumeButton resume={PROFILE.resume} />
                <button
                  onClick={scrollToProjects}
                  className="flex-1 px-4 py-2 rounded-md border border-white/20 bg-white/5 text-sm hover:bg-white/10 hover:border-white/30 transition-all"
                  aria-label="Navigate to projects section"
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
          role="main"
          aria-label="Portfolio content"
        >
          {/* Tabs - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <TabSwitchButtons setTab={setTab} tab={tab} />

            <div className="text-sm text-gray-300">MERN • NestJS • Angular • Cloud & DevOps</div>
          </div>

          {/* Content area */}
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          }>
            {tab === 'home' && <HomeTab />}
            {tab === 'projects' && <ProjectsTab />}
            {tab === 'activity' && <ActivityTab />}
            {tab === 'contact' && <ContactForm />}
          </Suspense>
        </motion.main>
      </div>

      <footer className="max-w-6xl mx-auto mt-10 text-center text-xs text-gray-500 space-y-1">
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <p className="text-gray-600">
          Built with <span className="text-blue-400">React</span>, <span className="text-blue-400">Vite</span>, <span className="text-blue-400">Tailwind</span> & ❤️
        </p>
      </footer>
      {viewers === null ? (
        <div className="absolute bottom-4 left-4 flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-700 animate-pulse rounded" />
          <div className="w-12 h-3 bg-gray-700 animate-pulse rounded" />
        </div>
      ) : (
        <p className='absolute bottom-4 left-4 text-xs text-gray-500 flex items-center gap-1'>
          <FiEye />
          {viewers}
        </p>
      )}

      {/* Mobile Sticky Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 z-50 px-4 py-2 safe-area-inset-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => handleTabChange('home')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${tab === 'home' ? 'text-blue-400' : 'text-gray-400'
              }`}
            aria-label="Home"
          >
            <FaHome className="text-lg" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => handleTabChange('projects')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${tab === 'projects' ? 'text-blue-400' : 'text-gray-400'
              }`}
            aria-label="Projects"
          >
            <FaProjectDiagram className="text-lg" />
            <span className="text-xs">Projects</span>
          </button>
          <button
            onClick={() => handleTabChange('activity')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${tab === 'activity' ? 'text-blue-400' : 'text-gray-400'
              }`}
            aria-label="Activity"
          >
            <FaCodeBranch className="text-lg" />
            <span className="text-xs">Activity</span>
          </button>
          <button
            onClick={() => handleTabChange('contact')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${tab === 'contact' ? 'text-blue-400' : 'text-gray-400'
              }`}
            aria-label="Contact"
          >
            <FaEnvelope className="text-lg" />
            <span className="text-xs">Contact</span>
          </button>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
