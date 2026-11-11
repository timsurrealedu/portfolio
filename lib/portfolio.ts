export type SectionId = "home" | "projects" | "experience" | "about" | "contact";
type MediaAsset = { src: string; alt: string; caption: string };
type Project = { slug: string; index: string; name: string; type: string; status: string; summary: string; detail: string; stack: readonly string[]; href?: string; websiteLinks?: readonly { label: string; href: string }[]; media?: MediaAsset | readonly MediaAsset[] };
type Credential = { title: string; issuer: string; kind: string; year: string; media?: MediaAsset };
type Experience = { year: string; role: string; org: string; note: string; image?: string; alt?: string };

export const sections: { id: SectionId; label: string; command: string; key: string }[] = [
  { id: "home", label: "overview", command: "whoami", key: "H" },
  { id: "projects", label: "projects", command: "ls ./projects", key: "P" },
  { id: "experience", label: "experience", command: "cat experience.log", key: "E" },
  { id: "about", label: "about", command: "cat about.md", key: "A" },
  { id: "contact", label: "contact", command: "open contact", key: "C" },
];

export const projects: readonly Project[] = [
  {
    slug: "lifeos",
    index: "01",
    name: "LifeOS",
    type: "self-hosted autonomous workspace & infrastructure",
    status: "operational",
    summary: "A private, self-hosted autonomous workspace pairing a responsive Next.js PWA with durable backend jobs and sandboxed CLI execution.",
    detail: "Built with Node.js 22 LTS, SQLite, authenticated APIs, and background job queues. Integrates isolated Codex/CLI execution environments and Bubblewrap compiler sandboxing. Deployed on an Oracle Cloud A1 Flex Linux host, routed across devices with Tailscale private mesh networking and Syncthing distributed synchronization.",
    stack: ["Next.js", "PWA", "SQLite", "Linux", "Tailscale", "Bubblewrap", "Systemd"],
    href: "https://github.com/timsurrealedu/Noema",
    media: {
      src: "/portfolio/lifeos-desktop.png",
      alt: "LifeOS workspace screens showing inbox capture, scratchpad code, note tutor, and advisor views",
      caption: "LifeOS workspace: capture, code scratchpad, tutor, and vault advisor.",
    },
  },
  {
    slug: "smartwarga",
    index: "02",
    name: "SmartWarga",
    type: "community governance platform",
    status: "active release",
    summary: "An integrated digital platform modernizing neighborhood administration and financial transparency for RT/RW communities in Indonesia.",
    detail: "Engineered dynamic resident billing and dues verification queues, real-time cashflow analytics, panic alert broadcasts, and resident directories. Designed mobile-first responsive architecture for both administrators and residents with role-based access control.",
    stack: ["TypeScript", "Next.js", "TailwindCSS", "Mobile-First", "State Management"],
    href: "https://github.com/timsurrealedu/SmartWarga",
  },
  {
    slug: "stewie",
    index: "03",
    name: "Stewie",
    type: "automated media pipeline",
    status: "active prototype",
    summary: "A CPU-first pipeline that turns current tech topics into short vertical educational videos.",
    detail: "Fetches topics, generates scripts through a multi-provider LLM fallback chain, synthesizes voices, measures per-line timing, composes 1080×1920 video with ffmpeg, generates metadata, and gates YouTube publishing behind manual approval.",
    stack: ["Python", "Kokoro/Piper", "ffmpeg", "LLM routing"],
    href: "https://github.com/timsurrealedu/stewie",
  },
  {
    slug: "automatic-trash-bin",
    index: "04",
    name: "Automatic Trash Bin",
    type: "embedded systems prototype",
    status: "functional prototype",
    summary: "A sensor-driven bin that opens and closes automatically using an Arduino Uno.",
    detail: "Programmed the microcontroller to coordinate sensors and motors, then designed and tested the initial circuit and enclosure concept in Tinkercad.",
    stack: ["Arduino Uno", "Sensors", "Motors", "Tinkercad"],
    media: {
      src: "/portfolio/automatic-trash-bin.png",
      alt: "Tinkercad automatic trash bin enclosure beside a photo of the physical prototype",
      caption: "Tinkercad enclosure concept and physical sensor-bin prototype.",
    },
  },
  {
    slug: "nolen",
    index: "05",
    name: "Nolen",
    type: "security telemetry & incident detection",
    status: "team MVP verified",
    summary: "An open-source Linux security telemetry platform that turns authenticated events into explainable detections and correlated incidents.",
    detail: "Served as Cybersecurity & Detection Lead: authored the threat model and telemetry security requirements; designed detection-as-code rules, MITRE ATT&CK mappings, false-positive boundaries, and deterministic SSH-compromise correlation; built safe attack simulations and reviewed authentication, authorization, rate limiting, redaction, secrets, and service isolation. Verification passed 52 automated tests and six offline scenarios; the complete scenario produces one confidence-80 incident from 12 unique evidence events.",
    stack: ["Threat modeling", "Detection engineering", "MITRE ATT&CK", "Node.js", "NATS JetStream"],
    href: "https://github.com/timsurrealedu/nolen",
  },
];

export const organizations = [
  {
    name: "Bina Nusantara Computer Club",
    short: "BNCC",
    period: "Nov 2025—now",
    relationship: "Activist",
    description: "Student-led technology organization at BINUS University.",
    summary: "Technical learning and organizational development across two subdivisions.",
    roles: [
      ["Research & Development", "Backend practice and technical program planning."],
      ["Human Resource Development", "Member-development research, surveys, SWOT analysis, and program delivery."],
    ],
  },
  {
    name: "Persekutuan Oikumene",
    short: "PO",
    period: "Nov 2025—now",
    relationship: "Activist · Small Group Leader",
    description: "Christian student fellowship at BINUS University.",
    summary: "Supported fellowship, worship, public speaking, and community development.",
    roles: [["Small-group coordination", "Tracked weekly group progress, reminded leaders, and followed up on missing updates."]],
  },
];

export const experience: readonly Experience[] = [
  {
    year: "2026",
    role: "Media Partner Team · BNCC CSR 2026",
    org: "BNCC",
    note: "Supported external communications for the CSR event by coordinating media-partner visibility, promotional touchpoints, and event-facing publication flow.",
    image: "/portfolio/bncc-csr-committee-certificate.jpg",
    alt: "Certificate of Appreciation for BNCC CSR 2026 Media Partner Staff",
  },
  {
    year: "Feb 2026",
    role: "Backend Developer · TPM Final Project",
    org: "BNCC",
    note: "Built registration, login, dashboard support, Prisma integration, and cross-team debugging for a hackathon platform.",
  },
  {
    year: "Jul—Aug 2026",
    role: "PIC · ADP Adobe After Effects Learning Program",
    org: "BNCC HRD",
    note: "Led a six-person organizing team and owned three weeks of Adobe After Effects sessions: coordinating facilitators, opening and closing Zoom sessions, tracking attendance, and following up on assignments.",
  },
] as const;

export const engagements = [
  {
    year: "2025",
    role: "AI Speaker",
    org: "SMA Wardaya",
    note: "Explained AI fundamentals, strategic value, and cultural risk to Grade 11 students.",
    image: "/portfolio/sma-wardaya-speaker.png",
    alt: "Timothy presenting at SMA Wardaya in front of classroom slides",
  },
  {
    year: "2025",
    role: "Annual Church Event Group Leader",
    org: "SIL",
    note: "Led and mentored a group of young teens while taking responsibility for their safety, participation, and engagement.",
    image: "/portfolio/sil-group.png",
    alt: "Timothy standing with young teens and event organizers at the SIL 2025 annual church event",
  },
] as const;

export const credentials: readonly Credential[] = [
  {
    title: "BNCC CSR 2026 Committee Certificate",
    issuer: "BNCC",
    kind: "Committee",
    year: "2026",
    media: {
      src: "/portfolio/bncc-csr-committee-certificate.jpg",
      alt: "Certificate of Appreciation as Media Partner Staff in BNCC CSR 2026 awarded to Timothy Sebastian Darmawan",
      caption: "Certificate of Appreciation for BNCC CSR 2026 Media Partner Staff.",
    },
  },
  {
    title: "CTF Meta4sec 3.0 Finalist",
    issuer: "Meta4sec & Redlimit",
    kind: "Competition",
    year: "2026",
    media: {
      src: "/portfolio/meta4sec-ctf-finalist-certificate.jpg",
      alt: "Finalist certificate for the CTF Meta4sec 3.0 competition awarded to Timothy Sebastian Darmawan",
      caption: "Finalist certificate in CTF Meta4sec 3.0, organized by Meta4sec and Redlimit (Jakarta, 28 August 2026).",
    },
  },
  {
    title: "ISACA Workshop Certificate",
    issuer: "ISACA Student Group",
    kind: "Workshop",
    year: "2025",
    media: {
      src: "/portfolio/isg-workshop-certificate.png",
      alt: "Certificate of participation for ARISE Bootcamp 2026 Mastering the Fundamental of IT Audit awarded to Timothy Sebastian Darmawan",
      caption: "ARISE Bootcamp certificate from ISACA Student Group BINUS University.",
    },
  },
  {
    title: "BNCC TPM FinPro Certificate",
    issuer: "BNCC",
    kind: "Project",
    year: "2026",
    media: {
      src: "/portfolio/bncc-tpm-certificate.png",
      alt: "BNCC certificate of completion for Back-End Development Course awarded to Timothy Sebastian Darmawan",
      caption: "BNCC Technology Project Member backend completion certificate.",
    },
  },
  {
    title: "IT FAIR UI/UX Design Competition Participation",
    issuer: "HIMATIF UIN Sunan Gunung Djati Bandung",
    kind: "Competition",
    year: "2026",
    media: {
      src: "/portfolio/uiux-competition-certificate.png",
      alt: "Certificate of participation for the IT FAIR XIV UI/UX Design Competition presented to Timothy Sebastian",
      caption: "Participation certificate for the IT FAIR XIV UI/UX Design Competition.",
    },
  },
];
