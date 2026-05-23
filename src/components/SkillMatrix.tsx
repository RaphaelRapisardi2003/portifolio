/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill } from '../types';
import { Layers, Database, Cpu, HelpCircle, Terminal, Zap, ArrowRight } from 'lucide-react';

interface SkillMatrixProps {
  skills: Skill[];
  isPt: boolean;
}

export default function SkillMatrix({ skills, isPt }: SkillMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'backend' | 'cloud' | 'automation' | 'databases'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Technologies', labelPt: 'Todas' },
    { id: 'core', labelEn: 'Streaming & Core', labelPt: 'Streaming e Core' },
    { id: 'backend', labelEn: 'Languages & Backend', labelPt: 'Linguagens e Backend' },
    { id: 'cloud', labelEn: 'Cloud Native AWS', labelPt: 'AWS & Cloud' },
    { id: 'automation', labelEn: 'Automation & Hooks', labelPt: 'Automação & N8N' },
    { id: 'databases', labelEn: 'SQL & NoSQL', labelPt: 'Bancos de Dados' }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return <Zap className="w-4 h-4 text-rose-400" />;
      case 'backend': return <Terminal className="w-4 h-4 text-sky-400" />;
      case 'cloud': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'automation': return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'databases': return <Database className="w-4 h-4 text-amber-400" />;
      default: return <HelpCircle className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div id="skills-matrix" className="w-full flex flex-col gap-6">
      {/* Category Selection Tabs */}
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
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Custom Styled Interactive Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, idx) => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <motion.div
                id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`relative p-4.5 rounded-xl border transition-all duration-300 cursor-default select-none group flex flex-col justify-between overflow-hidden ${
                  isHovered 
                    ? 'border-zinc-700 bg-zinc-900/40 shadow-lg shadow-zinc-950/50' 
                    : 'border-zinc-800/50 bg-zinc-950/20'
                }`}
              >
                {/* Decorative background glow for active category */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-zinc-800/5 to-transparent rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Skill Badge Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                        {getCategoryIcon(skill.category)}
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-200 tracking-tight group-hover:text-zinc-100 transition-colors">
                        {skill.name}
                      </h4>
                    </div>
                  </div>

                  {/* Skill description */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-4">
                    {isPt ? skill.descriptionPt : skill.descriptionEn}
                  </p>
                </div>

                {/* Sub-indicator linking back to relevant projects */}
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 mt-2 hover:text-zinc-200 cursor-pointer"
                  >
                    <span>{isPt ? "Ver fluxos relacionados" : "View related pipelines"}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-500 animate-pulse" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
