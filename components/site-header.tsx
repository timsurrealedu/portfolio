"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/portfolio";

const NAV = [
  { id: "home", label: "home" },
  { id: "projects", label: "work" },
  { id: "experience", label: "log" },
  { id: "certs", label: "certs" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
] as const;

const ALIASES: Record<string, string> = { homelab: "oci-homelab", oci: "oci-homelab", trashbin: "automatic-trash-bin", "automatic trashbin": "automatic-trash-bin" };
const HELP = "whoami · projects · experience · certs · about · contact · open <project> · cv · github · clear";

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/** Opens a project's build log and scrolls to it. Returns the project name, or null. */
function openProject(name: string) {
  const slug = ALIASES[name] ?? name;
  const p = projects.find((x) => x.slug === slug || x.name.toLowerCase() === slug);
  if (!p) return null;
  const card = document.getElementById(`project-${p.slug}`);
  card?.querySelector("details")?.setAttribute("open", "");
  go(`project-${p.slug}`);
  return p.name;
}

export function SiteHeader() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState<string[]>(["type 'help' for commands"]);
  const dialog = useRef<HTMLDialogElement>(null);

  // Highlight the tab for the section in view.
  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      const best = [...seen].sort((a, b) => b[1] - a[1])[0];
      if (best && best[1] > 0) setActive(best[0]);
    }, { threshold: [0, 0.15, 0.35, 0.6], rootMargin: "-20% 0px -45% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // "/" opens the command palette (unless typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "/" && !open && !/INPUT|TEXTAREA|SELECT/.test(t.tagName)) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  function run(raw: string) {
    const v = raw.trim().toLowerCase();
    if (!v) return;
    const say = (...lines: string[]) => setLog((l) => [...l, `$ ${raw}`, ...lines].slice(-8));
    const sections: Record<string, string> = {
      whoami: "home", home: "home", "cd ~": "home",
      ls: "projects", projects: "projects", work: "projects", "ls ./projects": "projects",
      experience: "experience", log: "experience", "cat experience.log": "experience",
      certs: "certs", certificates: "certs", about: "about", "cat about.md": "about", contact: "contact",
    };
    if (v === "help") say(HELP);
    else if (v === "clear") setLog([]);
    else if (v === "cv") { window.location.href = "/cv"; }
    else if (v === "github") { window.open("https://github.com/timsurrealedu", "_blank", "noopener"); say("opened github ↗"); }
    else if (sections[v]) { setOpen(false); go(sections[v]); }
    else {
      const name = openProject(v.replace(/^open\s+/, ""));
      if (name) { setOpen(false); }
      else say(`command not found: ${v}. try 'help'`);
    }
    setCmd("");
  }

  const submit = (e: FormEvent) => { e.preventDefault(); run(cmd); };

  return (
    <header className="top">
      <div className="top-inner shell">
        <a className="prompt" href="#home" aria-label="Back to top">
          <b>timsurreal</b>@<i>portfolio</i>:~$ <em>{NAV.find((n) => n.id === active)?.label}</em><span className="cursor" aria-hidden="true" />
        </a>
        <nav className="tabs" aria-label="Sections">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? "location" : undefined}>{n.label}</a>)}
          <a href="/cv" className="tab-cv">cv</a>
          <button type="button" className="tab-cmd" onClick={() => setOpen(true)} aria-haspopup="dialog" title="Command palette (/)">
            <span aria-hidden="true">›_</span><span className="sr-only">Open command palette</span>
          </button>
        </nav>
      </div>

      <dialog ref={dialog} className="palette" aria-label="Command palette" onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="palette-box">
          <p className="palette-title">┤ portfolio-sh ├ <span className="muted">esc to close</span></p>
          <div className="palette-log" aria-live="polite">{log.map((l, i) => <span key={`${i}-${l}`} className={l.startsWith("$") ? "cmd-line" : ""}>{l}</span>)}</div>
          <form onSubmit={submit}>
            <label htmlFor="palette-input"><b>timsurreal</b>@portfolio:~$</label>
            <input id="palette-input" value={cmd} onChange={(e) => setCmd(e.target.value)} autoComplete="off" spellCheck={false} autoFocus placeholder="help" />
          </form>
          <p className="palette-chips">
            {["projects", "open nolen", "open stewie", "certs", "contact"].map((c) => <button key={c} type="button" onClick={() => run(c)}>{c}</button>)}
          </p>
        </div>
      </dialog>
    </header>
  );
}
