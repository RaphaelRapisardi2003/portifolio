/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PORTFOLIO_DATA, 
  Project, 
  ExperienceItem, 
  Skill, 
  CertificationItem, 
  EducationItem 
} from './types';
import SkillMatrix from './components/SkillMatrix';
import ContactForm from './components/ContactForm';
import {
  Zap,
  ArrowUpRight,
  Terminal,
  Download,
  Layers,
  Bookmark,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Smartphone,
  MapPin,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

export default function App() {
  const [isPt, setIsPt] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState('about');
  const [typewriterText, setTypewriterText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const rolesEn = [
    "Full Stack Developer",
    "AWS Services Specialist",
    "Queue and Event Architecture Specialist",
    "Payment Services Specialist",
  ];

  const rolesPt = [
    "Desenvolvedor Fullstack",
    "Especialista em serviços AWS",
    "Arquiteto de Filas e Eventos",
    "Especialista em serviços de pagamento",
  ];

  // Dynamic Typewriter Effect simulating Lewis Hadden style
  useEffect(() => {
    const roles = isPt ? rolesPt : rolesEn;
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText(prev => prev.slice(0, -1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypewriterText(currentRole.slice(0, typewriterText.length + 1));
      }, 75);
    }

    if (!isDeleting && typewriterText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
    } else if (isDeleting && typewriterText === '') {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, roleIndex, isPt]);

  // Load browser language default if available
  useEffect(() => {
    const lValue = window.navigator.language;
    if (lValue && lValue.toLowerCase().startsWith('pt')) {
      setIsPt(true);
    }
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'projects', labelEn: 'Projects', labelPt: 'Projetos' },
    { id: 'skills', labelEn: 'Skills & Stack', labelPt: 'Habilidades' },
    { id: 'about', labelEn: 'About', labelPt: 'Sobre' },
    { id: 'certifications', labelEn: 'Certifications', labelPt: 'Certificações' },
    { id: 'contact', labelEn: 'Contact', labelPt: 'Contato' },
  ];

  const marqueeBadges = [
    "TypeScript", "Node.js", "Apache Kafka", "AWS SQS", "AWS Lambda", 
    "Amazon SNS", "PostgreSQL", "MongoDB", "DynamoDB", "N8N Automations", 
    "Docker Containers", "Python Scripting"
  ];

  return (
    <div className={`min-h-screen bg-[#030209] text-zinc-100 selection:bg-rose-500/30 selection:text-white font-sans overflow-x-hidden flex flex-col justify-between relative space-stars${!isDark ? ' light-mode' : ''}`}>
      
      {/* Background Orbs Gimmick - Premium Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0 nebula-glow-1" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none z-0 nebula-glow-2" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-0 nebula-glow-1" />

      {/* FLOATING TOP NAVIGATION HEADER (CAPSULE STYLE) */}
      <header className="fixed top-4 z-50 w-full select-none px-4">
        <div className="max-w-5xl mx-auto h-14 rounded-full glass-capsule border border-white/5 flex justify-between items-center px-7 shadow-lg shadow-black/80">

          {/* Logo Brand Title */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo('hero-section')}>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-mono text-sm font-bold tracking-wider text-zinc-250 uppercase hover:text-rose-400 transition-colors">
              R. RAPISARDI
            </span>
          </div>

          {/* Nav Items Capsule — desktop only */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`px-3 py-1 rounded-full text-sm font-mono font-medium tracking-tight transition-all duration-300 relative ${
                    isActive ? 'text-rose-400 font-semibold' : 'text-zinc-450 hover:text-zinc-250'
                  }`}
                >
                  <span className="relative z-10">{isPt ? item.labelPt : item.labelEn}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-white/5 rounded-full border border-white/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side: language switcher + mobile hamburger */}
          <div className="flex items-center gap-2">
            <div id="language-switcher" className="flex items-center bg-white/5 border border-white/5 p-0.5 rounded-full text-[9px] font-mono">
              <button
                id="lang-en-btn"
                onClick={() => setIsPt(false)}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  !isPt
                    ? 'text-zinc-100 bg-white/10 font-bold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                EN
              </button>
              <button
                id="lang-pt-btn"
                onClick={() => setIsPt(true)}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  isPt
                    ? 'text-zinc-100 bg-white/10 font-bold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                PT
              </button>
            </div>

            {/* Light / Dark toggle */}
            <button
              onClick={() => setIsDark(prev => !prev)}
              className="p-1.5 rounded-full bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark
                ? <Sun  className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-1.5 rounded-full bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="md:hidden mt-2 max-w-3xl mx-auto rounded-2xl glass-capsule border border-white/5 p-2 shadow-xl shadow-black/80"
            >
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-medium tracking-tight transition-all duration-200 ${
                      isActive
                        ? 'text-rose-400 bg-white/5'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    {isPt ? item.labelPt : item.labelEn}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CORE WRAPPER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16 flex-grow z-10 relative">
        <div className="space-y-16 sm:space-y-32">
          
          {/* Section 1: Hero Cover Column with Typing Simulator */}
          <section id="hero-section" className="relative pt-12 pb-6 select-none">
            <div className="flex flex-col gap-6">
              
              <div className="space-y-3">
                {/* Visual Label */}
                <div className="inline-flex items-center gap-2">
                  <span className="text-rose-500/90 font-mono text-xs font-semibold tracking-wide">
                    // {isPt ? 'olá, eu sou' : 'hello, i’m'}
                  </span>
                </div>
                
                {/* Photo + Primary Display Title */}
                <div className="flex items-center gap-4 sm:gap-7">
                  {/* Profile photo */}
                  <div className="shrink-0 w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/40">
                    <img
                      src="/profile.png"
                      alt="Raphael L. Rapisardi"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-zinc-100 tracking-tight leading-none">
                    Raphael L. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-300 font-semibold">
                      Rapisardi
                    </span>
                  </h1>
                </div>

                {/* Simulated typewriter cursor */}
                <div className="h-8 flex items-center">
                  <p className="font-mono text-xs sm:text-sm text-zinc-400 font-medium flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1 rounded-full w-fit">
                    <Terminal className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="typing-cursor font-semibold text-rose-300">{typewriterText}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed pt-2">
                  {isPt ? PORTFOLIO_DATA.personalInfo.taglinePt : PORTFOLIO_DATA.personalInfo.taglineEn}
                </p>
              </div>

              {/* Action Rows */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button 
                  id="hero-contact-cta"
                  onClick={() => handleScrollTo('contact')}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-zinc-100 font-mono text-[10px] font-semibold rounded-full border border-rose-600 transition-all shadow-lg shadow-rose-950/20"
                >
                  {isPt ? 'Entrar em Contato' : 'Get in Touch'} <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  id="hero-projects-cta"
                  onClick={() => handleScrollTo('projects')}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-[10px] font-semibold rounded-full border border-white/5 transition-all"
                >
                  {isPt ? 'Ver Projetos & Fluxos' : 'Inspect Architecture'}
                </button>
              </div>

            </div>
          </section>

          {/* HORIZONTAL MARQUEE BADGE SECTION SCROLL */}
          <section className="relative w-full overflow-hidden py-1 border-y border-white/5 select-none my-6">
            <div className="animate-marquee flex gap-8 whitespace-nowrap">
              {marqueeBadges.concat(marqueeBadges).map((b, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-[#0a0712]/50 text-[10px] font-mono text-zinc-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {b}
                </span>
              ))}
            </div>
          </section>

          {/* Section 5: Project Gallery */}
          <section id="projects" className="scroll-mt-24 space-y-8">

            {/* Section header */}
            <div className="border-b border-white/5 pb-5 select-none">
              <span className="text-[10px] font-mono text-rose-500/80 font-bold tracking-wider">// PROJECTS</span>
              <h3 className="text-2xl font-display font-medium text-zinc-100 tracking-tight mt-1 leading-tight">
                {isPt ? 'Projetos Selecionados' : 'Selected Projects'}
              </h3>
              <p className="text-xs text-zinc-500 leading-normal font-normal mt-1.5">
                {isPt ? 'Clique em um card para ver os detalhes.' : 'Click a card to see full project details.'}
              </p>
            </div>

            {/* Image cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {PORTFOLIO_DATA.projects.map((proj) => {
                const gradients: Record<string, string> = {
                  'proj-viper':    'bg-gradient-to-br from-rose-950 via-[#1a0a14] to-[#030209]',
                  'proj-neeko':    'bg-gradient-to-br from-violet-950 via-[#0d0a1a] to-[#030209]',
                  'proj-luciobot': 'bg-gradient-to-br from-indigo-950 via-[#08091a] to-[#030209]',
                };
                return (
                  <div
                    id={`project-card-${proj.id}`}
                    key={proj.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 cursor-pointer select-none hover:border-white/15 transition-all duration-300"
                    style={{ aspectRatio: '4 / 3' }}
                    onClick={() => setModalProject(proj)}
                  >
                    {/* Background */}
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.titleEn}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`absolute inset-0 ${gradients[proj.id] ?? 'bg-[#0a0815]'} transition-transform duration-500 group-hover:scale-105 flex items-center justify-center`}>
                        <span className="font-display text-5xl font-bold text-white/5 tracking-tighter pointer-events-none">
                          {proj.titleEn}
                        </span>
                      </div>
                    )}

                    {/* Title strip */}
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <span className="text-[9px] font-mono text-rose-400 uppercase tracking-wide block leading-none mb-1">
                        {isPt ? proj.categoryPt : proj.categoryEn}
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-100 leading-tight">
                        {isPt ? proj.titlePt : proj.titleEn}
                      </h4>
                    </div>

                    {/* Hover hint */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-[9px] font-mono text-zinc-300 backdrop-blur-sm">
                        {isPt ? 'Ver mais' : 'View more'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </section>

          {/* Project Modal — rendered via portal to escape overflow-x-hidden */}
          {createPortal(
          <AnimatePresence>
            {modalProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                onClick={() => setModalProject(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="relative w-full max-w-lg bg-[#0a0814] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal image / gradient header */}
                  {(() => {
                    const gradients: Record<string, string> = {
                      'proj-viper':    'bg-gradient-to-br from-rose-950 via-[#1a0a14] to-[#0a0814]',
                      'proj-neeko':    'bg-gradient-to-br from-violet-950 via-[#0d0a1a] to-[#0a0814]',
                      'proj-luciobot': 'bg-gradient-to-br from-indigo-950 via-[#08091a] to-[#0a0814]',
                    };
                    return modalProject.imageUrl ? (
                      <img
                        src={modalProject.imageUrl}
                        alt={modalProject.titleEn}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className={`w-full h-44 ${gradients[modalProject.id] ?? 'bg-[#0a0815]'} flex items-center justify-center`}>
                        <span className="font-display text-6xl font-bold text-white/8 tracking-tighter select-none">
                          {modalProject.titleEn}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Close button */}
                  <button
                    onClick={() => setModalProject(null)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-black/80 transition-all backdrop-blur-sm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Modal content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[9px] font-mono text-rose-400 uppercase tracking-wide">
                        {isPt ? modalProject.categoryPt : modalProject.categoryEn}
                      </span>
                      <h3 className="text-xl font-display font-semibold text-zinc-100 mt-0.5">
                        {isPt ? modalProject.titlePt : modalProject.titleEn}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isPt ? modalProject.descriptionPt : modalProject.descriptionEn}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {modalProject.tech.map((t) => (
                        <span key={t} className="px-2 py-1 text-[9px] font-mono text-zinc-300 bg-white/5 border border-white/8 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* GitHub link */}
                    {modalProject.githubUrl && (
                      <a
                        href={modalProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        {isPt ? 'Ver no GitHub' : 'View on GitHub'}
                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
          )}

          {/* Section 4: Skills and Technology Matrix */}
          <section id="skills" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="w-full md:w-1/3 select-none">
                <span className="text-[10px] font-mono text-rose-500/80 font-bold tracking-wider">// STACK</span>
                <h3 className="text-2xl font-display font-medium text-zinc-100 tracking-tight mt-1 leading-tight">
                  {isPt ? 'Habilidades & Tecnologias' : 'Skills & Toolkit'}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-normal mt-3">
                  {isPt
                    ? 'Minha caixa de ferramentas, focada em entregar caminhos de dados assíncronos que não travam.'
                    : 'A toolkit focused on highly available server-side services and streaming architectures.'}
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <SkillMatrix skills={PORTFOLIO_DATA.skills} isPt={isPt} />
              </div>
            </div>
          </section>

          {/* Section 2: Professional Profile / About */}
          <section id="about" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="w-full md:w-1/3 select-none">
                <span className="text-[10px] font-mono text-rose-500/80 font-bold tracking-wider">// ABOUT ME</span>
                <h3 className="text-2xl font-display font-medium text-zinc-100 tracking-tight mt-1 leading-tight">
                  {isPt ? 'A engenharia de sistemas robustos.' : 'Designing for stability under heavy loads.'}
                </h3>
              </div>
              <div className="w-full md:w-2/3 space-y-5 font-normal">
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {isPt ? PORTFOLIO_DATA.personalInfo.aboutPt : PORTFOLIO_DATA.personalInfo.aboutEn}
                </p>

                {/* Education blocks in About list */}
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4 select-none">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-zinc-400" />
                    {isPt ? 'Formação Acadêmica' : 'Academic Formations'}
                  </span>

                  <div className="space-y-3">
                    {PORTFOLIO_DATA.education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-start gap-4 text-xs font-mono border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                        <div>
                          <span className="font-semibold text-zinc-200 block">{edu.institution}</span>
                          <span className="text-zinc-500 text-[10px] font-normal">{isPt ? edu.coursePt : edu.courseEn}</span>
                        </div>
                        <span className="text-zinc-500 text-[10px] shrink-0">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Education & Certifications Layout */}
          <section id="certifications" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="w-full md:w-1/3 select-none">
                <span className="text-[10px] font-mono text-rose-500/80 font-bold tracking-wider">// CERTIFICATIONS</span>
                <h3 className="text-2xl font-display font-medium text-zinc-100 tracking-tight mt-1 leading-tight">
                  {isPt ? 'Validações de Terceiros.' : 'Third-party Proofs.'}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-normal mt-3">
                  {isPt 
                    ? 'Chancela profissional e constante evolução técnica autorizada pelos líderes da tecnologia.' 
                    : 'Authorized credential paths that ground my expertise.'}
                </p>
              </div>

              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certifications.map((cert) => (
                  <div 
                    id={`cert-card-${cert.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    key={cert.title} 
                    className="p-4.5 rounded-2xl border border-white/5 bg-[#080612]/30 flex flex-col justify-between gap-3 group hover:border-white/10 transition-all select-none"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="text-[9px] font-mono text-zinc-400 font-bold tracking-tight uppercase">
                          {cert.issuer}
                        </span>
                        {cert.duration && (
                          <span className="px-1.5 py-0.5 text-[8px] font-mono text-zinc-500 bg-white/5 border border-white/5 rounded">
                            {cert.duration}
                          </span>
                        )}
                      </div>

                      <h4 className="text-[11px] font-semibold text-zinc-250 tracking-tight mb-2 group-hover:text-rose-400 transition-colors">
                        {cert.title}
                      </h4>

                      <p className="text-[10px] text-zinc-500 leading-relaxed font-normal">
                        {isPt ? cert.descriptionPt : cert.descriptionEn}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-zinc-500">
                      <Bookmark className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                      <span>{isPt ? 'Credencial Válida' : 'Authorized Credential'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 7: Live Beautiful Contact form */}
          <section id="contact" className="scroll-mt-24 pt-12 border-t border-white/5">
            <div className="space-y-8">
              
              <div className="max-w-xl select-none">
                <span className="text-[10px] font-mono text-rose-500/80 font-bold tracking-wider">// COMM PORTAL</span>
                <h3 className="text-2xl font-display font-medium text-zinc-100 tracking-tight mt-1 leading-tight">
                  {isPt ? 'Inicie um canal direto.' : 'Initialize communication queues.'}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-normal mt-1.5">
                  {isPt 
                    ? 'Clique em qualquer um dos canais diretos abaixo para falarmos de maneira rápida e imediata.' 
                    : 'Click any of the direct channels below to start a quick and direct conversation.'}
                </p>
              </div>

              <ContactForm contacts={PORTFOLIO_DATA.personalInfo.contacts} isPt={isPt} />
              
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER ACCENTS DETAIL */}
      <footer className="border-t border-white/5 bg-[#03010b] py-12 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start text-xs font-mono text-zinc-500">
            <span className="font-semibold text-zinc-455">RAPHAEL L. RAPISARDI</span>
            <span className="text-[10px] mt-1">© 2026. {isPt ? 'Todos os direitos reservados' : 'All rights reserved.'}</span>
          </div>

          {/* Social Profiles Direct List */}
          <div className="flex items-center gap-3">
            <a 
              id="footer-github"
              href={PORTFOLIO_DATA.personalInfo.contacts.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-full border border-white/5 bg-[#03020a]/80 text-zinc-400 hover:text-white transition-all cursor-pointer hover:border-white/10"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              id="footer-linkedin"
              href={PORTFOLIO_DATA.personalInfo.contacts.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-full border border-white/5 bg-[#03020a]/80 text-zinc-400 hover:text-white transition-all cursor-pointer hover:border-white/10"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              id="footer-email"
              href={`mailto:${PORTFOLIO_DATA.personalInfo.contacts.email}`}
              className="p-2.5 rounded-full border border-white/5 bg-[#03020a]/80 text-zinc-400 hover:text-white transition-all cursor-pointer hover:border-white/10"
              title="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end text-[9px] font-mono text-zinc-650">
            <span>STABILITY ACCREDITED</span>
            <span>COMPILED WITH VITE & REACT</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
