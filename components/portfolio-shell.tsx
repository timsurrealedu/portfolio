"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { credentials, engagements, experience, organizations, projects, sections, type SectionId } from "@/lib/portfolio";

const skills = [
  ["security", "AppSec · DevSecOps · Trivy · security architecture"],
  ["backend", "Node.js · Express · Prisma · REST APIs · authentication"],
  ["systems", "Linux · networking · Oracle Cloud · self-hosting · NixOS"],
  ["people", "team leadership · public speaking · program planning"],
] as const;

export function PortfolioShell() {
  const [booting, setBooting] = useState(true);
  const [section, setSection] = useState<SectionId>("home");
  const [selected, setSelected] = useState(0);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>(["session ready — type 'help' or use the navigator"]);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentProject = projects[selected];

  useEffect(() => {
    const id = window.location.hash.slice(1) as SectionId;
    if (sections.some((item) => item.id === id)) setSection(id);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1150;
    const timer = window.setTimeout(() => setBooting(false), delay);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)");
    const syncTerminal = () => setTerminalOpen(!mobile.matches);
    syncTerminal();
    mobile.addEventListener("change", syncTerminal);
    return () => mobile.removeEventListener("change", syncTerminal);
  }, []);
  function navigate(id: SectionId, echo = true) {
    setSection(id);
    window.history.replaceState(null, "", `#${id}`);
    if (echo) setHistory((lines) => [...lines.slice(-2), `$ ${sections.find((item) => item.id === id)?.command}`]);
  }

  function run(raw: string) {
    const value = raw.trim().toLowerCase();
    const projectIndex = projects.findIndex((project) => value === `open ${project.slug}` || value === project.slug);
    if (!value) return;
    if (projectIndex >= 0) {
      setSelected(projectIndex);
      navigate("projects", false);
      setHistory((lines) => [...lines.slice(-2), `$ ${raw}`, `opened ./projects/${projects[projectIndex].slug}`]);
    } else if (["whoami", "home", "cd ~"].includes(value)) navigate("home");
    else if (["ls", "projects", "ls ./projects", "cd projects"].includes(value)) navigate("projects");
    else if (["experience", "cat experience.log"].includes(value)) navigate("experience");
    else if (["about", "cat about.md"].includes(value)) navigate("about");
    else if (["contact", "open contact"].includes(value)) navigate("contact");
    else if (value === "help") setHistory((lines) => [...lines.slice(-2), `$ ${raw}`, "whoami · projects · experience · about · contact · open <project> · clear"]);
    else if (value === "clear") setHistory([]);
    else setHistory((lines) => [...lines.slice(-2), `$ ${raw}`, `command not found: ${value}. try 'help'`]);
    setCommand("");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    run(command);
  }

  return (
    <div className={`site-shell ${terminalOpen ? "terminal-open" : "terminal-collapsed"}`} aria-busy={booting}>
      {booting && <BootScreen />}
      <a className="skip-link" href="#viewport">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => navigate("home", false)} aria-label="Timothy portfolio home">
          <span className="brand-mark">TS</span>
          <span>timsurreal<span className="dim">@portfolio</span></span>
        </a>
        <div className="topbar-path" aria-hidden="true">~/public/{section}<span className="cursor">_</span></div>
        <a className="topbar-link" href="https://github.com/timsurrealedu" target="_blank" rel="noreferrer">github ↗</a>
      </header>

      <aside className="tree" aria-label="Portfolio navigator">
        <div className="pane-title"><span>NAVIGATOR</span><span>01</span></div>
        <div className="tree-root"><span>▾</span> timothy/</div>
        <nav>
          {sections.map((item) => (
            <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => navigate(item.id)} aria-current={section === item.id ? "page" : undefined}>
              <span className="tree-branch">├─</span><span className="file-name">{item.label}</span><span className="file-ext">.{item.id === "projects" ? "dir" : "md"}</span>
            </button>
          ))}
        </nav>
        <div className="tree-meta">
          <span>HOST</span><strong>Jakarta, ID</strong>
          <span>TRACK</span><strong>Cyber Security</strong>
          <span>STATUS</span><strong className="online">● open to work</strong>
        </div>
      </aside>

      <main id="viewport" className="viewport" tabIndex={-1}>
        <div className="tabline" aria-hidden="true">
          <span className="tab-active">{section}.{section === "projects" ? "dir" : "md"} <b>×</b></span>
          <span className="tab-ghost">README.md</span>
        </div>
        <div className={`document document--${section}`} key={section}>
          {section === "home" && <Home onProjects={() => navigate("projects")} />}
          {section === "projects" && <Projects selected={selected} onSelect={setSelected} />}
          {section === "experience" && <Experience />}
          {section === "about" && <About />}
          {section === "contact" && <Contact />}
        </div>
      </main>

      <aside className="inspector" aria-label="Context inspector">
        <div className="pane-title"><span>INSPECTOR</span><span>02</span></div>
        <Inspector section={section} project={currentProject} />
      </aside>

      <section className={`terminal ${terminalOpen ? "is-open" : "is-collapsed"}`} aria-label="Command prompt">
        <button className="terminal-toggle" type="button" onClick={() => setTerminalOpen((open) => !open)} aria-expanded={terminalOpen} aria-controls="terminal-body">
          <span>TERMINAL</span><span>{terminalOpen ? "[−] HIDE" : "[+] OPEN"}</span>
        </button>
        <div id="terminal-body" className="terminal-body" hidden={!terminalOpen}>
          <div className="terminal-log" aria-live="polite">{history.map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</div>
          <form onSubmit={submit}>
            <label htmlFor="command">timothy<span>@portfolio</span> <b>~/{section}</b> $</label>
            <input ref={inputRef} id="command" value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck={false} aria-describedby="command-hint" />
            <button type="submit">RUN</button>
          </form>
          <p id="command-hint">Try: help, projects, open stewie</p>
        </div>
      </section>

      <footer className="statusbar">
        <span className="mode">NORMAL</span><span>portfolio-sh</span><span className="status-grow">UTF-8 · LF</span><span>{section.toUpperCase()}</span><span>Ln {sections.findIndex((item) => item.id === section) + 1}, Col 1</span>
      </footer>
    </div>
  );
}

function Inspector({ section, project }: { section: SectionId; project: typeof projects[number] }) {
  if (section === "projects") return <div className="inspect-project"><div className="inspect-index">{project.index}</div><p className="inspect-label">SELECTED OBJECT</p><h2>{project.name}</h2><dl><div><dt>TYPE</dt><dd>{project.type}</dd></div><div><dt>STATE</dt><dd>{project.status}</dd></div><div><dt>TAGS</dt><dd>{project.stack.join(" / ")}</dd></div></dl>{project.href && <a className="inspect-link" href={project.href} target="_blank" rel="noreferrer">VIEW SOURCE →</a>}</div>;
  if (section === "home") return <div className="inspect-home"><p className="inspect-label">SYSTEM MANIFEST</p><h2>operator.profile</h2><div className="boot-checks"><span>[ OK ] systems</span><span>[ OK ] security</span><span>[ OK ] curiosity</span></div><dl><div><dt>BASE</dt><dd>Jakarta, ID</dd></div><div><dt>TRACK</dt><dd>Cyber Security</dd></div><div><dt>UPTIME</dt><dd>always learning</dd></div></dl></div>;
  if (section === "experience") return <div className="inspect-experience"><p className="inspect-label">EXPERIENCE INDEX</p><h2>2024 → now</h2><div className="log-tape"><span>ORGS {organizations.length}</span><span>WORK {experience.length}</span><span>EVENTS {engagements.length}</span><span>PROOF {credentials.length}</span></div><dl><div><dt>STRUCTURE</dt><dd>affiliation → role → evidence</dd></div><div><dt>THREAD</dt><dd>build + organize + explain</dd></div><div><dt>STATE</dt><dd>in progress</dd></div></dl></div>;
  if (section === "about") return <div className="inspect-about"><p className="inspect-label">OPERATOR FINGERPRINT</p><h2>timsurreal</h2><img className="about-portrait" src="/timothy-speaking.png" alt="Timothy speaking into a microphone" /><dl><div><dt>ENVIRONMENT</dt><dd>Linux + Windows</dd></div><div><dt>LANGUAGES</dt><dd>ID / EN / ZH</dd></div><div><dt>REBUILD COUNT</dt><dd>non-zero</dd></div></dl></div>;  return <div className="inspect-contact"><p className="inspect-label">COMMS RELAY</p><h2>channel open</h2><div className="relay-route"><span>JKT</span><b>──▶</b><span>GITHUB</span></div><dl><div><dt>PROTOCOL</dt><dd>human conversation</dd></div><div><dt>TIMEZONE</dt><dd>UTC+7</dd></div><div><dt>RESPONSE</dt><dd>not automated</dd></div></dl><a className="inspect-link" href="https://github.com/timsurrealedu" target="_blank" rel="noreferrer">OPEN CHANNEL →</a></div>;
}
function BootScreen() {
  return (
    <div className="boot-screen" role="status" aria-label="Loading portfolio">
      <div className="boot-console" aria-hidden="true">
        <header><strong>portfolio-sh</strong><span>systemd[1]</span></header>
        <div className="boot-log">
          <p><b>[ OK ]</b> Mounted /dev/curiosity.</p>
          <p><b>[ OK ]</b> Started security-and-systems.target.</p>
          <p><b>[ OK ]</b> Reached target Portfolio Workspace.</p>
        </div>
        <div className="boot-meter"><i /><span>loading ~/public/home</span></div>
      </div>
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}

function Home({ onProjects }: { onProjects: () => void }) {
  return (
    <section className="home-view">
      <div className="bootline"><span>[ OK ]</span> profile mounted from /dev/curiosity</div>
      <div className="hero-grid">
        <div>
          <p className="path-label">~/README.md · Cyber Security student</p>
          <h1>Timothy Sebastian<br /><em>Darmawan.</em></h1>
          <p className="lede">I design security detections, build backend services and developer tools, operate Linux and cloud infrastructure, prototype user-centered products, and automate technical media workflows.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={onProjects}>./explore-work</button>
            <a href="https://github.com/timsurrealedu" target="_blank" rel="noreferrer">git remote -v ↗</a>
          </div>
        </div>
        <figure className="hero-portrait">
          <img src="/timothy-speaking.png" alt="Timothy Sebastian Darmawan speaking at a student event" />
          <figcaption>build · test · explain</figcaption>
        </figure>
      </div>
      <div className="proof-strip">
        <div><strong>{projects.length}</strong><span>selected projects</span></div>
        <div><strong>8.0</strong><span>IELTS overall</span></div>
        <div><strong>3.97</strong><span>current GPA</span></div>
        <div><strong>∞</strong><span>Linux reinstalls</span></div>
      </div>
      <blockquote><span>01</span> “I tend to learn by building something before I fully understand it, breaking it, reading the docs, and rebuilding it better.”</blockquote>
    </section>
  );
}

function Projects({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  const project = projects[selected];
  return (
    <section>
      <header className="section-header"><div><p className="path-label">~/projects/</p><h1>Selected work</h1></div><p>Build logs, not trophy shelves. Status labels separate what ships from what is still being explored.</p></header>
      <div className="project-layout">
        <div className="project-list" role="list" aria-label="Projects">
          {projects.map((item, index) => (
            <button key={item.slug} role="listitem" className={selected === index ? "selected" : ""} onClick={() => onSelect(index)}>
              <span>{item.index}</span><strong>{item.name}</strong><small>{item.type}</small><b>{selected === index ? "OPEN" : "↗"}</b>
            </button>
          ))}
        </div>
        <article className="project-detail" aria-live="polite">
          <div className="project-state"><span>STATE</span><b>{project.status}</b></div>
          <p className="project-number">{project.index} / {String(projects.length).padStart(2, "0")}</p>
          <h2>{project.name}</h2>
          <p className="project-summary">{project.summary}</p>
          {project.media && <figure className="project-media"><img src={project.media.src} alt={project.media.alt} /><figcaption>{project.media.caption}</figcaption></figure>}
          <div className="rule" />
          <p>{project.detail}</p>
          <ul className="tag-list">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          {project.href && <a className="inline-link" href={project.href} target="_blank" rel="noreferrer">Inspect repository ↗</a>}
        </article>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section>
      <header className="section-header"><div><p className="path-label">~/experience/</p><h1>Experience, indexed</h1></div><p>Organizations show where I contributed. Selected work shows what I owned. Evidence shows what happened.</p></header>

      <div className="experience-group">
        <h2><span>01</span> Organizations &amp; communities</h2>
        <div className="organization-list">
          {organizations.map((item) => <article key={item.short}>
            <header><b>{item.short}</b>{item.period && <time>{item.period}</time>}</header>
            <div className={item.roles.length ? "" : "org-summary"}><p>{item.relationship}</p><h3>{item.name}</h3><small>{item.description}</small><span>{item.summary}</span></div>
            {item.roles.length > 0 && <dl>{item.roles.map(([role, note]) => <div key={role}><dt>{role}</dt><dd>{note}</dd></div>)}</dl>}
          </article>)}
        </div>
      </div>

      <div className="experience-group">
        <h2><span>02</span> Selected responsibilities</h2>
        <div className="timeline">
          {experience.map((item, index) => <article key={item.role}><span className="line-no">{String(index + 1).padStart(2, "0")}</span><time>{item.year}</time><div><p>{item.org}</p><h3>{item.role}</h3><span>{item.note}</span></div></article>)}
        </div>
      </div>

      <div className="evidence-layout">
        <section className="experience-group">
          <h2><span>03</span> Speaking &amp; events</h2>
          <div className="event-stack">{engagements.map((item) => <figure className={`event-proof ${"image" in item ? "" : "no-media"}`} key={item.role}>
            {"image" in item && <img src={item.image} alt={item.alt} />}
            <figcaption><p>{item.org} · {item.year}</p><h3>{item.role}</h3><span>{item.note}</span></figcaption>
          </figure>)}</div>
        </section>
        <section className="experience-group">
          <h2><span>04</span> Certificates</h2>
          <div className="credential-list">
            {credentials.map((item) => <article key={item.title}>{item.media && <img src={item.media.src} alt={item.media.alt} />}<span>{item.kind}</span><h3>{item.title}</h3><p>{item.issuer} · {item.year}</p></article>)}
          </div>
        </section>
      </div>
      <div className="experience-callout"><span>THE THREAD</span><p>Build the system, organize the people around it, then explain the work clearly.</p></div>
    </section>
  );
}

function About() {
  return (
    <section>
      <header className="section-header"><div><p className="path-label">~/about.md</p><h1>About the operator</h1></div><p>Cyber Security student at Bina Nusantara University, based in Jakarta.</p></header>
      <div className="about-grid">
        <div className="about-copy"><p>I’m Timothy Sebastian Darmawan, or <code>timsurreal</code> online. I like understanding systems by building them, breaking them, troubleshooting them, and making the next version less fragile.</p><p>My interests meet where software touches the real world: application security, backend systems, Linux, cloud infrastructure, networking, privacy, and teams that need someone to own the messy middle.</p><dl className="about-contacts"><div><dt>EMAIL</dt><dd><a href="mailto:td522637@gmail.com">td522637@gmail.com</a></dd></div><div><dt>WHATSAPP</dt><dd><a href="https://wa.me/6287777179775" target="_blank" rel="noreferrer">+62 87777179775 ↗</a></dd></div><div><dt>DISCORD</dt><dd>@timsurreal</dd></div></dl></div>
        <dl className="facts"><div><dt>EDUCATION</dt><dd>B.Sc. Cyber Security<br />BINUS · expected 2029<br />GPA · 3.97</dd></div><div><dt>LANGUAGES</dt><dd>Indonesian · native<br />English · IELTS 8.0<br />Mandarin · basic</dd></div><div><dt>COMMUNITIES</dt><dd>BNCC · PO · CSC · ISG<br />YCC SMAK 1 · GDG on Campus</dd></div></dl>
      </div>
      <div className="skill-matrix">{skills.map(([name, value], index) => <div key={name}><span>0{index + 1}</span><h2>{name}</h2><p>{value}</p></div>)}</div>
      <p className="arch-note">$ uname -a<br /><strong>Arch · Fedora · CachyOS · NixOS · Windows 11</strong><br /><em>yes, I use Arch btw.</em></p>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-view">
      <p className="path-label">~/contact</p>
      <p className="contact-code">HTTP 200 — AVAILABLE</p>
      <h1>Have a system worth<br /><em>building carefully?</em></h1>
      <p>I’m interested in security, backend, infrastructure, and technical projects where curiosity and ownership matter.</p>
      <a className="contact-action" href="https://github.com/timsurrealedu" target="_blank" rel="noreferrer"><span>START A CONVERSATION</span><strong>github.com/timsurrealedu</strong><b>↗</b></a>
      <div className="contact-footer"><span>Jakarta · UTC+7</span><span>Indonesian / English</span><span>Response: human, not automated</span></div>
    </section>
  );
}
