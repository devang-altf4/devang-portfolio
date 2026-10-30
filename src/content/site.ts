/**
 * Every word and link on the site lives here, in the order the page shows it.
 * Order is Devang's call: STARZ, the calling agent, the frontend work, Readora.
 * No invented metrics — interface numbers in screenshots are what the product
 * shows, never claims about Devang.
 */

export const profile = {
  name: "Devang Gupta",
  role: "Software Engineer",
  thesis: "I build things that do things.",
  location: "Mumbai, India",
  availability: "Available now",
  workMode: "open to remote or on-site",
  email: "maybedevang29@gmail.com",
  emailHref: `mailto:maybedevang29@gmail.com?subject=${encodeURIComponent("Hello from devangbuilds.me")}`,
  linkedin: "https://www.linkedin.com/in/devang-gupta-267475343/",
  github: "https://github.com/devang-altf4",
  whatsapp: `https://wa.me/918369743238?text=${encodeURIComponent("Hi Devang, I came across your portfolio.")}`,
  resume: "https://drive.google.com/file/d/1saDTBGs6mRUS7_QibwdvYu_IF5Lq-REe/view?usp=sharing",
  site: "https://devangbuilds.me",
} as const;

export interface Redaction {
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface CaseStep {
  title: string;
  body: string;
  image: string;
  alt: string;
  /** "w/h", used to size the frame without cropping the screenshot. */
  aspect: string;
  /** Solid panels over customer data in the screenshot. */
  redactions?: Redaction[];
}

export interface CaseStudy {
  id: "starz" | "calling";
  index: string;
  name: string;
  kicker: string;
  summary: string;
  /** One extra line under the summary (STARZ names its three agents). */
  extra?: string;
  stack: string[];
  links: { label: string; href: string }[];
  /** The deck shows at most two of these: the first is the hero shot. */
  steps: CaseStep[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "starz",
    index: "01",
    name: "STARZ AI Engine",
    kicker: "Flagship · multi-agent growth platform",
    summary:
      "Three coordinated AI agents that rank a business on Google, build its landing pages and answer its customers — from one app.",
    extra: "AI Rank, AI Pages and AI Chats. I built the mobile client and shipped it to Google Play.",
    stack: ["Next.js", "Python", "FastAPI", "Meta Graph API", "Tailwind CSS"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.starz.android" },
      { label: "CRM portal", href: "https://crm.starz.vip" },
    ],
    steps: [
      {
        title: "Three agents, one app",
        body: "Built the mobile client and shipped it to Google Play, with every agent reporting into one shared workspace.",
        image: "/assets/starz-app-overview.jpg",
        alt: "STARZ mobile app showing its AI agents",
        aspect: "9/20",
      },
      {
        title: "Local search, audited",
        body: "Scores Google Business Profile health, tracks local visibility and generates the keyword changes that move a listing up the map pack.",
        image: "/assets/starz-ai-rank.png",
        alt: "STARZ AI Rank dashboard with profile score and keyword audit",
        aspect: "1920/1363",
      },
      {
        title: "Landing pages, generated",
        body: "Turns a business profile into a conversion-focused landing page with lead capture, previewed live before it publishes.",
        image: "/assets/starz-ai-pages.png",
        alt: "STARZ AI Pages generator with a landing page preview",
        aspect: "1920/1064",
      },
      {
        title: "Every conversation answered",
        body: "Replies to WhatsApp messages and Google reviews automatically, and scores each lead across both channels.",
        image: "/assets/starz-ai-chats.png",
        alt: "STARZ conversation console with a WhatsApp thread and lead score",
        aspect: "1672/941",
        redactions: [{ top: "68%", left: "78%", width: "21%", height: "24%" }],
      },
    ],
  },
  {
    id: "calling",
    index: "02",
    name: "AI Calling Agent",
    kicker: "Real-time voice AI",
    summary:
      "An outbound voice agent that calls leads, learns what their business needs and books a strategy call — and you can talk to it live.",
    stack: ["FastAPI", "Python", "Twilio", "Pipecat", "Gemini Live", "WebSockets"],
    links: [
      { label: "Talk to it live", href: "https://callingagent-czbzdkg7eccub6d9.centralindia-01.azurewebsites.net/" },
    ],
    steps: [
      {
        title: "A live call, from the browser",
        body: "Speech-to-speech conversation in natural Hinglish, streamed full-duplex between the browser, Twilio and Gemini Live over WebSockets.",
        image: "/assets/ai-calling-agent-live.webp",
        alt: "AI Calling Agent workspace with the live voice demo",
        aspect: "1860/1125",
      },
      {
        title: "A list becomes a call queue",
        body: "Upload a CSV of leads and the agent works through them, one outbound call at a time.",
        image: "/assets/ai-calling-agent-live.webp",
        alt: "Campaign lead upload in the AI Calling Agent",
        aspect: "1860/1125",
      },
      {
        title: "Every call, written back",
        body: "Each call's business, need, interest and meeting booking lands in the pipeline automatically.",
        image: "/assets/ai-calling-agent-live.webp",
        alt: "Lead pipeline table in the AI Calling Agent",
        aspect: "1860/1125",
      },
    ],
  },
];

export interface FrontendWork {
  id: string;
  index: string;
  name: string;
  line: string;
  url: string;
  preview: string;
  poster: string;
  /** Works that answer the same brief; shown with a shared note. */
  pair?: "vvgp";
}

/** Devang's order: 1, 2, 5, 6, 3, 4 of the list he gave. */
export const frontendWork: FrontendWork[] = [
  {
    id: "vvgp-scroll",
    index: "01",
    name: "VVGP — scroll concept",
    line: "A Miami brand advisory studio. Concept one: the story plays out as you scroll.",
    url: "https://scrolly-alpha.vercel.app/",
    preview: "/media/work/vvgp-scroll.mp4",
    poster: "/media/work/vvgp-scroll.jpg",
    pair: "vvgp",
  },
  {
    id: "vvgp-loop",
    index: "02",
    name: "VVGP — loop concept",
    line: "The same brief, answered differently: a looping film behind an editorial layout.",
    url: "https://sample2-ruddy.vercel.app/",
    preview: "/media/work/vvgp-loop.mp4",
    poster: "/media/work/vvgp-loop.jpg",
    pair: "vvgp",
  },
  {
    id: "bellavierre",
    index: "03",
    name: "Bellavierre",
    line: "A Dubai property team for overseas investors, sold on the view.",
    url: "https://bellavierre-demo.vercel.app/",
    preview: "/media/work/bellavierre.mp4",
    poster: "/media/work/bellavierre.jpg",
  },
  {
    id: "altimate",
    index: "04",
    name: "Altimate",
    line: "Luxury interior design and fit-out for villas across Dubai.",
    url: "https://altimate-demo.vercel.app/",
    preview: "/media/work/altimate.mp4",
    poster: "/media/work/altimate.jpg",
  },
  {
    id: "moki",
    index: "05",
    name: "Moki Systems",
    line: "An AI automation studio, with scroll-driven visuals and a built-in Gemini assistant.",
    url: "https://www.mokisystems.us/",
    preview: "/media/work/moki.mp4",
    poster: "/media/work/moki.jpg",
  },
  {
    id: "dayaar",
    index: "06",
    name: "Dayaar Real Estate",
    line: "A Mumbai property consultancy with interactive market data across six zones.",
    url: "https://dayaarrealestate.com/",
    preview: "/media/work/dayaar.mp4",
    poster: "/media/work/dayaar.jpg",
  },
];

export const readora = {
  name: "Readora",
  summary:
    "An offline-first mobile e-reader: local document parsing, SQLite storage and gestural reading, with no network in the loop.",
  stack: ["React Native", "Expo", "TypeScript", "Zustand", "SQLite", "FastAPI", "PyMuPDF"],
  video: "/assets/readora-preview.mp4",
  repo: "https://github.com/devang-altf4/Readora",
} as const;

/** The four things Devang builds, each with its Flow loop (`/media/flow/<video>`). */
export interface Capability {
  word: string;
  title: string;
  body: string;
  tools: string[];
  video: "orbit" | "ai-core" | "waveform" | "windows";
}

export const capabilities: Capability[] = [
  {
    word: "Mobile",
    title: "Apps that ship to real phones.",
    body: "Built the STARZ mobile client and shipped it to Google Play. Built Readora, an offline-first reader, in React Native.",
    tools: ["React Native", "Expo", "TypeScript", "SQLite"],
    video: "orbit",
  },
  {
    word: "Agents",
    title: "AI that does the work.",
    body: "STARZ runs three coordinated agents that rank a business on Google, build its landing pages and answer its customers.",
    tools: ["Python", "FastAPI", "LLMs", "Meta Graph API"],
    video: "ai-core",
  },
  {
    word: "Voice",
    title: "AI that picks up the phone.",
    body: "A real-time calling agent that talks to leads in natural Hinglish and books the meeting, streamed full-duplex end to end.",
    tools: ["Twilio", "Pipecat", "Gemini Live", "WebSockets"],
    video: "waveform",
  },
  {
    word: "Frontend",
    title: "Websites people remember.",
    body: "Cinematic, scroll-driven sites for real brands: motion, 3D and video, tuned to stay smooth on a phone.",
    tools: ["Next.js", "React", "GSAP", "Tailwind CSS"],
    video: "windows",
  },
];

/** Lines for the kinetic type bands. */
export const marquee = {
  craft: ["Cinematic frontends", "Voice AI", "Multi-agent systems", "Mobile apps"],
  self: ["Devang Gupta", "Software Engineer", "Mumbai", "Available now"],
  close: ["Open to work", "Remote or on-site", "Let's talk"],
} as const;
