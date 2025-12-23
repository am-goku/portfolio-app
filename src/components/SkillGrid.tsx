import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../lib/skills';

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const currentCategory = SKILL_CATEGORIES.find(cat => cat.id === activeCategory);

  return (
    <div className="mt-4">
      {/* Category Icons - Icon-only for all devices */}
      <div className="flex gap-3 mb-4 justify-center">
        {SKILL_CATEGORIES.map(category => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <div key={category.id} className="flex flex-col items-center gap-1">
            <button
              onClick={() => setActiveCategory(category.id)}
              className={`p-3 rounded-lg transition-all ${isActive
                ? 'bg-blue-600 text-white shadow-lg scale-110'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105'
                }`}
              title={category.name}
              aria-label={category.name}
            >
              <Icon className="text-xl" />
            </button>
              {/* Show name on mobile or when active */}
              {
                isActive && (
                  <span className="text-xs transition-colors text-blue-400 font-medium">
                    {category.name}
                  </span>
                )
              }
            </div>
          );
        })}
      </div>

      {/* Category Description */}
      <p className="text-xs text-gray-400 mb-4 italic text-center">
        {currentCategory?.description}
      </p>

      {/* Skills Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-3 sm:grid-cols-4 gap-3"
      >
        {currentCategory?.skills.map(({ name, icon: Icon }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-all p-3 rounded-lg text-center shadow-sm border border-white/10"
          >
            <Icon className="text-3xl text-blue-400 mb-2" />
            <span className="text-xs text-gray-200">{name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill Count */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        {currentCategory?.skills.length} skills
      </p>
    </div>
  );
}
