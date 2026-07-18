export type SectionId = "home" | "projects" | "experience" | "about" | "contact";
type MediaAsset = { src: string; alt: string; caption: string };
type Project = { slug: string; index: string; name: string; type: string; status: string; summary: string; detail: string; stack: readonly string[]; href?: string; media?: MediaAsset };
type Credential = { title: string; issuer: string; kind: string; year: string; media?: MediaAsset };

export const sections: { id: SectionId; label: string; command: string; key: string }[] = [
  { id: "home", label: "overview", command: "whoami", key: "H" },
  { id: "projects", label: "projects", command: "ls ./projects", key: "P" },
  { id: "experience", label: "experience", command: "cat experience.log", key: "E" },
  { id: "about", label: "about", command: "cat about.md", key: "A" },
  { id: "contact", label: "contact", command: "open contact", key: "C" },
];

export const projects: readonly Project[] = [
  {
    slug: "sentinel",
    index: "01",
    name: "Sentinel",
    type: "security tooling",
    status: "in development",
    summary: "A developer-oriented scanning platform that moves security findings closer to the code that caused them.",
    detail: "Designed around repository scanning, exposed-secret detection, severity-ranked findings, file and line references, remediation guidance, scan history, APIs, and safe handling of submitted source code.",
    stack: ["AppSec", "DevSecOps", "API design", "background jobs"],
  },
  {
    slug: "lifeos",
    index: "02",
    name: "LifeOS",
    type: "personal infrastructure",
    status: "operational",
    summary: "A private, multi-device environment connecting laptops, phones, tablets, and an Oracle Cloud server.",
    detail: "Provisioned and operate an A1 Flex Linux server; connected devices with Tailscale; built distributed file workflows with Syncthing; troubleshoot networking, sync, and cross-platform behavior.",
    stack: ["Linux", "Oracle Cloud", "Tailscale", "Syncthing"],
    media: {
      src: "/portfolio/lifeos-desktop.png",
      alt: "LifeOS mobile screens showing inbox capture, scratchpad code, note tutor, and chat advisor views",
      caption: "LifeOS mobile workspace: capture, code scratchpad, tutor, and vault advisor.",
    },
  },
  {
    slug: "smartwarga",
    index: "03",
    name: "SmartWarga",
    type: "group product project",
    status: "contribution documented",
    summary: "A collaborative application project balancing product intent, technical feasibility, and presentation.",
    detail: "Contributed to prototyping, application development, team responsibilities, GitHub workflows, and communicating the product’s purpose. Exact feature ownership awaits repository verification.",
    stack: ["Team development", "Prototyping", "Git"],
  },
  {
    slug: "stewie",
    index: "04",
    name: "Stewie",
    type: "automated media pipeline",
    status: "active prototype",
    summary: "A CPU-first pipeline that turns current tech topics into short vertical educational videos.",
    detail: "Fetches topics, generates scripts through a multi-provider LLM fallback chain, synthesizes voices, measures per-line timing, composes 1080×1920 video with ffmpeg, generates metadata, and gates YouTube publishing behind manual approval. TikTok/Instagram publishing and scheduling remain planned.",
    stack: ["Python", "Kokoro/Piper", "ffmpeg", "LLM routing"],
    href: "https://github.com/timsurrealedu/stewie",
  },
  {
    slug: "devsecops-proposal",
    index: "05",
    name: "DevSecOps Pipeline Standardization",
    type: "BNCC R&D program proposal",
    status: "proposed · not implemented",
    summary: "A proposed BNCC program kerja for standardizing automated code-quality and vulnerability checks; it never proceeded to implementation.",
    detail: "Planned a workflow around GitHub Actions, SonarCloud, and Trivy to move feedback earlier in development. This remained a proposal and planning artifact—no production pipeline was built or deployed.",
    stack: ["Program proposal", "GitHub Actions", "SonarCloud", "Trivy"],
  },
  {
    slug: "mindvault",
    index: "06",
    name: "MindVault",
    type: "UI/UX product prototype",
    status: "high-fidelity prototype",
    summary: "A UI/UX-focused mental-wellbeing product prototype designed around calm interaction, privacy cues, and responsive use.",
    detail: "Designed themed dashboards, adaptive journaling, panic-mode interventions, quests, and teleconsultation consent flows. The AI, encryption, and blockchain behaviors are simulated for the prototype; it is not a medical device.",
    stack: ["UX design", "React", "responsive UI", "design systems"],
    href: "https://github.com/timsurrealedu/MindVault",
  },
  {
    slug: "automatic-trash-bin",
    index: "07",
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
      ["Research & Development", "Backend practice, technical program planning, proposals, and DevSecOps workflows."],
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
  {
    name: "Cyber Security Community",
    short: "CSC",
    period: "Nov 2025—now",
    relationship: "Member",
    description: "Cybersecurity learning community at BINUS University.",
    summary: "Participates in a peer community centered on cybersecurity knowledge and practice.",
    roles: [],
  },
  {
    name: "ISACA Student Group",
    short: "ISG",
    period: "Nov 2025—now",
    relationship: "Member",
    description: "Student community connected to ISACA and cybersecurity practice.",
    summary: "Cybersecurity community participation, including an ISACA workshop and certificate.",
    roles: [],
  },
  {
    name: "YCC SMAK 1",
    short: "YCC",
    period: "Jul 2024—Jan 2025",
    relationship: "Member",
    description: "Student fellowship organization at SMAK 1 BPK PENABUR Jakarta.",
    summary: "Collaborated in planning and running weekly fellowship events for the student body.",
    roles: [],
  },
  {
    name: "Google Developer Groups on Campus",
    short: "GDG",
    period: "",
    relationship: "Member",
    description: "Campus developer community connected to Google Developer Groups.",
    summary: "Participates in the campus technology and developer community.",
    roles: [],
  },
];

export const experience = [
  { year: "Feb 2026", role: "Backend Developer · TPM Final Project", org: "BNCC", note: "Built registration, login, dashboard support, Prisma integration, and cross-team debugging for a hackathon platform." },
  { year: "2025", role: "PIC · ADP Learning Program", org: "BNCC HRD", note: "Led six organizers and owned three weeks of live sessions, attendance, follow-up, and continuity." },
  { year: "2025", role: "DevSecOps Pipeline Standardization · Proposal", org: "BNCC R&D", note: "Proposed a program kerja using GitHub Actions, SonarCloud, and Trivy; it was never implemented or deployed." },
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
