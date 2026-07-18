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
  },
  {
    slug: "stewie",
    index: "03",
    name: "Stewie",
    type: "automated media pipeline",
    status: "active prototype",
    summary: "A CPU-first pipeline that turns current tech topics into short vertical educational videos.",
    detail: "Fetches topics, generates scripts through a multi-provider LLM fallback chain, synthesizes voices, measures per-line timing, composes 1080×1920 video with ffmpeg, generates metadata, and gates YouTube publishing behind manual approval. TikTok/Instagram publishing and scheduling remain planned.",
    stack: ["Python", "Kokoro/Piper", "ffmpeg", "LLM routing"],
    href: "https://github.com/timsurrealedu/stewie",
  },
  {
    slug: "devsecops",
    index: "04",
    name: "Pipeline Standardization",
    type: "BNCC R&D initiative",
    status: "implemented workflow",
    summary: "Repeatable CI/CD checks that bring quality and vulnerability feedback earlier into development.",
    detail: "Explored and integrated GitHub Actions, SonarCloud, and Trivy into shared development workflows, emphasizing consistency and automated security validation.",
    stack: ["GitHub Actions", "SonarCloud", "Trivy", "CI/CD"],
  },
  {
    slug: "mindvault",
    index: "05",
    name: "MindVault",
    type: "UI/UX product prototype",
    status: "high-fidelity prototype",
    summary: "A UI/UX-focused mental-wellbeing product prototype designed around calm interaction, privacy cues, and responsive use.",
    detail: "Designed themed dashboards, adaptive journaling, panic-mode interventions, quests, and teleconsultation consent flows. The AI, encryption, and blockchain behaviors are simulated for the prototype; it is not a medical device.",
    stack: ["UX design", "React", "responsive UI", "design systems"],
    href: "https://github.com/timsurrealedu/MindVault",
  },  {
    slug: "smartwarga",
    index: "06",
    name: "SmartWarga",
    type: "group product project",
    status: "contribution documented",
    summary: "A collaborative application project balancing product intent, technical feasibility, and presentation.",
    detail: "Contributed to prototyping, application development, team responsibilities, GitHub workflows, and communicating the product’s purpose. Exact feature ownership awaits repository verification.",
    stack: ["Team development", "Prototyping", "Git"],
  },
  {
    slug: "pegilagi-studio",
    index: "07",
    name: "Pegilagi Studio",
    type: "content automation pipeline",
    status: "active build",
    summary: "An approval-assisted studio for generating, scheduling, and rendering Indonesian short-form marketing content.",
    detail: "Builds scripts, subtitles, storyboard previews, metadata, upload manifests, and analytics-driven variants; it can render queued 9:16 videos with reusable assets and ffmpeg.",
    stack: ["Node.js", "automation", "ffmpeg", "content ops"],
    href: "https://github.com/timsurrealedu/pegilagiMarketing",
  },] as const;

export const organizations = [
  {
    name: "Bina Nusantara Computer Club",
    short: "BNCC",
    period: "2025—now",
    relationship: "Activist",
    summary: "Technical learning and organizational development, with responsibility across two subdivisions.",
    roles: [
      ["Research & Development", "Backend practice, technical program planning, proposals, and DevSecOps workflows."],
      ["Human Resource Development", "Member-development research, surveys, SWOT analysis, and program delivery."],
    ],
  },
  {
    name: "Persekutuan Oikumene",
    short: "PO",
    period: "2025—now",
    relationship: "Aktivis KK",
    summary: "Weekly small-group coordination, progress tracking, reminders, and follow-up with group leaders.",
    roles: [],
  },
  {
    name: "ISACA Student Group",
    short: "ISACA",
    period: "2025—now",
    relationship: "Member",
    summary: "Cybersecurity community participation, including an ISACA workshop and certificate.",
    roles: [],
  },
];

export const experience = [
  { year: "2025", role: "DevSecOps Pipeline Standardization", org: "BNCC R&D", note: "Integrated GitHub Actions, SonarCloud, and Trivy into repeatable quality and security checks." },
  { year: "2025", role: "Backend Developer · TPM Final Project", org: "BNCC", note: "Built registration, login, dashboard support, Prisma integration, and cross-team debugging for a hackathon platform." },
  { year: "2025", role: "PIC · ADP Learning Program", org: "BNCC HRD", note: "Led six organizers and owned three weeks of live sessions, attendance, follow-up, and continuity." },
  { year: "2025", role: "US Program · Best Proposal Team", org: "BNCC", note: "Co-developed the program’s selected event plan and carried it into implementation planning." },
] as const;

export const engagements = [
  {
    year: "2025",
    role: "AI Speaker",
    org: "SMA Wardaya",
    note: "Explained AI fundamentals, strategic value, and cultural risk to Grade 11 students.",
    image: "/timothy-speaking.png",
    alt: "Timothy speaking into a microphone during a student event",
  },
] as const;

export const credentials: readonly Credential[] = [
  { title: "ISACA Workshop Certificate", issuer: "ISACA Student Group", kind: "Workshop", year: "2025" },
  { title: "BNCC TPM FinPro Certificate", issuer: "BNCC", kind: "Project", year: "2025" },
];
