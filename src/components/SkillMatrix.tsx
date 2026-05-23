/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill } from '../types';

interface SkillMatrixProps {
  skills: Skill[];
  isPt: boolean;
}

const SKILL_ICONS: Record<string, string> = {
  'TypeScript':                'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'Node.js':                   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'JavaScript':                'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'React':                     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Next.js':                   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'NestJS':                    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
  'HTML5':                     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'CSS3':                      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'Apache Kafka':              'https://cdn.simpleicons.org/apachekafka/ffffff',
  'RabbitMQ':                  'https://cdn.simpleicons.org/rabbitmq/FF6600',
  'AWS Cloud':                 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'N8N Automation':            'https://cdn.simpleicons.org/n8n/EA4B71',
  'SQL (PostgreSQL / MySQL)':  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'NoSQL (MongoDB / DynamoDB)':'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'Python':                    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'Java':                      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'PHP':                       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  'REST APIs':                 'https://cdn.simpleicons.org/swagger/85EA2D',
};

export default function SkillMatrix({ skills, isPt }: SkillMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'core' | 'backend' | 'cloud' | 'automation' | 'databases'
  >('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: 'all',        labelEn: 'All Technologies',    labelPt: 'Todas' },
    { id: 'core',       labelEn: 'Streaming & Core',    labelPt: 'Streaming e Core' },
    { id: 'backend',    labelEn: 'Languages & Backend', labelPt: 'Linguagens e Backend' },
    { id: 'cloud',      labelEn: 'Cloud Native AWS',    labelPt: 'AWS & Cloud' },
    { id: 'automation', labelEn: 'Automation & Hooks',  labelPt: 'Automação & N8N' },
    { id: 'databases',  labelEn: 'SQL & NoSQL',         labelPt: 'Bancos de Dados' },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <div id="skills-matrix" className="w-full flex flex-col gap-6">

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-zinc-800/60 pb-4 select-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              id={`skill-tab-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium tracking-tight transition-all duration-300 ${
                isActive
                  ? 'text-zinc-100 bg-zinc-900 border border-zinc-800/80 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-300 bg-transparent border border-transparent'
              }`}
            >
              <span className="relative z-10">{isPt ? cat.labelPt : cat.labelEn}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-zinc-900/60 rounded-lg border border-zinc-800/50 -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Skills grid — cards fixed size, tooltip floats absolute */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, idx) => {
            const isHovered = hoveredSkill === skill.name;
            const iconUrl = SKILL_ICONS[skill.name];

            return (
              <motion.div
                id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18, delay: idx * 0.03 }}
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                /* Fixed size — never grows */
                className={`relative flex items-center justify-center rounded-xl border p-3 cursor-default select-none transition-all duration-200 aspect-square ${
                  isHovered
                    ? 'border-zinc-600 bg-zinc-900/60 shadow-lg shadow-zinc-950/50'
                    : 'border-zinc-800/50 bg-zinc-950/20'
                }`}
              >
                {/* Real tech icon */}
                <img
                  src={iconUrl}
                  alt={skill.name}
                  className="w-8 h-8 object-contain"
                  draggable={false}
                />

                {/* Floating tooltip — absolute, does NOT affect grid */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key="tooltip"
                      initial={{ opacity: 0, y: 4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="fixed sm:absolute bottom-4 sm:bottom-auto sm:top-full left-1/2 -translate-x-1/2 sm:mt-2 z-50 w-56 sm:w-44 bg-zinc-900 border border-zinc-700/80 rounded-xl p-3 shadow-xl shadow-black/60 pointer-events-none"
                    >
                      {/* Small arrow — desktop only, points up to the card */}
                      <div className="hidden sm:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-l border-t border-zinc-700/80 rotate-45" />

                      <span className="block text-[11px] font-semibold text-zinc-200 font-mono mb-1.5 leading-tight text-center sm:text-left">
                        {skill.name}
                      </span>
                      <p className="text-[10px] text-zinc-500 leading-relaxed text-center sm:text-left">
                        {isPt ? skill.descriptionPt : skill.descriptionEn}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
