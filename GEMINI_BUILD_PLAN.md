# GEMINI BUILD PLAN: Cinematic Scrollytelling Portfolio for Devang Gupta

> **Target Executor**: Gemini 3.7 Flash (High) via Antigravity IDE  
> **Workspace**: `D:\coding\devang-portfolio`  
> **Canonical Domain**: `https://devangbuilds.me`  
> **Deliverable**: Full-stack Next.js Production Web Application (Self-contained, Prescriptive)  
> **Design Philosophy**: Pear-agency editorial interaction grammar (edge-to-edge ambient atmosphere, high-contrast serif headlines, minimal chrome) translated to dense developer UI/SaaS screenshots via smooth camera moves (pan/zoom), viewport-proportional floating screens, and continuous color-stage transitions.

---

## 1. Executive Mission & Non-Negotiable Rules

### 1.1 Executor Objective
You are tasked with building, testing, verifying, and polishing a world-class cinematic scrollytelling developer portfolio for Devang Gupta. You must execute this plan completely from start to finish within this workspace, run it locally, inspect it in a browser, eliminate visual and functional defects, and verify zero build/type/lint errors.

### 1.2 Non-Negotiable Rules & Guardrails
1. **Never touch or delete `assests/`**: The original assets folder is named `assests/`. Do NOT rename, move, or delete files inside `assests/`. Copy the files into `public/assets/` using the specified URL-safe kebab-case filenames.
2. **Never hardcode fake links, dummy URLs, or `#`**: All external links must point to the verified URLs defined in Section 4. If a project has no external link (e.g., AI Reel Agent), do not render a link or `#`.
3. **No Resume button**: No resume PDF exists. Do not render a Resume nav link, do not render a disabled button, and do not link to `#`.
4. **Mandatory Privacy Redactions**: 3 assets contain sensitive customer/user info (phone numbers, personal emails). You MUST render CSS blur overlays over these specific regions. Never edit Devang's raw source asset files.
5. **No Hallucinations or Fake Metrics**: Do not invent latency numbers, performance benchmarks, or client projects. Screenshot demo values (e.g., DIBIL 64, 85/100 lead score, 864 properties) are "what the interface shows", NOT Devang's personal metrics.
6. **Tailwind CSS v4 CSS-First**: Do NOT create `tailwind.config.js`. Use the `@theme` block inside `src/app/globals.css`.
7. **No Particles or Glassmorphism Grids**: Do not use particle canvas libraries, heavy blur cards, or fake macOS traffic-light title bars on screenshots. Keep the chrome ultra-minimal (Pear grammar).
8. **Legible Screenshots at Full Opacity**: Dashboard screenshots in Archetype A must render at full opacity (100%), never washed out with low opacity or heavy dark overlays. Use local directional scrims behind typography and position camera keyframes over natural empty space.

---

## 2. Verified Facts Sheet & Banned Strings

### 2.1 Identity & Socials
- **Full Name**: Devang Gupta
- **Role / Title**: Software Engineer
- **Thesis**: *"I build things that do things."*
- **Supporting Pillars**: *"Mobile. Systems. AI."*
- **Primary Email**: `maybedevang29@gmail.com`
- **LinkedIn**: `https://www.linkedin.com/in/devang-gupta-267475343/`
- **GitHub**: `https://github.com/devang-altf4`
- **Canonical URL**: `https://devangbuilds.me`

### 2.2 Ground-Truth Technology Stacks

| Project | Ground-Truth Technology Stack | Verified External Links |
| :--- | :--- | :--- |
| **01. STARZ Multi-Agent Suite** | Meta Graph APIs (Instagram/Facebook ad & post scheduling), Next.js, Python | Play Store: `https://play.google.com/store/apps/details?id=com.starz.android`<br>Web CRM: `https://crm.starz.vip`<br>*(Do NOT invent internal AI stacks)* |
| **02. Readora** | React Native, Expo, TypeScript, Zustand, SQLite, FastAPI, Python, MongoDB Atlas, PyMuPDF | GitHub Repo: `https://github.com/devang-altf4/Readora` |
| **03. AI Calling Agent** | FastAPI, Python, Twilio, Pipecat, Gemini Live, WebSockets | GitHub Repo: `https://github.com/devang-altf4/ai-calling-agent` |
| **04. EstateX** | Flutter, Dart, Firebase (mobile pre-release) + Live Web Marketplace | Web Platform: `https://theestatex.com/`<br>*(Do NOT link to Play Store)* |
| **05. AI Reel Agent** | Flutter, FastAPI, Python, FFmpeg, Whisper | *No external link (Local software showcase)* |
| **06. Peerly** | React, Node.js, Express, MongoDB (MERN), JWT, WebSockets, Razorpay | Live Platform: `https://peerly.works` |

### 2.3 Explicit Banned Strings Kill-List
The executor must search and ensure **zero instances** of the following fabricated phrases appear anywhere in the codebase:
- Latency claims: `<Nms`, `<Ns`, `<50ms`, `<800ms`, `Sub-50ms`, `Sub-second speech`, `sub-50ms`, `sub-second`, `zero-latency`
- Fabricated performance metrics: `100 Lighthouse`, `<15MB Binary`, `GPU Accelerated`, `Hardware Accel`, `zero-telemetry`
- Invented titles & claims: `Co-Founder`, `Lead Architect`, `Replaced traditional agency workflows`, `One-Click Instant Launch`, `direct network launch`, `immediate launch`, `escrow`
- Hallucinated project names: `deeptutorials.in`, `Deep Tutorials`, `DeepTutorialsOutroScene`
- Broken/Invented download paths: `releases/download/v1.0.0/readora.apk`
- Invented additional tech stacks: `Redis`, `Celery`, `ClickHouse`, `Go,`

> **Note on STARZ Client Names**: Any company or business name visible in STARZ screenshots (e.g., "Deep Tutorials") is a demo client account inside the CRM, **never** Devang's own project.

---

## 3. Asset Manifest & Privacy Redactions

### 3.1 Source to Public Asset Migration Table
Copy all 13 source assets from `assests/` to `public/assets/` using URL-safe kebab-case names:

| Source File in `assests/` | Public Destination in `public/assets/` | Dimensions | Display Type | Privacy Redaction Required |
| :--- | :--- | :--- | :--- | :--- |
| `STARZ general-app overview image.jpg` | `/assets/starz-app-overview.jpg` | 720×1600 | 9:20 Portrait (Phone) | None |
| `ai rank image.png` | `/assets/starz-ai-rank.png` | 1920×1363 | ~1.41:1 Landscape | None |
| `ai post image.png` | `/assets/starz-ai-post.png` | 1920×1030 | ~1.86:1 Landscape | None |
| `ai chats image referenced.png` | `/assets/starz-ai-chats.png` | 1672×941 | 16:9 Landscape | **Yes: Lead Info Rail** |
| `ai pages image.png` | `/assets/starz-ai-pages.png` | 1920×1064 | ~1.80:1 Landscape | None |
| `ai ads image.png` | `/assets/starz-ai-ads.png` | 1920×1292 | ~1.49:1 Landscape | None |
| `readora video.mp4` | `/assets/readora-preview.mp4` | 576×1280 | 9:20 Portrait Video (Phone) | None |
| `ai calling agent frontend image.png` | `/assets/ai-calling-agent.png` | 1672×941 | 16:9 Landscape | **Yes: Leads Phone Numbers** |
| `estateX dashboard image.png` | `/assets/estatex-dashboard.png` | 1920×1751 | ~1.10:1 Web Dashboard | **Yes: Account Header & Footer** |
| `ai reel agent( ai auto video edting software).png` | `/assets/ai-reel-agent.png` | 1672×941 | 16:9 Landscape | None |
| `Peerly dashboard.jpg` | `/assets/peerly-dashboard.jpg` | 1920×1003 | ~1.91:1 Web Dashboard | None |
| `peerly chat interface realrime websockets.jpg` | `/assets/peerly-chat.jpg` | 1920×948 | ~2.02:1 Landscape | None |
| `peerly payment interface razorpay.jpg` | `/assets/peerly-payment.jpg` | 800×408 | ~1.96:1 Modal (Max 720px) | None |

### 3.2 Mandatory Privacy Redaction Coordinates
Render CSS blur overlays (`backdrop-blur-md bg-neutral-900/60 border border-white/10 rounded pointer-events-none`) over these zones:
1. **`starz-ai-chats.png`**:
   - Right-side Lead Information Rail: `{ top: '14%', left: '71%', width: '27%', height: '52%' }`
2. **`ai-calling-agent.png`**:
   - Leads Table Phone Column: `{ top: '36%', left: '41%', width: '24%', height: '58%' }`
3. **`estatex-dashboard.png`**:
   - Header Account Email: `{ top: '0%', left: '68%', width: '32%', height: '8%' }`
   - Footer Contact Details: `{ top: '91%', left: '0%', width: '100%', height: '9%' }`

*(Note: Coordinates are baseline starting estimates; visually verify alignment during browser QA).*

---

## 4. Setup, Architecture & Design Tokens

### 4.1 Project Initialization & Dependencies
Execute the following commands in the workspace root:

```powershell
# 1. Initialize Next.js project
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack

# 2. Install animation and icon packages
npm install gsap @gsap/react lenis lucide-react

# 3. Create folder structure
mkdir -p public/assets
mkdir -p src/components/motion
mkdir -p src/components/ui
mkdir -p src/data
mkdir -p src/lib
mkdir -p src/sections

# 4. Copy assets from assests/ to public/assets/
Copy-Item "assests\STARZ general-app overview image.jpg" "public\assets\starz-app-overview.jpg"
Copy-Item "assests\ai rank image.png" "public\assets\starz-ai-rank.png"
Copy-Item "assests\ai post image.png" "public\assets\starz-ai-post.png"
Copy-Item "assests\ai chats image referenced.png" "public\assets\starz-ai-chats.png"
Copy-Item "assests\ai pages image.png" "public\assets\starz-ai-pages.png"
Copy-Item "assests\ai ads image.png" "public\assets\starz-ai-ads.png"
Copy-Item "assests\readora video.mp4" "public\assets\readora-preview.mp4"
Copy-Item "assests\ai calling agent frontend image.png" "public\assets\ai-calling-agent.png"
Copy-Item "assests\estateX dashboard image.png" "public\assets\estatex-dashboard.png"
Copy-Item "assests\ai reel agent( ai auto video edting software).png" "public\assets\ai-reel-agent.png"
Copy-Item "assests\Peerly dashboard.jpg" "public\assets\peerly-dashboard.jpg"
Copy-Item "assests\peerly chat interface realrime websockets.jpg" "public\assets\peerly-chat.jpg"
Copy-Item "assests\peerly payment interface razorpay.jpg" "public\assets\peerly-payment.jpg"
```

### 4.2 Tailwind CSS v4 Theme & Styles (`src/app/globals.css`)
```css
@import "tailwindcss";

@theme {
  --font-serif: var(--font-instrument-serif), Georgia, serif;
  --font-sans: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-geist-mono), monospace;

  --color-stage-hero: #09090b;
  --color-stage-starz-violet: #120d24;
  --color-stage-starz-dark: #0a0b12;
  --color-stage-readora-paper: #f4f0e6;
  --color-stage-readora-dark: #0f1013;
  --color-stage-calling-blue: #081220;
  --color-stage-estatex-graphite: #0c121a;
  --color-stage-reel-amber: #140d08;
  --color-stage-peerly-emerald: #061510;
  --color-stage-contact: #070709;
}

:root {
  color-scheme: dark;
  background-color: #09090b;
  color: #f4f4f5;
}

body {
  font-family: var(--font-sans);
  overflow-x: hidden;
  background-color: #09090b;
}

::selection {
  background-color: #8b5cf6;
  color: #ffffff;
}

/* Subtle Film Grain */
.film-grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

---

## 5. Centralized Data Contract (`src/data/portfolio.ts`)

Create `src/data/portfolio.ts` with clean, grounded contribution details:

```typescript
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

export interface BeatData {
  id: string;
  beatIndex: string; // e.g. "01.1"
  eyebrow: string;
  title: string;
  subtitleItalic?: string;
  narrative: string;
  contribution: string[];
  interfaceCallout: string;
  techStack: string[];
  asset: {
    src: string;
    alt: string;
    type: 'image' | 'video';
    aspectRatio: string;
    redactionZones?: RedactionZone[];
    additionalAssets?: SubAsset[];
  };
  stageColor: string;
  links: ProjectLink[];
}

export interface ProjectData {
  id: string;
  projectNumber: string; // e.g. "01 / 06"
  title: string;
  subtitleItalic: string;
  tagline: string;
  role: string;
  techStack: string[];
  disclaimer?: string;
  beats: BeatData[];
}

export const PORTFOLIO_DATA = {
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
              { top: "14%", left: "71%", width: "27%", height: "52%", label: "Redacted Customer Lead Data" }
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
              { top: "36%", left: "41%", width: "24%", height: "58%", label: "Redacted Live Phone Numbers" }
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
              { top: "0%", left: "68%", width: "32%", height: "8%", label: "Redacted Account Info" },
              { top: "91%", left: "0%", width: "100%", height: "9%", label: "Redacted Contact Numbers" }
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
```

---

## 6. Motion & Composition System (The 3 Archetypes)

To mirror the Pear agency reference and avoid repetitive two-column layouts, scenes rotate through **three distinct composition archetypes**:

```
+-----------------------------------------------------------------------------+
| ARCHETYPE A: FULL-BLEED CAMERA                                              |
| - Edge-to-edge zoomed screenshot in viewport background at FULL OPACITY (100%)|
| - Camera pans/zooms over real UI details during scroll                      |
| - Text sits inside a directional local scrim over natural UI negative space |
+-----------------------------------------------------------------------------+
| ARCHETYPE B: OFFSET OBJECT                                                  |
| - Portrait asset (STARZ app, Readora video) housed in custom PhoneFrame     |
| - Off-center placement with editorial typography balancing the opposite side |
+-----------------------------------------------------------------------------+
| ARCHETYPE C: MULTI-PLANE SEQUENCE                                           |
| - Multiple assets entering along a single pinned timeline                   |
| - Used for Peerly (Dashboard -> Chat -> Razorpay Modal) & AI Reel Pipeline  |
+-----------------------------------------------------------------------------+
```

### 6.1 Lenis ↔ ScrollTrigger ↔ GSAP Wiring (`src/components/motion/SmoothScroll.tsx`)
```tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Skip smooth scroll if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      autoRaf: false, // Driven strictly by gsap.ticker to avoid duplicate RAF loops
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
```

### 6.2 Scrubbed Ref-Driven Stage (`src/components/motion/Stage.tsx`)
Stage transitions are scrubbed smoothly and continuously by ScrollTrigger across the full scroll progression:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const colorSections = [
      { trigger: "#hero", color: "#09090b" },
      { trigger: "#starz-overview", color: "#120d24" },
      { trigger: "#starz-rank", color: "#150f28" },
      { trigger: "#starz-post", color: "#100d20" },
      { trigger: "#starz-chats", color: "#0b0c16" },
      { trigger: "#starz-pages", color: "#120e26" },
      { trigger: "#starz-ads", color: "#170f30" },
      { trigger: "#starz-summary", color: "#120d24" },
      { trigger: "#readora", color: "#0f1013" },
      { trigger: "#ai-calling", color: "#081220" },
      { trigger: "#estatex", color: "#0c121a" },
      { trigger: "#ai-reel", color: "#140d08" },
      { trigger: "#peerly", color: "#061510" },
      { trigger: "#more-builds", color: "#09090b" },
      { trigger: "#about", color: "#09090b" },
      { trigger: "#contact", color: "#070709" }
    ];

    // Continuous scrubbed color interpolation across sections
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    colorSections.forEach(({ color }, index) => {
      if (index === 0) return;
      tl.to(stageRef.current, {
        backgroundColor: color,
        ease: "none",
        duration: 1
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-[background-color]"
      style={{ backgroundColor: "#09090b" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
```

### 6.3 The CameraMove Primitive (`src/components/motion/CameraMove.tsx`)
```tsx
"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

export interface CameraMoveProps {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: string;
  children?: React.ReactNode;
}

export const CameraMove = forwardRef<
  HTMLDivElement,
  CameraMoveProps & React.HTMLAttributes<HTMLDivElement>
>(({ src, alt, priority = false, aspectRatio = "16/9", children, className = "", ...props }, ref) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ aspectRatio }}
      {...props}
    >
      <div
        ref={ref}
        className="relative w-full h-full will-change-transform transform-gpu origin-center"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 90vw"
          className="object-cover object-top select-none"
        />
        {children}
      </div>
    </div>
  );
});

CameraMove.displayName = "CameraMove";
```

### 6.4 The PhoneFrame Primitive (`src/components/motion/PhoneFrame.tsx`)
```tsx
"use client";

import React from "react";

export default function PhoneFrame({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-[290px] sm:w-[320px] md:w-[350px] aspect-[9/19.5] rounded-[48px] p-3 bg-neutral-900 border-[3px] border-white/20 shadow-2xl backdrop-blur-2xl ${className}`}>
      {/* Top Pill */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-end px-2">
        <div className="w-2 h-2 rounded-full bg-neutral-800" />
      </div>

      {/* Screen Viewport */}
      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex items-center justify-center">
        {children}
      </div>

      {/* Home Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30" />
    </div>
  );
}
```

---

## 7. Canonical Archetype A Scene Contract: `StarzRankScene.tsx`

Use `src/sections/StarzRankScene.tsx` as the template for all Archetype A (Full-Bleed Camera) scenes.

> **Legibility Contract**: The UI screenshot renders at **100% opacity**. Typography is contained in a local directional scrim and camera keyframes are positioned over natural negative/empty space of the screenshot.

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function StarzRankScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);

  const beat = PORTFOLIO_DATA.projects[0].beats[1]; // starz-rank

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      // Desktop: Full-bleed camera moves across real UI details
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Keyframe 1: Start slightly zoomed in, fade in editorial copy
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 }
        )
          // Keyframe 2: Pan and zoom into DIBIL Score 64 gauge
          .to(cameraRef.current, {
            scale: 1.45,
            xPercent: 12,
            yPercent: -15,
            duration: 2,
            ease: "power2.inOut"
          }, "gauge-focus")
          .fromTo(
            calloutRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1 },
            "gauge-focus+=0.5"
          )
          // Keyframe 3: Pan to Keyword / Map intelligence area
          .to(cameraRef.current, {
            scale: 1.5,
            xPercent: -15,
            yPercent: 10,
            duration: 2,
            ease: "power2.inOut"
          }, "keyword-pan")
          // Keyframe 4: Return to full overview before exit
          .to(cameraRef.current, {
            scale: 1.05,
            xPercent: 0,
            yPercent: 0,
            duration: 1.5,
            ease: "power2.out"
          }, "exit");
      });

      // Mobile: Responsive scrub with gentle translation
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1
          }
        });

        tl.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
          .to(cameraRef.current, { scale: 1.15, yPercent: -5 });
      });

      // Reduced motion: static layout with gentle opacity fade
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cameraRef.current, { scale: 1, xPercent: 0, yPercent: 0 });
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={beat.id}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-start py-20 px-6 sm:px-12 lg:px-24 z-10"
    >
      {/* Background Full-Bleed Camera Canvas (100% Opacity - Real UI is crisp) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={cameraRef}
          className="relative w-full h-full will-change-transform transform-gpu origin-center"
        >
          <Image
            src={beat.asset.src}
            alt={beat.asset.alt}
            fill
            sizes="100vw"
            className="object-cover object-top select-none"
          />
        </div>
      </div>

      {/* Floating Foreground Content with Local Directional Scrim */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-2xl space-y-6 pointer-events-auto bg-gradient-to-r from-black/90 via-black/75 to-transparent p-6 sm:p-10 rounded-2xl backdrop-blur-xs border border-white/10"
      >
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-violet-400 tracking-wider">
            {beat.beatIndex}
          </span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            {beat.eyebrow}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
          {beat.title}{" "}
          {beat.subtitleItalic && (
            <span className="italic font-light text-violet-300 block text-2xl sm:text-4xl lg:text-5xl mt-2">
              {beat.subtitleItalic}
            </span>
          )}
        </h2>

        <p className="font-sans text-sm sm:text-base text-neutral-200 leading-relaxed">
          {beat.narrative}
        </p>

        {/* Contribution Breakdown (Hairline rules) */}
        <div className="pt-3 border-t border-white/15">
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
            Key Contributions
          </div>
          <ul className="space-y-1.5">
            {beat.contribution.map((item, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-300">
                <span className="font-mono text-violet-400 text-xs mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interface Callout */}
        <div ref={calloutRef} className="pt-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-black/80 border border-white/10 text-xs font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span>{beat.interfaceCallout}</span>
          </div>
        </div>

        {/* Action Links */}
        {beat.links.length > 0 && (
          <div className="pt-2 flex items-center space-x-4">
            {beat.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-medium uppercase tracking-wider hover:bg-violet-200 transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

---

## 8. Storyboard & Scene Implementation Matrix

| Section # | Component Name | Archetype | Visual Asset | Camera & Narrative Action | Stage Color | Primary Link |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **00** | `HeroScene.tsx` | Editorial | Type + Ambient Glow | Monologue: *"I build things that do things. Mobile. Systems. AI."* | `#09090b` | Scroll Prompt |
| **01.0** | `StarzOverviewScene.tsx` | Archetype B | `starz-app-overview.jpg` | Phone Frame floating in violet aura. Explains multi-agent architecture. | `#120d24` | Play Store & Web CRM |
| **01.1** | `StarzRankScene.tsx` | Archetype A | `starz-ai-rank.png` | Camera zooms into DIBIL 64 gauge → Pans over keyword chips & competitor radar. | `#150f28` | Web CRM |
| **01.2** | `StarzPostScene.tsx` | Archetype A | `starz-ai-post.png` | Camera sweeps across 4-column batch social creative generation grid. | `#100d20` | Web CRM |
| **01.3** | `StarzChatsScene.tsx` | Archetype A | `starz-ai-chats.png` | Dark tonal rest. Focus on Lead Score 85/100 gauge (Redacted lead data rail). | `#0b0c16` | Web CRM |
| **01.4** | `StarzPagesScene.tsx` | Archetype A | `starz-ai-pages.png` | Focus on mobile landing page builder preview & dynamic lead capture. | `#120e26` | Web CRM |
| **01.5** | `StarzAdsScene.tsx` | Archetype A | `starz-ai-ads.png` | Pan across 4 ad variants to paused campaign review action bar (Meta Ads campaign created in paused state for human review). | `#170f30` | Web CRM |
| **01.6** | `StarzSummaryScene.tsx` | Editorial | Ambient Gradient | *"FIVE AI SYSTEMS. ONE PRODUCT ECOSYSTEM."* + Starz Ventures disclaimer. | `#120d24` | Web CRM |
| **02** | `ReadoraScene.tsx` | Archetype B | `readora-preview.mp4` | Single set-piece: PhoneFrame playing video; offline architecture breakdown. | `#0f1013` | GitHub Repo |
| **03** | `CallingAgentScene.tsx` | Archetype A | `ai-calling-agent.png` | Zoom into CSV upload & live telephony queue (Redacted phone numbers). | `#081220` | GitHub Repo |
| **04** | `EstateXScene.tsx` | Archetype A | `estatex-dashboard.png` | Showcase live web platform: ₹ price matrix & 864 results (Redacted header/footer). | `#0c121a` | theestatex.com |
| **05** | `ReelAgentScene.tsx` | Archetype C | `ai-reel-agent.png` | 4-step pipeline: 1 Upload → 2 Transcribe → 3 Captions → 4 Render (9:16 export). | `#140d08` | *None (Local SW)* |
| **06** | `PeerlyScene.tsx` | Archetype C | `peerly-dashboard.jpg` + `peerly-chat.jpg` + `peerly-payment.jpg` | Sequential plane entry: Gig search → Chat list → Razorpay checkout modal (max 720px). | `#061510` | peerly.works |
| **07** | `MoreBuildsScene.tsx` | Editorial | Minimal Card | *"Experiments, prototypes and everything in between."* Minimal CTA: `VIEW GITHUB ↗`. | `#09090b` | GitHub Profile |
| **08** | `AboutScene.tsx` | Editorial | Clean Serif Type | Engineering philosophy, background, and autonomous systems mindset. | `#09090b` | LinkedIn |
| **09** | `ContactScene.tsx` | Editorial | Monospace & Action | *"HAVE SOMETHING WORTH BUILDING? LET'S TALK."* + Email, LinkedIn, GitHub. | `#070709` | Mailto & LinkedIn |

---

## 9. Minimalist Floating Navigation (`src/components/ui/Navigation.tsx`)

Pear-agency style floating pill header with live project counter and scroll-to-top handler:

```tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [projectCounter, setProjectCounter] = useState("01 / 06");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-none">
      {/* Brand Name (Click scrolls to top, no href="#") */}
      <button
        onClick={scrollToTop}
        className="pointer-events-auto font-serif italic text-2xl text-white tracking-tight hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0"
      >
        Devang Gupta
      </button>

      {/* Floating Pill Action */}
      <div
        className={`pointer-events-auto flex items-center space-x-4 px-4 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-black/70 border-white/20 backdrop-blur-xl shadow-lg"
            : "bg-white/5 border-white/10 backdrop-blur-sm"
        }`}
      >
        <span className="font-mono text-xs text-neutral-400 hidden sm:inline-block">
          {projectCounter}
        </span>
        <span className="w-1 h-1 rounded-full bg-neutral-600 hidden sm:inline-block" />
        <a
          href="https://github.com/devang-altf4"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-neutral-300 hover:text-white transition-colors"
        >
          GitHub
        </a>
        <span className="w-1 h-1 rounded-full bg-neutral-600" />
        <a
          href="https://www.linkedin.com/in/devang-gupta-267475343/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-neutral-300 hover:text-white transition-colors"
        >
          LinkedIn
        </a>
        <span className="w-1 h-1 rounded-full bg-neutral-600" />
        <a
          href="mailto:maybedevang29@gmail.com"
          className="inline-flex items-center space-x-1 font-sans text-xs uppercase tracking-wider text-white font-medium bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full transition-all"
        >
          <span>Get in Touch</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </header>
  );
}
```

---

## 10. Complete Page Assembly (`src/app/page.tsx` & `src/app/layout.tsx`)

### 10.1 `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Navigation from "@/components/ui/Navigation";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devangbuilds.me"),
  title: "Devang Gupta — Software Engineer",
  description:
    "Portfolio of Devang Gupta. I build things that do things. Mobile. Systems. AI.",
  openGraph: {
    title: "Devang Gupta — Software Engineer",
    description: "I build things that do things. Mobile. Systems. AI.",
    url: "https://devangbuilds.me",
    siteName: "Devang Gupta Portfolio",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://devangbuilds.me",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#09090b] text-neutral-100 antialiased selection:bg-violet-500 selection:text-white">
        <div className="film-grain" />
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### 10.2 `src/app/page.tsx`
```tsx
import Stage from "@/components/motion/Stage";
import HeroScene from "@/sections/HeroScene";
import StarzOverviewScene from "@/sections/StarzOverviewScene";
import StarzRankScene from "@/sections/StarzRankScene";
import StarzPostScene from "@/sections/StarzPostScene";
import StarzChatsScene from "@/sections/StarzChatsScene";
import StarzPagesScene from "@/sections/StarzPagesScene";
import StarzAdsScene from "@/sections/StarzAdsScene";
import StarzSummaryScene from "@/sections/StarzSummaryScene";
import ReadoraScene from "@/sections/ReadoraScene";
import CallingAgentScene from "@/sections/CallingAgentScene";
import EstateXScene from "@/sections/EstateXScene";
import ReelAgentScene from "@/sections/ReelAgentScene";
import PeerlyScene from "@/sections/PeerlyScene";
import MoreBuildsScene from "@/sections/MoreBuildsScene";
import AboutScene from "@/sections/AboutScene";
import ContactScene from "@/sections/ContactScene";

export default function PortfolioPage() {
  return (
    <main className="relative w-full">
      <Stage />
      <HeroScene />
      <StarzOverviewScene />
      <StarzRankScene />
      <StarzPostScene />
      <StarzChatsScene />
      <StarzPagesScene />
      <StarzAdsScene />
      <StarzSummaryScene />
      <ReadoraScene />
      <CallingAgentScene />
      <EstateXScene />
      <ReelAgentScene />
      <PeerlyScene />
      <MoreBuildsScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
```

---

## 11. Testing, Browser QA Loop & Verification Pass

### 11.1 Build & Lint Verification
Run the following commands in the workspace root:

```powershell
# 1. Run ESLint
npm run lint

# 2. Run TypeScript strict type check
npx tsc --noEmit

# 3. Test production build compilation
npm run build
```

### 11.2 Multi-Viewport Browser Inspection
Launch the local dev server (`npm run dev`) and inspect the running app across:
1. **Desktop Standard**: `1440 × 900`
2. **Desktop High-Res**: `1920 × 1080`
3. **Mobile Viewport**: `390 × 844`

### 11.3 Reverse-Scroll QA Pass
Scroll down to the Contact scene, then scroll in reverse up to the Hero scene:
- Verify that pinned timelines release cleanly without blank gaps or layout shifting.
- Verify that background Stage colors transition smoothly in both directions.
- Confirm that CSS blur redaction overlays remain locked to their exact coordinates during all zoom transforms.

---

## 12. Strict DO NOT Checklist

- [ ] **DO NOT** delete, move, or modify files in `assests/`.
- [ ] **DO NOT** use `deeptutorials.in`, `Deep Tutorials`, or treat customer names in screenshots as Devang's projects.
- [ ] **DO NOT** invent latency numbers, fake benchmarks, or unverified claims.
- [ ] **DO NOT** skip grepping the codebase and data files for kill-list terms (`<Nms`, `<Ns`, `Sub-50ms`, `sub-second`, `zero-latency`, `zero-telemetry`, `100 Lighthouse`, `Co-Founder`, `Lead Architect`, `escrow`, `Redis`, `Celery`, `ClickHouse`, `Go,`, etc.) before and after building.
- [ ] **DO NOT** link EstateX to the Google Play Store (link ONLY to `https://theestatex.com/`).
- [ ] **DO NOT** render a Resume link or `#` in navigation.
- [ ] **DO NOT** create `tailwind.config.js` (use Tailwind v4 `@theme` in `globals.css`).
- [ ] **DO NOT** leave customer phone numbers in AI Calling Agent unblurred.
- [ ] **DO NOT** render screenshots at low opacity (30%/40%) in Archetype A; render them at 100% opacity with local directional scrims behind typography.
- [ ] **DO NOT** orphan `peerly-payment.jpg` or `peerly-chat.jpg` (render them in the Peerly multi-plane sequence capped at 720px).
