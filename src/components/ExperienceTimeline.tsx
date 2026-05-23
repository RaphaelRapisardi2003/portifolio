/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ExperienceItem } from '../types';
import { Briefcase, Calendar, ChevronDown, ChevronUp, MapPin, Milestone } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  isPt: boolean;
}

export default function ExperienceTimeline({ experiences, isPt }: ExperienceTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>("exp-1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="experience-timeline" className="relative border-l border-zinc-800/80 ml-3 pl-6 py-2 space-y-6">
      {experiences.map((exp, index) => {
        const isExpanded = expandedId === exp.id;
        const isCurrent = index === 0;

        return (
          <div key={exp.id} className="relative group">
            {/* Timeline Marker point with pulse for current experience */}
            <div className="absolute -left-[30px] top-1.5 z-10">
              {isCurrent ? (
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-zinc-950 border-2 border-rose-500 justify-center items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  </span>
                </span>
              ) : (
                <span className="flex h-4 w-4 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-zinc-500 transition-colors justify-center items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-500" />
                </span>
              )}
            </div>

            {/* Event Header Block */}
            <div 
              id={`experience-item-${exp.id}`}
              onClick={() => toggleExpand(exp.id)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                isExpanded 
                  ? 'border-zinc-700 bg-zinc-900/10' 
                  : 'border-zinc-800/40 bg-zinc-950/5 hover:border-zinc-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-200 tracking-tight group-hover:text-zinc-100 transition-colors">
                      {isPt ? exp.rolePt : exp.roleEn}
                    </h3>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-sm">
                        {isPt ? 'ATUAL' : 'CURRENT'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1 font-mono">
                    <span className="font-semibold text-zinc-300">{exp.company}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Technology count indicator */}
                  <span className="hidden md:inline-block text-[10px] font-mono text-zinc-500">
                    {exp.highlightTech.length} {isPt ? 'tecnologias' : 'technologies'}
                  </span>
                  <button className="text-zinc-500 group-hover:text-zinc-300 transition-colors focus:outline-hidden">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content Area */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 pt-4 border-t border-zinc-900 overflow-hidden"
                >
                  <ul className="space-y-3 leading-relaxed text-xs text-zinc-400 font-normal">
                    {(isPt ? exp.bulletsPt : exp.bulletsEn).map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2">
                        <span className="text-rose-500 mt-1 select-none font-mono text-[10px]">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {exp.highlightTech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-0.5 text-[9px] font-mono font-medium text-zinc-400 bg-zinc-900 border border-zinc-800/80 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
