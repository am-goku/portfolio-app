import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SKILLS from '../lib/skills';

export default function SkillsGrid() {
  const [expanded, setExpanded] = useState(false);

  // how many items to show when collapsed
  const visibleCount = 10;

  const visibleSkills = expanded ? SKILLS : SKILLS.slice(0, visibleCount);

  return (
    <div className="mt-4">
      <motion.div
        layout
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
      >
        <AnimatePresence>
          {visibleSkills.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-all p-3 rounded-lg text-center shadow-sm"
            >
              <Icon className="text-3xl text-indigo-400 mb-2" />
              <span className="text-xs text-gray-200">{name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expand/Collapse Button */}
      {SKILLS.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
          >
            {expanded ? 'Show Less ▲' : 'Show More ▼'}
          </button>
        </div>
      )}
    </div>
  );
}
