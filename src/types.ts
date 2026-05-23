/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  titleEn: string;
  titlePt: string;
  categoryEn: string;
  categoryPt: string;
  descriptionEn: string;
  descriptionPt: string;
  tech: string[];
  metricsEn: string[];
  metricsPt: string[];
  architecture?: {
    nodes: Array<{ id: string; label: string; x: number; y: number; type: 'source' | 'broker' | 'worker' | 'storage' }>;
    connections: Array<{ from: string; to: string; label?: string }>;
  };
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface ExperienceItem {
  id: string;
  roleEn: string;
  rolePt: string;
  company: string;
  period: string;
  bulletsEn: string[];
  bulletsPt: string[];
  highlightTech: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'core' | 'backend' | 'cloud' | 'automation' | 'databases';
  descriptionEn: string;
  descriptionPt: string;
}

export interface EducationItem {
  institution: string;
  courseEn: string;
  coursePt: string;
  period: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  duration?: string;
  descriptionEn: string;
  descriptionPt: string;
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Raphael L. Rapisardi",
    titleEn: "Fullstack Developer",
    titlePt: "Desenvolvedor Fullstack",
    age: 23,
    location: "São Paulo, SP, Brazil",
    taglineEn: "Building resilient, event-driven backends and cloud-native solutions that handle high-volume distributed data streams.",
    taglinePt: "Construindo serviços resilientes, orientados a eventos e soluções cloud-native para processamento de alto volume de dados distribuídos.",
    aboutEn: "Fullstack Developer specializing in event-driven systems and cloud-native architectures. At Dry Telecom, I design and implement data pipelines with Apache Kafka, APIs in TypeScript/Node.js, and AWS solutions that power critical telecom operations. My background in quality assurance and leadership equips me with a systemic, process-oriented view that I apply directly to software systems design.",
    aboutPt: "Desenvolvedor Fullstack especialista em sistemas orientados a eventos e arquiteturas cloud-native. Na Dry Telecom, projeto e implemento pipelines de dados com Apache Kafka, APIs com TypeScript/Node.js e soluções AWS que suportam operações críticas de telecomunicações. Minha trajetória anterior em gestão de qualidade e liderança de equipe me deu visão sistêmica de processos e capacidade analítica aplicada diretamente no design de software.",
    contacts: {
      whatsapp: "(11) 99799-6417",
      whatsappUrl: "https://wa.me/5511997996417",
      email: "raphaelimarapisardi@gmail.com",
      linkedin: "raphael-rapisardi-a55790235",
      linkedinUrl: "https://www.linkedin.com/in/raphael-rapisardi-a55790235",
      github: "RaphaelRapisardi2003",
      githubUrl: "https://github.com/RaphaelRapisardi2003"
    }
  },
  skills: [
    {
      name: "TypeScript",
      level: 95,
      category: "backend",
      descriptionEn: "Primary language for building robust microservices, custom APIs, and event-handling workers.",
      descriptionPt: "Linguagem principal usada na construção de microsserviços robustos, APIs customizadas e workers orientados a eventos."
    },
    {
      name: "Node.js",
      level: 95,
      category: "backend",
      descriptionEn: "Highly scalable asynchronous servers using Express, Fastify, and event loop performance tuning.",
      descriptionPt: "Servidores assíncronos altamente escaláveis usando Express, Fastify e otimização de performance no event loop."
    },
    {
      name: "Apache Kafka",
      level: 90,
      category: "core",
      descriptionEn: "Designing event streams, partition schemas, distributed consumer groups, and replayable data pipelines.",
      descriptionPt: "Modelagem de fluxos de eventos, chaves de partição, grupos de consumidores e pipelines reprocessáveis."
    },
    {
      name: "AWS Cloud",
      level: 88,
      category: "cloud",
      descriptionEn: "Serverless architectures via Lambdas, message queues with SQS, cloud storage with S3, and API Gateway traffic routing.",
      descriptionPt: "Arquiteturas serverless via Lambdas, filas de mensageria com SQS, armazenamento com S3 e roteamento com API Gateway."
    },
    {
      name: "SQS & SNS",
      level: 90,
      category: "core",
      descriptionEn: "Decoupling microservices using message queues, dead-letter queues, and high-throughput publish-subscribe channels.",
      descriptionPt: "Desacoplamento de microsserviços via filas de mensagens, dead-letter queues (DLQ) e canais de pub/sub."
    },
    {
      name: "N8N Automation",
      level: 85,
      category: "automation",
      descriptionEn: "Building low-overhead workflow integrations, automated operational alerts, and third-party API orchestrations.",
      descriptionPt: "Construção de fluxos de integração leves, alertas operacionais automáticos e orquestração de APIs."
    },
    {
      name: "SQL (PostgreSQL / MySQL)",
      level: 85,
      category: "databases",
      descriptionEn: "Schema modeling, indexes tuning, transactions isolation, complex joins, and telemetry logs storage.",
      descriptionPt: "Modelagem de tabelas, otimização de índices, isolamento de transações e armazenamento de telemetria."
    },
    {
      name: "NoSQL (MongoDB / DynamoDB)",
      level: 82,
      category: "databases",
      descriptionEn: "Key-value and document structures for state-tracking, device telemetry, and quick key lookups.",
      descriptionPt: "Bancos chave-valor e documento para controle de estados, telemetria de dispositivos e leitura ultra-rápida."
    },
    {
      name: "Python",
      level: 80,
      category: "backend",
      descriptionEn: "Scripting, task scheduling, rapid prototyping of data utilities, and basic machine learning integration.",
      descriptionPt: "Scripting, agendamento de tarefas, prototipagem rápida de utilitários de dados e integrações iniciais de IA."
    },
    {
      name: "Java",
      level: 75,
      category: "backend",
      descriptionEn: "Familiarity with Spring Boot and enterprise patterns for microservices and structured APIs.",
      descriptionPt: "Familiaridade com Spring Boot e padrões corporativos para microservices e APIs altamente tipadas."
    },
    {
      name: "PHP",
      level: 72,
      category: "backend",
      descriptionEn: "Legacy integrations and fullstack scripts for simple CMS and REST endpoints.",
      descriptionPt: "Integrações legadas e scripts fullstack para CMS simples e endpoints REST de apoio."
    },
    {
      name: "REST APIs",
      level: 95,
      category: "core",
      descriptionEn: "Design of predictable APIs, JSON schemas, rate-limiting, secure headers, CORS, and full OpenAPI documentation.",
      descriptionPt: "Design de APIs previsíveis, schemas JSON estruturados, rate-limiting, segurança e documentação OpenAPI."
    }
  ] as Skill[],
  experiences: [
    {
      id: "exp-1",
      roleEn: "Backend Developer",
      rolePt: "Desenvolvedor Backend",
      company: "Dry Telecom",
      period: "Dez 2025 - Present",
      bulletsEn: [
        "Development of scalable, AWS-native backend services integrating Lambda, S3, SQS, and API Gateway for telecom core functions.",
        "Architecture and deployment of high-throughput event-driven routing pipelines using Apache Kafka for real-time mobile data streaming.",
        "Operational efficiency optimization through automated workflows inside N8N, removing manual processing bottlenecks.",
        "Database schema design and query optimization for both high-performance SQL databases and durable NoSQL document stores."
      ],
      bulletsPt: [
        "Desenvolvimento de serviços backend escaláveis integrados ao ecossistema AWS (Lambda, S3, SQS, API Gateway) para telefonia.",
        "Arquitetura e implementação de pipelines event-driven com Apache Kafka para processamento assíncrono de alto volume em telecomunicações.",
        "Automação de processos operacionais com N8N, eliminando gargalos operacionais e aumentando eficiência da equipe de engenharia.",
        "Modelagem e otimização de schemas em bancos relacionais (SQL) e não-relacionais (NoSQL), garantindo performance e integridade."
      ],
      highlightTech: ["TypeScript", "Node.js", "Apache Kafka", "AWS SQS", "Lambda", "N8N", "SQL", "NoSQL"]
    },
    {
      id: "exp-2",
      roleEn: "Quality Coordinator",
      rolePt: "Coordenador de Qualidade",
      company: "Concentrix",
      period: "Set 2025 - Dez 2025",
      bulletsEn: [
        "Leadership of quality assurance operations coaching technical analysts on data gathering and reporting frameworks.",
        "Formulation of operational SLA metrics, executive dashboards, and strategic reports supporting critical leadership resolutions.",
        "Refinement of process diagnostics and operational flows, practicing active stakeholder relationship communication."
      ],
      bulletsPt: [
        "Liderança de equipe de analistas de qualidade, focando em diagnóstico estatístico de processos e melhoria contínua de performance.",
        "Análise profunda de métricas operacionais chaves e elaboração de relatórios executivos analíticos para tomada de decisão estratégica.",
        "Gestão direta de pessoas e comunicação estreita com stakeholders corporativos nacionais e internacionais."
      ],
      highlightTech: ["Process Analysis", "Team Leadership", "Data Dashboards", "SLA Reporting"]
    },
    {
      id: "exp-3",
      roleEn: "Quality Analyst",
      rolePt: "Analista de Qualidade",
      company: "Concentrix",
      period: "Out 2023 - Set 2025",
      bulletsEn: [
        "Audit and analytics of performance benchmarks and internal metrics reporting against strict service level agreements (SLAs).",
        "Creation of structured performance feedback matrices and strategic action plans generating measurable continuous improvement."
      ],
      bulletsPt: [
        "Auditoria de desempenho de atendimento técnico e análise estatística baseada em indicadores chave de performance (KPIs).",
        "Elaboração de feedbacks estruturados, planos de ação corretiva e mapeamento de gargalos em sistemas operacionais."
      ],
      highlightTech: ["KPI Control", "Active Auditing", "Data Analysis"]
    }
  ] as ExperienceItem[],
  education: [
    {
      institution: "Universidade Anhembi Morumbi",
      courseEn: "Bachelor's In Computer Science (Ciência da Computação)",
      coursePt: "Bacharelado em Ciência da Computação",
      period: "07/2021 - 07/2025"
    },
    {
      institution: "Santander Bootcamp",
      courseEn: "Software Engineering Specialization",
      coursePt: "Especialização em Engenharia de Software",
      period: "03/2026 - Present"
    },
    {
      institution: "Wise Up Online",
      courseEn: "Advanced English Programme",
      coursePt: "Programa de Inglês Avançado",
      period: "2020 - 2021"
    }
  ] as EducationItem[],
  certifications: [
    {
      title: "AWS Cloud Foundations",
      issuer: "AWS Academy",
      duration: "40 hrs",
      descriptionEn: "Core cloud architecture concepts, compute/storage services design, and basic network & resource security configurations in AWS.",
      descriptionPt: "Estrutura dos serviços de nuvem AWS, análise detalhada de requisitos de infraestrutura e princípios recomendados de arquitetura."
    },
    {
      title: "Fundamentos do Suporte Técnico",
      issuer: "Google / Coursera",
      duration: "23 hrs",
      descriptionEn: "Tech support principles, foundational TCP/IP networking, command-line interfaces, server operating systems, and basic cybersecurity standards.",
      descriptionPt: "Princípios essenciais de suporte técnico em TI, fundamentos de redes, sistemas operacionais e noções cruciais de segurança."
    },
    {
      title: "Desenvolvimento Web Completo",
      issuer: "Udemy",
      duration: "114.5 hrs",
      descriptionEn: "Comprehensive web fundamentals including HTML5, CSS3, ES6 JavaScript, REST concepts, databases integration, and backend PHP structures.",
      descriptionPt: "Formação integral em ferramentas web, cobrindo HTML5, CSS3, JavaScript ES2022, conceitos REST, bancos de dados e desenvolvimento back PHP."
    },
    {
      title: "Bootcamp Santander",
      issuer: "Santander Academy",
      duration: "In Progress",
      descriptionEn: "In-depth modern backend frameworks, systems architecture, design patterns, and high-performance algorithms program.",
      descriptionPt: "Formação backend avançada focado em conceitos modernos de engenharia de software, sistemas distribuídos e metodologias ágeis."
    }
  ] as CertificationItem[],
  projects: [
    {
      id: "proj-viper",
      titleEn: "Viper",
      titlePt: "Viper",
      categoryEn: "Frontend · E-commerce",
      categoryPt: "Frontend · E-commerce",
      descriptionEn: "A fictional e-commerce storefront designed for women's fashion. Built with semantic HTML and pure CSS, focusing on responsive layout, clean visual hierarchy, and an elegant shopping experience from product browsing to cart flow. [Replace this description with your own summary.]",
      descriptionPt: "Loja virtual fictícia voltada ao público feminino. Desenvolvida com HTML semântico e CSS puro, com foco em layout responsivo, hierarquia visual limpa e experiência de compra elegante — do catálogo ao fluxo de carrinho. [Substitua por sua descrição.]",
      tech: ["HTML5", "CSS3"],
      metricsEn: ["Fully responsive layout", "Semantic HTML structure", "Custom CSS animations"],
      metricsPt: ["Layout totalmente responsivo", "Estrutura HTML semântica", "Animações CSS customizadas"],
      githubUrl: "https://github.com/RaphaelRapisardi2003/Viper",
      // imageUrl: "/screenshots/viper.png", // add your own screenshot here
    },
    {
      id: "proj-neeko",
      titleEn: "Neeko",
      titlePt: "Neeko",
      categoryEn: "Backend · Microservices API",
      categoryPt: "Backend · API Microserviços",
      descriptionEn: "Petshop e-commerce API with four independent NestJS microservices communicating via Apache Kafka. Implements Hexagonal Architecture and DDD — cart, orders, payment via Pagar.me, and delivery tracking modules. [Replace this description with your own summary.]",
      descriptionPt: "API de e-commerce para petshop com quatro microsserviços NestJS independentes comunicando via Apache Kafka. Implementa Arquitetura Hexagonal e DDD — módulos de carrinho, pedidos, pagamento via Pagar.me e rastreio de entrega. [Substitua por sua descrição.]",
      tech: ["NestJS", "TypeScript", "Kafka", "MongoDB", "Docker", "DDD"],
      metricsEn: ["4 independent microservices", "Event-driven via Apache Kafka", "Hexagonal Architecture + DDD"],
      metricsPt: ["4 microsserviços independentes", "Comunicação via Apache Kafka", "Arquitetura Hexagonal + DDD"],
      githubUrl: "https://github.com/RaphaelRapisardi2003/Neeko",
      // imageUrl: "/screenshots/neeko.png", // add your own screenshot here
    },
    {
      id: "proj-luciobot",
      titleEn: "LucioBot",
      titlePt: "LucioBot",
      categoryEn: "Bot · Discord Automation",
      categoryPt: "Bot · Automação Discord",
      descriptionEn: "A Discord music bot built in Python that streams audio from YouTube directly into voice channels. Supports queue management, skip/pause/resume commands, and runs continuously on lightweight hosting. [Replace this description with your own summary.]",
      descriptionPt: "Bot de música para Discord desenvolvido em Python que transmite áudio do YouTube para canais de voz. Suporta fila de músicas, comandos de skip/pause/resume e roda continuamente em hosting leve. [Substitua por sua descrição.]",
      tech: ["Python", "discord.py", "yt-dlp", "FFmpeg"],
      metricsEn: ["YouTube audio streaming", "Queue management commands", "Continuous 24/7 uptime"],
      metricsPt: ["Streaming de áudio do YouTube", "Comandos de fila de músicas", "Uptime contínuo 24/7"],
      githubUrl: "https://github.com/RaphaelRapisardi2003/LucioBot",
      // imageUrl: "/screenshots/luciobot.png", // add your own screenshot here
    },
  ] as Project[]
};
