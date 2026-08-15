export interface ProjectLink {
  label: string;
  url: string;
  type: 'live' | 'github' | 'playstore';
}

export interface RedactionZone {
  top: string;
  left: string;
  width: string;
  height: string;
  label: string;
}

export interface SubAsset {
  src: string;
  alt: string;
  aspectRatio: string;
  maxDisplayWidth?: string;
}

export interface BeatAsset {
  src: string;
  alt: string;
  type: 'image' | 'video';
  aspectRatio: string;
  redactionZones?: RedactionZone[];
  additionalAssets?: SubAsset[];
}

export interface BeatData {
  id: string;
  beatIndex: string;
  eyebrow: string;
  title: string;
  subtitleItalic?: string;
  narrative: string;
  contribution: string[];
  interfaceCallout: string;
  techStack: string[];
  asset: BeatAsset;
  stageColor: string;
  links: ProjectLink[];
}

export interface ProjectData {
  id: string;
  projectNumber: string;
  title: string;
  subtitleItalic: string;
  tagline: string;
  role: string;
  techStack: string[];
  disclaimer?: string;
  beats: BeatData[];
}

export interface CreatorData {
  name: string;
  role: string;
  thesis: string;
  pillars: string;
  email: string;
  linkedin: string;
  github: string;
  canonical: string;
}

export interface MoreBuildsData {
  eyebrow: string;
  heading: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface PortfolioData {
  creator: CreatorData;
  projects: ProjectData[];
  moreBuilds: MoreBuildsData;
}

export const PORTFOLIO_DATA: PortfolioData = {
  creator: {
    name: "Devang Gupta",
    role: "Software Engineer",
    thesis: "I build things that do things.",
    pillars: "Mobile. Systems. AI.",
    email: "maybedevang29@gmail.com",
    linkedin: "https://www.linkedin.com/in/devang-gupta-267475343/",
    github: "https://github.com/devang-altf4",
    canonical: "https://devangbuilds.me"
  },
  projects: [
    {
      id: "starz",
      projectNumber: "01 / 06",
      title: "STARZ AI Engine",
      subtitleItalic: "Multi-agent autonomous growth platform.",
      tagline: "A suite of coordinated AI agents automating local search optimization, content creation, conversational qualification, and paid advertising.",
      role: "Full-Stack & Systems Engineer",
      techStack: ["Next.js", "Python", "FastAPI", "Meta Graph API", "Tailwind CSS"],
      disclaimer: "Built as part of Starz Ventures. All rights reserved by the company.",
      beats: [
        {
          id: "starz-overview",
          beatIndex: "01.0",
          eyebrow: "01 / 06 — FLAGSHIP SUITE",
          title: "The Agent Architecture",
          subtitleItalic: "Five autonomous systems in one product suite.",
          narrative: "Engineered a synchronized ecosystem of AI agents that independently manage business growth operations from a single unified interface.",
          contribution: [
            "Architected multi-agent orchestration layer",
            "Built responsive mobile and web dashboard client",
            "Integrated cross-agent shared telemetry state"
          ],
          interfaceCallout: "Mobile client showing active agent cards and onboarding workflow.",
          techStack: ["Next.js", "Python", "FastAPI"],
          asset: {
            src: "/assets/starz-app-overview.jpg",
            alt: "STARZ Mobile Application Overview",
            type: "image",
            aspectRatio: "9/20"
          },
          stageColor: "#120d24",
          links: [
            { label: "Google Play Store", url: "https://play.google.com/store/apps/details?id=com.starz.android", type: "playstore" },
            { label: "CRM Portal", url: "https://crm.starz.vip", type: "live" }
          ]
        },
        {
          id: "starz-rank",
          beatIndex: "01.1",
          eyebrow: "01.1 / STARZ — LOCAL SEARCH AGENT",
          title: "AI Rank Optimization",
          subtitleItalic: "Algorithmic local search auditing and keyword intelligence.",
          narrative: "Audits Google Business Profile metrics, tracks local search visibility scores, and generates targeted location keyword optimizations.",
          contribution: [
            "Implemented DIBIL score radar calculation view",
            "Built geo-ranking keyword audit and competitor grid",
            "Integrated map and action telemetry metrics"
          ],
          interfaceCallout: "Interface shows DIBIL Score 64, 200 impressions, and map query distribution.",
          techStack: ["Next.js", "FastAPI", "Maps API"],
          asset: {
            src: "/assets/starz-ai-rank.png",
            alt: "STARZ AI Rank Dashboard",
            type: "image",
            aspectRatio: "1920/1363"
          },
          stageColor: "#150f28",
          links: [
            { label: "CRM Portal", url: "https://crm.starz.vip", type: "live" }
          ]
        },
        {
          id: "starz-post",
          beatIndex: "01.2",
          eyebrow: "01.2 / STARZ — CREATIVE AGENT",
          title: "AI Social Post Engine",
          subtitleItalic: "Multi-variant creative generation and scheduling.",
          narrative: "Generates synchronized multi-variant social creatives with custom captions and schedules publication across social channels.",
          contribution: [
            "Built 4-variant creative generation grid",
            "Integrated direct scheduling with Meta Graph APIs",
            "Constructed real-time post preview canvas"
          ],
          interfaceCallout: "Interface shows batch generation of 4 social post variants.",
          techStack: ["React", "FastAPI", "Meta APIs"],
          asset: {
            src: "/assets/starz-ai-post.png",
            alt: "STARZ AI Social Post Generator",
            type: "image",
            aspectRatio: "1920/1030"
          },
          stageColor: "#100d20",
          links: [
            { label: "CRM Portal", url: "https://crm.starz.vip", type: "live" }
          ]
        },
        {
          id: "starz-chats",
          beatIndex: "01.3",
          eyebrow: "01.3 / STARZ — CONVERSATIONAL AGENT",
          title: "AI Chat & Lead Scoring",
          subtitleItalic: "Automated dialogue and qualification scoring.",
          narrative: "Handles inbound customer conversations, extracts qualification criteria, and calculates a dynamic lead qualification index.",
          contribution: [
            "Engineered real-time chat interface with streaming responses",
            "Constructed dynamic lead qualification score gauge",
            "Built CRM synchronization pipeline"
          ],
          interfaceCallout: "Interface shows active customer thread and 85/100 lead score panel.",
          techStack: ["Next.js", "WebSockets", "FastAPI"],
          asset: {
            src: "/assets/starz-ai-chats.png",
            alt: "STARZ AI Chat and Lead Scoring Panel",
            type: "image",
            aspectRatio: "1672/941",
            redactionZones: [
              { top: "68%", left: "78%", width: "21%", height: "24%", label: "Redacted lead contact details" }
            ]
          },
          stageColor: "#0b0c16",
          links: [
            { label: "CRM Portal", url: "https://crm.starz.vip", type: "live" }
          ]
        },
        {
          id: "starz-pages",
          beatIndex: "01.4",
          eyebrow: "01.4 / STARZ — WEB AGENT",
          title: "AI Landing Page Builder",
          subtitleItalic: "Automated high-converting mobile web funnels.",
          narrative: "Dynamically compiles conversion-focused landing pages with integrated lead capture and mobile-first layouts.",
          contribution: [
            "Built landing page visual builder canvas",
            "Constructed integrated lead capture telemetry",
            "Engineered responsive preview container"
          ],
          interfaceCallout: "Interface shows generated landing page preview and leads sidebar.",
          techStack: ["Next.js", "Tailwind CSS", "FastAPI"],
          asset: {
            src: "/assets/starz-ai-pages.png",
            alt: "STARZ AI Pages Generator",
            type: "image",
            aspectRatio: "1920/1064"
          },
          stageColor: "#120e26",
          links: [
            { label: "CRM Portal", url: "https://crm.starz.vip", type: "live" }
          ]
        },
        {
          id: "starz-ads",
          beatIndex: "01.5",
          eyebrow: "01.5 / STARZ — PAID AD AGENT",
          title: "AI Ad Campaign Studio",
          subtitleItalic: "Four tailored variants created in a paused state for human review.",
          narrative: "Constructs tailored advertising copy and multi-variant creative assets. Creates the Meta Ads campaign in a paused state, keeping final activation and budget allocation under human control.",
          contribution: [
            "Built 4-variant ad campaign layout workspace",
            "Integrated Meta Marketing API campaign creation in paused state",
            "Constructed target audience and copy selector"
          ],
          interfaceCallout: "Interface shows 4 ad variants with campaign created in a paused state for human review.",
          techStack: ["Next.js", "FastAPI", "Meta Marketing API"],
          asset: {
            src: "/assets/starz-ai-ads.png",
            alt: "STARZ AI Ads 4-Variant Studio",
            type: "image",
            aspectRatio: "1920/1292"
          },
          stageColor: "#170f30",
          links: [
            { label: "CRM Portal", url: "https://crm.starz.vip", type: "live" }
          ]
        }
      ]
    },
    {
      id: "readora",
      projectNumber: "02 / 06",
      title: "Readora",
      subtitleItalic: "Distraction-free, offline-first mobile e-reader.",
      tagline: "A native offline e-reading application built for speed, clean typography, and local-only storage.",
      role: "Mobile Architect & Full-Stack Developer",
      techStack: ["React Native", "Expo", "TypeScript", "Zustand", "SQLite", "FastAPI", "Python", "MongoDB Atlas", "PyMuPDF"],
      beats: [
        {
          id: "readora-main",
          beatIndex: "02",
          eyebrow: "02 / 06 — MOBILE ARCHITECTURE",
          title: "Engineered For Pure Reading",
          subtitleItalic: "Offline-first local document parsing and custom e-ink styling.",
          narrative: "Built an offline-first mobile reading experience with SQLite local storage, fast EPUB/PDF document indexing with PyMuPDF, and seamless theme inversion.",
          contribution: [
            "Engineered offline document parsing pipeline with PyMuPDF & FastAPI",
            "Implemented local library state synchronization using Zustand & SQLite",
            "Built smooth gestural reading interface in React Native & Expo"
          ],
          interfaceCallout: "Video shows live book loading, gestural navigation, and reading modes.",
          techStack: ["React Native", "Expo", "TypeScript", "Zustand", "SQLite", "FastAPI", "Python", "PyMuPDF"],
          asset: {
            src: "/assets/readora-preview.mp4",
            alt: "Readora Mobile App Video Demonstration",
            type: "video",
            aspectRatio: "9/20"
          },
          stageColor: "#0f1013",
          links: [
            { label: "Source Repository", url: "https://github.com/devang-altf4/Readora", type: "github" }
          ]
        }
      ]
    },
    {
      id: "ai-calling",
      projectNumber: "03 / 06",
      title: "Outbound Calling Agent",
      subtitleItalic: "Full-duplex speech orchestration and conversational turn-taking.",
      tagline: "An automated voice agent workspace that ingests CSV lead lists, initiates telephony sessions, and conducts human-like conversations.",
      role: "Voice AI & Backend Architect",
      techStack: ["FastAPI", "Python", "Twilio", "Pipecat", "Gemini Live", "WebSockets"],
      beats: [
        {
          id: "calling-main",
          beatIndex: "03",
          eyebrow: "03 / 06 — REAL-TIME VOICE AI",
          title: "Real-time Telephony Pipeline",
          subtitleItalic: "Full-duplex speech orchestration and conversational turn-taking.",
          narrative: "Engineered an outbound calling platform integrating Pipecat and Gemini Live over Twilio telephony channels with automated call outcome extraction.",
          contribution: [
            "Constructed low-latency audio streaming pipeline over WebSockets",
            "Integrated Pipecat voice pipeline with Gemini Live",
            "Built outbound calling dashboard with CSV lead ingestion"
          ],
          interfaceCallout: "Interface shows outbound calling dashboard, batch CSV upload, and live lead status queue.",
          techStack: ["FastAPI", "Python", "Twilio", "Pipecat", "Gemini Live", "WebSockets"],
          asset: {
            src: "/assets/ai-calling-agent.png",
            alt: "Outbound Calling Agent Workspace",
            type: "image",
            aspectRatio: "1672/941",
            redactionZones: [
              { top: "66%", left: "6%", width: "21%", height: "28%", label: "Redacted lead names and phone numbers" }
            ]
          },
          stageColor: "#081220",
          links: [
            { label: "Source Repository", url: "https://github.com/devang-altf4/ai-calling-agent", type: "github" }
          ]
        }
      ]
    },
    {
      id: "estatex",
      projectNumber: "04 / 06",
      title: "EstateX",
      subtitleItalic: "High-density real estate platform & verified inventory.",
      tagline: "A comprehensive real estate marketplace featuring structured Rupee (₹) pricing tables, locality filtering, and high-volume property queries.",
      role: "Full-Stack Web Architect",
      techStack: ["Flutter", "Dart", "Firebase"],
      beats: [
        {
          id: "estatex-main",
          beatIndex: "04",
          eyebrow: "04 / 06 — PROPERTY PLATFORM",
          title: "Verified Real Estate Platform",
          subtitleItalic: "High-speed filtering across 860+ property listings.",
          narrative: "Architected a live commercial and residential property platform with structured Indian Rupee (₹) price formatting, locality indexation, and verified inquiry flows.",
          contribution: [
            "Built high-density property grid and search indexing",
            "Constructed localized currency formatters and data models",
            "Developed responsive web portal and mobile app architecture"
          ],
          interfaceCallout: "Interface shows property directory with 864 listings and verified price matrix.",
          techStack: ["Flutter", "Dart", "Firebase"],
          asset: {
            src: "/assets/estatex-dashboard.png",
            alt: "EstateX Property Marketplace Dashboard",
            type: "image",
            aspectRatio: "1920/1751",
            redactionZones: [
              { top: "0.5%", left: "84%", width: "15%", height: "4.5%", label: "Redacted account name and email" },
              { top: "74%", left: "75%", width: "17%", height: "8%", label: "Redacted contact phone and email" }
            ]
          },
          stageColor: "#0c121a",
          links: [
            { label: "Live Platform", url: "https://theestatex.com/", type: "live" }
          ]
        }
      ]
    },
    {
      id: "ai-reel",
      projectNumber: "05 / 06",
      title: "AI Reel Agent",
      subtitleItalic: "Autonomous short-form video transcription and captioning.",
      tagline: "Desktop video processing tool automating speech transcription, word-level animated caption burning, and 9:16 vertical video rendering.",
      role: "Systems & Video Pipeline Developer",
      techStack: ["Flutter", "FastAPI", "Python", "FFmpeg", "Whisper"],
      beats: [
        {
          id: "reel-main",
          beatIndex: "05",
          eyebrow: "05 / 06 — VIDEO PIPELINE",
          title: "Automated Short-Form Video Pipeline",
          subtitleItalic: "1 Upload → 2 Transcribe → 3 Captions → 4 Render.",
          narrative: "Created an automated short-form video generation tool that parses speech with Whisper, generates animated word-by-word subtitles, and renders 1080×1920 MP4 outputs via FFmpeg.",
          contribution: [
            "Built 4-stage sequential video rendering pipeline",
            "Integrated Whisper automated speech transcription",
            "Engineered FFmpeg caption burning and aspect ratio formatting"
          ],
          interfaceCallout: "Interface shows 4-step pipeline: Upload, Transcription, Captions, and 9:16 Render.",
          techStack: ["Flutter", "FastAPI", "Python", "FFmpeg", "Whisper"],
          asset: {
            src: "/assets/ai-reel-agent.png",
            alt: "AI Reel Agent Video Editing Software",
            type: "image",
            aspectRatio: "1672/941"
          },
          stageColor: "#140d08",
          links: []
        }
      ]
    },
    {
      id: "peerly",
      projectNumber: "06 / 06",
      title: "Peerly",
      subtitleItalic: "Full-stack talent marketplace with real-time negotiation and payments.",
      tagline: "A freelance marketplace connecting talent with clients, featuring real-time WebSocket chat and secure Razorpay payment integration.",
      role: "Full-Stack Developer",
      techStack: ["React", "Node.js", "Express", "MongoDB", "JWT", "WebSockets", "Razorpay"],
      beats: [
        {
          id: "peerly-main",
          beatIndex: "06",
          eyebrow: "06 / 06 — TALENT MARKETPLACE",
          title: "Marketplace, Chat & Payment Rails",
          subtitleItalic: "Complete transaction lifecycle from discovery to checkout.",
          narrative: "Built a full-stack freelance platform featuring category talent discovery, real-time WebSocket chat messaging, and native Razorpay checkout payment integration.",
          contribution: [
            "Engineered talent discovery catalog and service listing schemas",
            "Constructed real-time WebSocket chat messaging system",
            "Integrated Razorpay payment gateway and webhook verification"
          ],
          interfaceCallout: "Sequence displays live discovery portal, active chat conversation, and Razorpay payment modal.",
          techStack: ["React", "Node.js", "Express", "MongoDB", "WebSockets", "Razorpay"],
          asset: {
            src: "/assets/peerly-dashboard.jpg",
            alt: "Peerly Talent Discovery Dashboard",
            type: "image",
            aspectRatio: "1920/1003",
            additionalAssets: [
              { src: "/assets/peerly-chat.jpg", alt: "Peerly Real-time Chat Interface", aspectRatio: "1920/948" },
              { src: "/assets/peerly-payment.jpg", alt: "Peerly Razorpay Payment Modal", aspectRatio: "800/408", maxDisplayWidth: "720px" }
            ]
          },
          stageColor: "#061510",
          links: [
            { label: "Live Platform", url: "https://peerly.works", type: "live" }
          ]
        }
      ]
    }
  ],
  moreBuilds: {
    eyebrow: "MORE BUILDS",
    heading: "Experiments, prototypes and everything in between.",
    ctaLabel: "VIEW GITHUB",
    ctaUrl: "https://github.com/devang-altf4"
  }
};
