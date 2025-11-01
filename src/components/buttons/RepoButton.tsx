import { useState, useEffect, useRef } from 'react';
import type { Project } from '../../lib/projects';

export default function RepoLinks({ repos, live }: { repos: Project['repos']; live: Project['live'] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="flex gap-3 items-center relative">
      {/* Live Demo Button */}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-sm text-white shadow-lg transition-colors"
        >
          Live Demo
        </a>
      )}

      {/* Repositories */}
      {repos.length === 1 ? (
        <a
          href={repos[0].url}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm text-white shadow-lg transition-colors"
        >
          GitHub Repo
        </a>
      ) : (
        <div className="relative inline-block">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm text-white shadow-lg flex items-center gap-2 transition-colors"
          >
            <span>Repositories</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {open && (
            <div className="absolute mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-48 z-10 animate-fade-in">
              {repos.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {r.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
