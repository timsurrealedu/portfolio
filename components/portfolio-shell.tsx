"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { experience, projects, sections, type SectionId } from "@/lib/portfolio";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const currentProject = projects[selected];

  useEffect(() => {
    const id = window.location.hash.slice(1) as SectionId;
    if (sections.some((item) => item.id === id)) setSection(id);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1150;
    const timer = window.setTimeout(() => setBooting(false), delay);
    return () => window.clearTimeout(timer);
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
    <div className="site-shell" aria-busy={booting}>
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
        <div className="document" key={section}>
          {section === "home" && <Home onProjects={() => navigate("projects")} />}
          {section === "projects" && <Projects selected={selected} onSelect={setSelected} />}
          {section === "experience" && <Experience />}
          {section === "about" && <About />}
          {section === "contact" && <Contact />}
        </div>
      </main>

      <aside className="inspector" aria-label="Context inspector">
        <div className="pane-title"><span>INSPECTOR</span><span>02</span></div>
        {section === "projects" ? (
          <>
            <div className="inspect-index">{currentProject.index}</div>
            <p className="inspect-label">SELECTED OBJECT</p>
            <h2>{currentProject.name}</h2>
            <dl>
              <div><dt>TYPE</dt><dd>{currentProject.type}</dd></div>
              <div><dt>STATE</dt><dd>{currentProject.status}</dd></div>
              <div><dt>TAGS</dt><dd>{currentProject.stack.join(" / ")}</dd></div>
            </dl>
            {"href" in currentProject && <a className="inspect-link" href={currentProject.href} target="_blank" rel="noreferrer">VIEW SOURCE ↗</a>}
          </>
        ) : (
          <>
            <div className="signal" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <p className="inspect-label">CURRENT CONTEXT</p>
            <h2>{sections.find((item) => item.id === section)?.command}</h2>
            <dl>
              <div><dt>MODE</dt><dd>interactive / readable</dd></div>
              <div><dt>SHELL</dt><dd>portfolio-sh 1.0</dd></div>
              <div><dt>FOCUS</dt><dd>security + systems</dd></div>
            </dl>
          </>
        )}
        <div className="inspect-note">No terminal knowledge required. The interface is the command reference.</div>
      </aside>

      <section className="terminal" aria-label="Command prompt">
        <div className="terminal-log" aria-live="polite">{history.map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</div>
        <form onSubmit={submit}>
          <label htmlFor="command">timothy<span>@portfolio</span> <b>~/{section}</b> $</label>
          <input ref={inputRef} id="command" value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck={false} aria-describedby="command-hint" />
          <button type="submit">RUN</button>
        </form>
        <p id="command-hint">Try: help, projects, open stewie</p>
      </section>

      <footer className="statusbar">
        <span className="mode">NORMAL</span><span>portfolio-sh</span><span className="status-grow">UTF-8 · LF</span><span>{section.toUpperCase()}</span><span>Ln {sections.findIndex((item) => item.id === section) + 1}, Col 1</span>
      </footer>
    </div>
  );
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
          <p className="path-label">~/README.md</p>
          <h1>I build systems,<br /><em>secure software,</em><br />and break Linux.</h1>
          <p className="lede">Cyber Security student exploring DevSecOps, backend engineering, infrastructure, and human-centered technology through things I actually build.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={onProjects}>./explore-work</button>
            <a href="https://github.com/timsurrealedu" target="_blank" rel="noreferrer">git remote -v ↗</a>
          </div>
        </div>
        <pre className="ascii" aria-label="Abstract TS monogram">
{`┌────────────────┐
│ SYS::TIMOTHY   │
├──────┬─────────┤
│  ╱╲  │ SEC  01 │
│ ╱TS╲ │ SYS  01 │
│ ╲  ╱ │ BLD  01 │
│  ╲╱  │ LDR  01 │
├──────┴─────────┤
│ LEARN → BREAK  │
│ DEBUG → BUILD  │
└────────────────┘`}</pre>
      </div>
      <div className="proof-strip">
        <div><strong>6</strong><span>selected projects</span></div>
        <div><strong>8.0</strong><span>IELTS overall</span></div>
        <div><strong>2029</strong><span>expected B.Sc.</span></div>
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
          <p className="project-number">{project.index} / 06</p>
          <h2>{project.name}</h2>
          <p className="project-summary">{project.summary}</p>
          <div className="rule" />
          <p>{project.detail}</p>
          <ul className="tag-list">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          {"href" in project && <a className="inline-link" href={project.href} target="_blank" rel="noreferrer">Inspect repository ↗</a>}
        </article>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section>
      <header className="section-header"><div><p className="path-label">~/experience.log</p><h1>Experience</h1></div><p>Technical practice and organizational ownership reinforce each other.</p></header>
      <div className="timeline">
        {experience.map((item, index) => <article key={item.role}><span className="line-no">{String(index + 1).padStart(2, "0")}</span><time>{item.year}</time><div><p>{item.org}</p><h2>{item.role}</h2><span>{item.note}</span></div></article>)}
      </div>
      <div className="experience-callout"><span>WHY IT MATTERS</span><p>I can move between code, infrastructure, planning, and a room full of people—without treating communication as someone else’s job.</p></div>
    </section>
  );
}

function About() {
  return (
    <section>
      <header className="section-header"><div><p className="path-label">~/about.md</p><h1>About the operator</h1></div><p>Cyber Security student at Bina Nusantara University, based in Jakarta.</p></header>
      <div className="about-grid">
        <div className="about-copy"><p>I’m Timothy Sebastian Darmawan, or <code>timsurreal</code> online. I like understanding systems by building them, breaking them, troubleshooting them, and making the next version less fragile.</p><p>My interests meet where software touches the real world: application security, backend systems, Linux, cloud infrastructure, networking, privacy, and teams that need someone to own the messy middle.</p></div>
        <dl className="facts"><div><dt>EDUCATION</dt><dd>B.Sc. Cyber Security<br />BINUS · expected 2029</dd></div><div><dt>LANGUAGES</dt><dd>Indonesian · native<br />English · IELTS 8.0<br />Mandarin · basic</dd></div><div><dt>COMMUNITIES</dt><dd>Cyber Security Community<br />ISACA Student Group<br />GDG on Campus</dd></div></dl>
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
