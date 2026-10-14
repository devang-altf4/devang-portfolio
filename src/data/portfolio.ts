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
  /** One screenshot per scroll step. When present, the screen swaps as the steps advance. */
  frames?: string[];
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
  location: string;
  /** Shown in the nav, hero, contact section and link preview. Edit it in one place. */
  availability: string;
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
    canonical: "https://devangbuilds.me",
    location: "Mumbai, India",
    availability: "Available now"
  },
  projects: [
    {
      id: "starz",
      projectNumber: "01 / 04",
      title: "STARZ AI Engine",
      subtitleItalic: "Multi-agent autonomous growth platform.",
      tagline: "Three coordinated AI agents automating Google Business Profile ranking, landing page generation, and customer conversation.",
      role: "Full-Stack & Systems Engineer",
      techStack: ["Next.js", "Python", "FastAPI", "Meta Graph API", "Tailwind CSS"],
      disclaimer: "Built as part of Starz Ventures. All rights reserved by the company.",
      beats: [
        {
          id: "starz-overview",
          beatIndex: "01.0",
          eyebrow: "01 / 04 — FLAGSHIP SUITE",
          title: "The Agent Architecture",
          subtitleItalic: "Three autonomous systems in one product suite.",
          narrative: "Engineered a synchronized ecosystem of AI agents that independently manage local search ranking, web presence, and customer conversation from a single unified interface.",
          contribution: [
            "Architected multi-agent orchestration layer",
            "Built the mobile client and shipped it to Google Play",
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
          subtitleItalic: "Google Business Profile SEO and local ranking intelligence.",
          narrative: "Audits Google Business Profile health, tracks local search visibility, and generates the keyword and content changes that move a listing up the local pack.",
          contribution: [
            "Implemented DIBIL profile health score and audit view",
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
          id: "starz-pages",
          beatIndex: "01.2",
          eyebrow: "01.2 / STARZ — WEB AGENT",
          title: "AI Landing Page Generator",
          subtitleItalic: "Conversion-focused pages, generated from a business profile.",
          narrative: "Generates complete conversion-focused landing pages from a business profile, with integrated lead capture and mobile-first layouts, ready to publish.",
          contribution: [
            "Built landing page generation and visual builder canvas",
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
          id: "starz-chats",
          beatIndex: "01.3",
          eyebrow: "01.3 / STARZ — CONVERSATIONAL AGENT",
          title: "WhatsApp & Review Automation",
          subtitleItalic: "Automated WhatsApp replies and Google Business Profile responses.",
          narrative: "Answers inbound WhatsApp conversations automatically and posts replies to Google Business Profile reviews and comments, keeping every thread handled and scored without a human in the loop.",
          contribution: [
            "Built WhatsApp automation with streaming generated replies",
            "Automated Google Business Profile review and comment responses",
            "Constructed lead qualification scoring across both channels"
          ],
          interfaceCallout: "Interface shows active customer thread and 85/100 lead score panel.",
          techStack: ["Next.js", "WhatsApp API", "WebSockets", "FastAPI"],
          asset: {
            src: "/assets/starz-ai-chats.png",
            alt: "STARZ WhatsApp and Review Automation Panel",
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
        }
      ]
    },
    {
      id: "ai-calling",
      projectNumber: "02 / 04",
      title: "AI Calling Agent",
      subtitleItalic: "A voice agent that qualifies leads and books meetings.",
      tagline: "Calls leads, learns their business and main need, and books a strategy call when they're interested. You can talk to it live from a browser.",
      role: "Voice AI & Backend Engineer",
      techStack: ["FastAPI", "Python", "Twilio", "Pipecat", "Gemini Live", "WebSockets"],
      beats: [
        {
          id: "calling-main",
          beatIndex: "02",
          eyebrow: "02 / 04 — REAL-TIME VOICE AI",
          title: "A Voice Agent That Books Meetings",
          subtitleItalic: "Speech-to-speech conversations in natural Hinglish, over the phone or in the browser.",
          narrative: "An outbound voice agent that calls leads, finds out what their business needs, and books a 20-minute strategy call through Calendly when they're interested. It runs live, so anyone can talk to it.",
          contribution: [
            "Streamed full-duplex audio between Twilio, the browser and Gemini Live over WebSockets",
            "Built CSV lead ingestion that turns a list into an outbound call queue",
            "Wrote each call's business, need, interest and booking back into the pipeline"
          ],
          interfaceCallout: "Interface shows the live voice demo, CSV lead upload, and the lead pipeline table.",
          techStack: ["FastAPI", "Python", "Twilio", "Pipecat", "Gemini Live", "WebSockets"],
          asset: {
            src: "/assets/ai-calling-agent-live.webp",
            alt: "AI Calling Agent workspace with live voice demo, campaign lead upload and lead pipeline",
            type: "image",
            aspectRatio: "1860/1125"
          },
          stageColor: "#081220",
          links: [
            { label: "Talk to it live", url: "https://callingagent-czbzdkg7eccub6d9.centralindia-01.azurewebsites.net/", type: "live" },
            { label: "Source Repository", url: "https://github.com/devang-altf4/ai-calling-agent", type: "github" }
          ]
        }
      ]
    },
    {
      id: "readora",
      projectNumber: "03 / 04",
      title: "Readora",
      subtitleItalic: "Distraction-free, offline-first mobile e-reader.",
      tagline: "A native offline e-reading app built for speed, clean typography, and local-only storage.",
      role: "Mobile & Full-Stack Developer",
      techStack: ["React Native", "Expo", "TypeScript", "Zustand", "SQLite", "FastAPI", "Python", "MongoDB Atlas", "PyMuPDF"],
      beats: [
        {
          id: "readora-main",
          beatIndex: "03",
          eyebrow: "03 / 04 — MOBILE ARCHITECTURE",
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
      id: "truesample",
      projectNumber: "04 / 04",
      title: "TrueSample Player",
      subtitleItalic: "Bit-perfect USB DAC playback on Android, without root.",
      tagline: "An open-source Android music player with its own USB audio driver, so the samples in a file reach the DAC unchanged.",
      role: "Android & Native Audio Engineer",
      techStack: ["Kotlin", "Jetpack Compose", "C++", "JNI", "libusb", "FFmpeg", "USB Audio Class"],
      beats: [
        {
          id: "truesample-main",
          beatIndex: "04",
          eyebrow: "04 / 04 — NATIVE AUDIO",
          title: "Bit-Perfect Audio, No Root",
          subtitleItalic: "Its own USB audio driver, skipping Android's mixer entirely.",
          narrative: "Android resamples every app's audio to one fixed rate before a USB DAC ever sees it. TrueSample Player takes the DAC over USB itself and streams each file at its real sample rate and bit depth.",
          contribution: [
            "Wrote a USB audio driver in C++ on libusb that claims the DAC without root",
            "Parsed UAC1 and UAC2 descriptors to pick the DAC's best mode for every song",
            "Built the signal path view, hardware volume and graphic and parametric EQ in Jetpack Compose"
          ],
          interfaceCallout: "Interface shows the now-playing screen, output mode picker, and signal path.",
          techStack: ["Kotlin", "Jetpack Compose", "C++", "JNI", "libusb", "FFmpeg"],
          asset: {
            src: "/assets/truesample-now-playing.png",
            alt: "TrueSample Player now-playing screen with the source, rate, DSP and DAC signal path",
            type: "image",
            aspectRatio: "9/20",
            // One per scroll step: the player carries the first three, the EQ the last.
            frames: [
              "/assets/truesample-now-playing.png",
              "/assets/truesample-now-playing.png",
              "/assets/truesample-now-playing.png",
              "/assets/truesample-equalizer.png"
            ]
          },
          stageColor: "#0f0e14",
          links: [
            { label: "Source Repository", url: "https://github.com/devang-altf4/truesample-player", type: "github" },
            { label: "Download APK", url: "https://github.com/devang-altf4/truesample-player/releases/latest", type: "live" }
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

/**
 * Every "email me" link on the page. The subject is pre-filled so a first
 * message takes one click, and kept neutral — it says where they came from,
 * not what they want.
 */
export const EMAIL_HREF = `mailto:${PORTFOLIO_DATA.creator.email}?subject=${encodeURIComponent(
  "Hello from devangbuilds.me"
)}`;

/**
 * Scenes look their project up by id, never by position — the project list is
 * reordered and trimmed often, and an index silently points at the wrong one.
 */
export function projectById(id: string): ProjectData {
  const project = PORTFOLIO_DATA.projects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}
