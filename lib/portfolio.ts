export type SectionId = "home" | "projects" | "experience" | "about" | "contact";

export const sections: { id: SectionId; label: string; command: string; key: string }[] = [
  { id: "home", label: "overview", command: "whoami", key: "H" },
  { id: "projects", label: "projects", command: "ls ./projects", key: "P" },
  { id: "experience", label: "experience", command: "cat experience.log", key: "E" },
  { id: "about", label: "about", command: "cat about.md", key: "A" },
  { id: "contact", label: "contact", command: "open contact", key: "C" },
];

export const projects = [
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
    type: "human-centered technology",
    status: "concept exploration",
    summary: "A product exploration into private, trustworthy software for reflecting on mental well-being.",
    detail: "Focused on translating a sensitive human problem into a usable product while considering trust, privacy, accessibility, and responsible technology. Presented honestly as exploration, not a shipped clinical tool.",
    stack: ["Product thinking", "Privacy", "Accessibility"],
  },
  {
    slug: "smartwarga",
    index: "06",
    name: "SmartWarga",
    type: "group product project",
    status: "contribution documented",
    summary: "A collaborative application project balancing product intent, technical feasibility, and presentation.",
    detail: "Contributed to prototyping, application development, team responsibilities, GitHub workflows, and communicating the product’s purpose. Exact feature ownership awaits repository verification.",
    stack: ["Team development", "Prototyping", "Git"],
  },
] as const;

export const experience = [
  { year: "2025—now", role: "Research & Development Activist", org: "BNCC", note: "Backend foundations, APIs, authentication, databases, program planning, and technical proposals." },
  { year: "2025—now", role: "DevSecOps Initiative", org: "BNCC R&D", note: "Security and quality checks standardized through CI/CD workflows." },
  { year: "2025", role: "Backend Developer", org: "BNCC Technology Project", note: "Registration, login, dashboard support, Prisma integration, and cross-team debugging for a hackathon platform." },
  { year: "2025", role: "PIC — ADP Learning Program", org: "BNCC", note: "Led six organizers and owned three weeks of live sessions, attendance, follow-up, and continuity." },
  { year: "2025", role: "AI Speaker", org: "SMA Wardaya", note: "Explained AI fundamentals, strategic value, and cultural risk to Grade 11 students." },
] as const;
