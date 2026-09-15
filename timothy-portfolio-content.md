# Timothy Sebastian Darmawan — Portfolio Content

## Profile

**Cyber Security Student · AI Systems & DevSecOps Enthusiast · Full-Stack & Backend Developer**

I'm Timothy Sebastian Darmawan, also known online as `timsurreal`.

I'm a Cyber Security student at Bina Nusantara University who learns by building real systems, operating infrastructure, developing security tooling, and leading technical teams.

My technical depth spans:
- **Full-Stack & B2B SaaS Systems:** Next.js 15, TypeScript, TailwindCSS v4, Supabase PostgreSQL with Row-Level Security, sub-second redirect engines, and NFC hardware-software integration (**ReviewTap**).
- **Application Security & Threat Detection:** Threat modeling, detection-as-code, MITRE ATT&CK mappings, and deterministic event correlation (**Nolen**, **Sentinel**).
- **AI Systems & Agentic Coding:** Agentic CLI harnesses (Reasonix, Claude Code, Codex, OpenCode, Bernstein), prompt caching mechanics, token economics, context window management, and custom agent skills (**ctf-competition**).
- **Linux & Cloud Infrastructure:** Arch Linux, NixOS, Fedora, Oracle Cloud (OCI), Tailscale private mesh networking, Syncthing, and Bubblewrap sandbox isolation (**Noema**).
- **Leadership & Communication:** Technical team management, workshop lecturing, program planning, and community coordination.

---

# Featured Projects

## ReviewTap — Smart NFC & QR Google Review B2B SaaS Platform

**Creator & Full-Stack Engineer · B2B SaaS / Hardware-Software Integration**  
**Repository:** [github.com/timsurrealedu/ayoreview](https://github.com/timsurrealedu/ayoreview)

ReviewTap is a commercial B2B SaaS + hardware platform pairing physical NFC acrylic stands and dynamic QR codes for instant in-store Google review acquisition.

### Key Highlights
- **Hardware-Software Integration:** Built a complete product experience connecting physical NFC tags and acrylic counter stands with dynamic web redirection for cafes, restaurants, clinics, barbershops, and retail merchants.
- **Dynamic Redirection Engine:** Engineered a sub-second (<1s) URL redirection system where physical cards point to stable managed redirect endpoints, allowing merchants to update their target Google review destination centrally without reprinting or replacing physical cards.
- **Merchant Management & Telemetry:** Developed merchant onboarding, multi-location location assignment, batch card inventory provisioning, and tap telemetry backed by Supabase PostgreSQL with strict Row-Level Security (RLS).
- **Modern Frontend Architecture:** Built with Next.js 15 App Router, TailwindCSS v4, and TypeScript with mobile-first responsive interfaces for both customers and merchants.

### Skills
`Next.js 15` · `TailwindCSS v4` · `Supabase` · `PostgreSQL (RLS)` · `NFC Hardware` · `B2B SaaS` · `Dynamic Redirection`

---

## Nolen — Security Telemetry & Incident Detection Platform

**Cybersecurity & Detection Lead · Open-Source Security Telemetry**  
**Repository:** [github.com/timsurrealedu/nolen](https://github.com/timsurrealedu/nolen)

Nolen is an open-source Linux security telemetry platform that turns authenticated, schema-validated host events into explainable detections and correlated incidents over NATS JetStream.

### Key Highlights
- Authored the complete threat model and telemetry security requirements.
- Designed detection-as-code rules, MITRE ATT&CK mappings, and deterministic SSH-compromise correlation logic.
- Built safe attack simulation suite and passed 52 automated tests plus 6 offline scenarios.
- Verified incident correlation producing confidence-80 incidents from 12 unique evidence events.

### Skills
`AppSec` · `Threat Modeling` · `Detection Engineering` · `Node.js` · `NATS JetStream` · `MITRE ATT&CK`

---

## Noema — Self-Hosted Autonomous Workspace & Infrastructure

**Creator & Systems Engineer · Systems / Cloud / AI Tooling**  
**Repository:** [github.com/timsurrealedu/Noema](https://github.com/timsurrealedu/Noema)

Noema (evolved from LifeOS) is a personal-first, self-hosted autonomous workspace for capture, tasks, scheduling, knowledge, study, and coding automations.

### Key Highlights
- Responsive Next.js PWA frontend backed by Node.js 22 LTS, SQLite, authenticated APIs, and durable background jobs.
- Integrates isolated Codex/CLI execution environments and Bubblewrap compiler sandboxing for secure tool orchestration.
- Deployed on an Oracle Cloud A1 Flex Linux host, accessible across laptops, tablets, and smartphones via Tailscale encrypted mesh networking.

### Skills
`Next.js` · `PWA` · `SQLite` · `Linux` · `Tailscale` · `Bubblewrap Sandbox` · `Systemd`

---

## SmartWarga — RT/RW Community Governance Platform

**Lead Developer & System Architect · Full-Stack Web Application**  
**Repository:** [github.com/timsurrealedu/SmartWarga](https://github.com/timsurrealedu/SmartWarga)

SmartWarga is an integrated digital platform modernizing neighborhood administration and financial transparency for RT/RW communities in Indonesia.

### Key Highlights
- Engineered automated dues verification workflow and dynamic billing queues.
- Built real-time cashflow analytics, panic alert broadcasts, and verified resident directory.
- Designed mobile-first responsive UI with TypeScript, Next.js, and TailwindCSS with role-based access control.

### Skills
`TypeScript` · `Next.js` · `TailwindCSS` · `Full-Stack` · `Mobile-First` · `State Management`

---

## GuruAI — AI Pedagogical Co-Pilot for Indonesian Educators

**Creator & AI Engineer · AI Application & Education**  
**Repository:** [github.com/timsurrealedu/guruAI](https://github.com/timsurrealedu/guruAI)

GuruAI is an intelligent co-pilot platform tailored for Indonesian teachers aligned with the Kurikulum Merdeka national framework.

### Key Highlights
- Designed structured AI generation pipelines for RPP/Modul Ajar lesson plans, Bloom's cognitive taxonomy evaluations, and rubric generation.
- Created teacher DNA profile onboarding system to adapt AI generation to individual teaching styles and constraints.
- Built responsive interface using TypeScript, Next.js, and TailwindCSS.

### Skills
`TypeScript` · `Next.js` · `LLM Prompt Engineering` · `Kurikulum Merdeka` · `Pedagogical AI`

---

## Sentinel — Developer-Oriented Security Scanner Platform

**Creator & Lead Developer · DevSecOps / Application Security**  
**Repository:** [github.com/timsurrealedu/sentinel](https://github.com/timsurrealedu/sentinel)

Sentinel is a developer-oriented scanning platform that moves security findings closer to the code that caused them.

### Key Highlights
- Architected repository scanning workflows to detect exposed API keys, credentials, and code vulnerability patterns.
- Structured findings with file/line references, severity classification, and actionable remediation guidance.
- Designed scanning APIs and background processing workloads for both CLI and web interfaces.

### Skills
`DevSecOps` · `AppSec` · `TypeScript` · `Static Analysis` · `Security Tooling` · `API Design`

---

## CTF Competition Agent Skill & DevSecOps CI/CD Labs

**Security Researcher & AI Tooling Developer · AI Agent Skills & Security**  
**Repository:** [github.com/timsurrealedu/ctf-competition](https://github.com/timsurrealedu/ctf-competition)

Autonomous agent skill orchestrating long-running CTF challenge solving alongside CI/CD security automation workflows.

### Key Highlights
- Built `ctf-competition` agent skill with persistent hypothesis tracking, checkpoint compaction, and token budget management for agent harnesses (Reasonix, Claude Code, Codex).
- Implemented automated CI/CD security pipelines using GitHub Actions, SonarCloud quality gates, and Trivy vulnerability checks.

### Skills
`AI Agent Skills` · `CTF Exploitation` · `DevSecOps` · `GitHub Actions` · `Trivy` · `SonarCloud`

---

## Stewie — CPU-First Automated Video Content Pipeline

**Creator · Media Automation & AI**  
**Repository:** [github.com/timsurrealedu/stewie](https://github.com/timsurrealedu/stewie)

A CPU-first automated pipeline that turns current technical topics into short vertical educational videos (1080×1920).

### Key Highlights
- Multi-provider LLM fallback chain, Kokoro/Piper voice synthesis, per-line timing, and ffmpeg rendering.
- Manual approval guardrails for YouTube publishing with automated thumbnail and metadata generation.

### Skills
`Python` · `ffmpeg` · `LLM Routing` · `Voice Synthesis` · `Media Automation`

---

## Obsidian Automation Engine

**Creator & Systems Developer · Knowledge Automation**  
**Repository:** [github.com/timsurrealedu/obsidianAutomation](https://github.com/timsurrealedu/obsidianAutomation)

Capture-once batch knowledge processing system turning rough notes, voice dictations, and whiteboard photos into structured second-brain notes.

### Key Highlights
- Uses Claude Code batch processing to summarize whiteboard/lecture photos, auto-generate bi-directional [[links]], maintain Map of Content hub clusters, and sync deadlines directly to Google Calendar.

### Skills
`Knowledge Systems` · `Claude Code` · `Shell Scripting` · `Multimodal Ingestion` · `Obsidian`

---

# Organizational & Leadership Experience

## Bina Nusantara Computer Club (BNCC)
**Activist · HRD & R&D Subdivisions** | *Nov 2025 — Present*
- **ADP Adobe After Effects Program PIC (Jul—Aug 2026):** Led a 6-person organizing team directing a 3-week internal learning program for BNCC members.
- **Backend Developer — TPM Final Project (Feb 2026):** Engineered backend services (Node.js, Express, Prisma ORM) for a hackathon platform.
- **R&D & HRD Activist (Nov 2025 — Present):** Formulated program proposals, designed DevSecOps CI/CD standardization proposal, and conducted SWOT organizational analysis.

## Google Developer Groups on Campus (GDG on Campus)
**Member** | *Nov 2025 — Present*
- Active participant in developer workshops, cloud architecture, and modern AI/web ecosystems.

## Persekutuan Oikumene (PO)
**Activist & Small Group Leader** | *Nov 2025 — Present*
- Supported small group coordination, member accountability, and weekly tracking.

## Cyber Security Community (CSC)
**Member** | *Nov 2025 — Present*
- Engaged in campus cybersecurity peer community focused on digital defense and knowledge sharing.

## ISACA Student Group (ISG)
**Member** | *Nov 2025 — Present*
- Participated in IT audit workshops and cybersecurity governance events.
