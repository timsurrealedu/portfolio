import { credentials, engagements, experience, organizations, projects } from "@/lib/portfolio";

const GITHUB = "https://github.com/timsurrealedu";

const skills = [
  ["security", "AppSec · DevSecOps · Threat Modeling · Trivy · SonarCloud · MITRE ATT&CK"],
  ["ai & agents", "Reasonix · Claude Code · Codex · Prompt Caching · Model Benchmarking · Custom Skills"],
  ["backend & web", "TypeScript · Next.js · Node.js · Express · Prisma · Supabase · PostgreSQL"],
  ["systems", "Linux (Arch / NixOS) · Oracle Cloud · Terraform · Ansible · Tailscale · Self-Hosting"],
  ["people", "Team leadership · Public speaking · Program planning · Technical writing"],
] as const;

type Media = { src: string; alt: string; caption: string };
const mediaList = (m?: Media | readonly Media[]) => (m ? (Array.isArray(m) ? m : [m]) as readonly Media[] : []);

/** An image that opens in the lightbox (handled by <Motion />). Works as a plain link without JS. */
function Zoom({ src, alt, caption, className = "" }: { src: string; alt: string; caption?: string; className?: string }) {
  return (
    <a className={`zoom ${className}`} href={src} data-zoom={src} data-caption={caption ?? alt} aria-label={`Enlarge: ${alt}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <span className="zoom-hint" aria-hidden="true">⤢</span>
    </a>
  );
}

function SectionHead({ id, cmd, title, lead }: { id: string; cmd: string; title: string; lead?: string }) {
  return (
    <header className="sec-head" data-reveal>
      <p className="sec-cmd"><span>$</span> {cmd}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="hero-cmd" aria-hidden="true"><span>$</span> <span data-type="whoami">whoami</span><span className="cursor" /></p>
        <h1 id="home-title" className="hero-name">Timothy Sebastian <em>Darmawan</em></h1>
        <p className="hero-handle">aka <code>timsurreal</code> · Cyber Security at BINUS · Jakarta, UTC+7</p>
        <p className="lead">I design security detections, build backend services and developer tools, operate Linux and cloud infrastructure, and explain technical work clearly. I’m also an AI enthusiast who keeps up with the latest models and agent tooling, and puts them to work.</p>
        <div className="actions">
          <a className="btn" href="#projects">./explore-work ›</a>
          <a className="btn ghost" href="/cv">view cv</a>
          <a className="btn ghost" href={GITHUB} target="_blank" rel="noreferrer">github ↗</a>
        </div>
        <p className="status"><span className="pulse" aria-hidden="true" />open to work: security, backend and infrastructure roles</p>
      </div>
      <figure className="panel portrait" data-reveal>
        <span className="ptitle">timothy.png</span>
        <img src="/timothy-speaking.png" alt="Timothy Sebastian Darmawan speaking at a student event" width={545} height={801} />
        <figcaption>build · break · rebuild · explain</figcaption>
      </figure>
      <dl className="tiles hero-tiles" data-reveal>
        <div className="tile"><dt>projects</dt><dd data-count={projects.length}>{projects.length}</dd></div>
        <div className="tile"><dt>ielts overall</dt><dd data-count="8.0" data-decimals="1">8.0</dd></div>
        <div className="tile"><dt>current gpa</dt><dd data-count="3.97" data-decimals="2">3.97</dd></div>
        <div className="tile"><dt>linux reinstalls</dt><dd>∞</dd></div>
      </dl>
    </section>
  );
}

export function Work() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <SectionHead id="projects" cmd="ls ./projects" title="Selected work" lead="Build logs, not trophy shelves. Status labels separate what ships from what is still being explored." />
      <div className="work-grid">
        {projects.map((p, i) => {
          const media = mediaList(p.media);
          const kind = media.length ? (i === 0 ? " featured" : " has-media") : "";
          return (
            <article key={p.slug} id={`project-${p.slug}`} className={`panel card${kind}`} data-reveal>
              <span className="ptitle">{p.index} · {p.slug}</span>
              {media.length > 0 && (
                <div className="card-media">
                  {media.map((m) => <figure key={m.src}><Zoom src={m.src} alt={m.alt} caption={m.caption} /><figcaption>{m.caption}</figcaption></figure>)}
                </div>
              )}
              <div className="card-body">
                <p className="card-type">{p.type}</p>
                <h3>{p.name}</h3>
                <p className="badge"><span aria-hidden="true" />{p.status}</p>
                <p>{p.summary}</p>
                <details className="more">
                  <summary>read the build log</summary>
                  <p>{p.detail}</p>
                </details>
                <ul className="chips" aria-label="Stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <p className="links">
                  {p.websiteLinks?.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
                  {p.href && <a href={p.href} target="_blank" rel="noreferrer">source ↗</a>}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Log() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHead id="experience" cmd="cat experience.log" title="Experience, indexed" lead="Where I contributed, what I owned, and the evidence that it happened." />

      <h3 className="sub-head" data-reveal><span>01</span> organizations</h3>
      <div className="org-grid">
        {organizations.map((o) => (
          <article key={o.short} className="panel org" data-reveal>
            <span className="ptitle">{o.short}</span>
            <p className="card-type">{o.relationship} · {o.period}</p>
            <h4>{o.name}</h4>
            <p className="muted">{o.description}</p>
            <p>{o.summary}</p>
            {o.roles.length > 0 && <dl className="roles">{o.roles.map(([role, note]) => <div key={role}><dt>{role}</dt><dd>{note}</dd></div>)}</dl>}
          </article>
        ))}
      </div>

      <h3 className="sub-head" data-reveal><span>02</span> responsibilities</h3>
      <ol className="timeline panel" data-reveal>
        {experience.map((e) => (
          <li key={e.role} className="hop">
            <p className="hop-meta"><time>{e.year}</time> · {e.org}</p>
            <h4>{e.role}</h4>
            <p>{e.note}</p>
            {e.image && <Zoom className="hop-proof" src={e.image} alt={e.alt ?? e.role} />}
          </li>
        ))}
      </ol>

      <h3 className="sub-head" data-reveal><span>03</span> speaking &amp; events</h3>
      <div className="event-grid">
        {engagements.map((e) => (
          <figure key={e.role} className="panel event" data-reveal>
            <span className="ptitle">{e.org} · {e.year}</span>
            <Zoom src={e.image} alt={e.alt} />
            <figcaption><h4>{e.role}</h4><p>{e.note}</p></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Certificates() {
  return (
    <section id="certs" className="section" aria-labelledby="certs-title">
      <SectionHead id="certs" cmd="ls ./certs --sort=time" title="Certificates" lead="Competitions, workshops and programs. Select one to view it full size." />
      <ul className="cert-grid">
        {credentials.map((c) => (
          <li key={c.title} className="cert" data-reveal>
            {c.media && <Zoom src={c.media.src} alt={c.media.alt} caption={c.media.caption} />}
            <p className="card-type">{c.kind} · {c.year}</p>
            <h3>{c.title}</h3>
            <p className="muted">{c.issuer}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <SectionHead id="about" cmd="cat about.md" title="About the operator" />
      <div className="about-grid">
        <div className="about-copy" data-reveal>
          <p className="big">I’m Timothy Sebastian Darmawan, <code>timsurreal</code> online. I learn systems by building them, breaking them, troubleshooting them, and making the next version less fragile.</p>
          <p>My interests meet where software touches the real world: application security, backend systems, Linux, cloud infrastructure, networking, privacy, and teams that need someone to own the messy middle.</p>
          <p>I’m an AI enthusiast too. I follow new model releases, research and agent tooling as they land, benchmark models on real tasks instead of leaderboards, and build with them: custom skills for coding agents, LLM pipelines, and AI-assisted security work.</p>
          <blockquote>“I tend to learn by building something before I fully understand it, breaking it, reading the docs, and rebuilding it better.”</blockquote>
          <dl className="facts">
            <div><dt>education</dt><dd>B.Sc. Cyber Security · BINUS<br />expected 2029 · GPA 3.97</dd></div>
            <div><dt>languages</dt><dd>Indonesian · native<br />English · IELTS 8.0<br />Mandarin · basic</dd></div>
            <div><dt>communities</dt><dd>BNCC · PO</dd></div>
          </dl>
        </div>
        <figure className="panel about-photo" data-reveal>
          <span className="ptitle">operator.jpg</span>
          <img src="/portfolio/about-portrait.png" alt="Portrait of Timothy Sebastian Darmawan" width={480} height={640} loading="lazy" />
        </figure>
      </div>
      <div className="panel skills" data-reveal>
        <span className="ptitle">skills.tsv</span>
        {skills.map(([name, value], i) => (
          <div key={name} className="skill-row"><span className="idx">0{i + 1}</span><h3>{name}</h3><p>{value}</p></div>
        ))}
      </div>
      <pre className="term" data-reveal aria-label="Operating systems used">
        <span className="ln"><span className="cmd">$</span> uname -a</span>
        <span className="ln">Arch · Fedora · CachyOS · NixOS · Windows 11</span>
        <span className="ln muted"># yes, I use Arch btw.</span>
      </pre>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="panel contact" data-reveal>
        <span className="ptitle">contact</span>
        <p className="http">HTTP 200 · AVAILABLE</p>
        <h2 id="contact-title">Have a system worth <em>building carefully?</em></h2>
        <p className="lead">I’m interested in security, backend, infrastructure, and technical projects where curiosity and ownership matter.</p>
        <dl className="contact-lines">
          <div><dt>mail</dt><dd><a href="mailto:td522637@gmail.com">td522637@gmail.com</a></dd></div>
          <div><dt>whatsapp</dt><dd><a href="https://wa.me/6287777179775" target="_blank" rel="noreferrer">+62 877 7717 9775 ↗</a></dd></div>
          <div><dt>discord</dt><dd>@timsurreal</dd></div>
          <div><dt>github</dt><dd><a href={GITHUB} target="_blank" rel="noreferrer">github.com/timsurrealedu ↗</a></dd></div>
        </dl>
        <div className="actions">
          <a className="btn" href="mailto:td522637@gmail.com">start a conversation ›</a>
          <a className="btn ghost" href="/CV_Timothy_Sebastian_Darmawan.pdf" download>download cv (pdf)</a>
        </div>
        <p className="muted small">Jakarta · UTC+7 · Indonesian / English · replies are human, not automated.</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot shell">
      <p><span className="cmd">$</span> exit 0 <span className="muted">· © 2026 Timothy Sebastian Darmawan · built with Next.js, styled like a terminal that went outside.</span></p>
      <p><a href="#home">back to top ↑</a> · <a href="/cv">cv</a> · <a href={GITHUB} target="_blank" rel="noreferrer">github</a></p>
    </footer>
  );
}
