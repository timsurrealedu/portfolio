"use client";

import { useState, useRef, useEffect } from "react";
import initialCvData from "../cv-data.json";

export type CvData = typeof initialCvData;

export function CvEditor() {
  const [data, setData] = useState<CvData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("timothy_cv_data_v2");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return initialCvData;
  });

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview");
  const [focusPreset, setFocusPreset] = useState<"all" | "security" | "backend" | "leadership">("all");
  const [theme, setTheme] = useState<"gruvbox" | "light" | "executive">("gruvbox");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timothy_cv_data_v2", JSON.stringify(data));
    }
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Reset CV data back to default repository state?")) {
      setData(initialCvData);
      localStorage.removeItem("timothy_cv_data_v2");
    }
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV_Timothy_Sebastian_Darmawan.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateMarkdown = (): string => {
    let md = `# ${data.personalInfo.fullName}\n`;
    md += `**${data.personalInfo.title}**\n\n`;
    md += `${data.personalInfo.location} | ${data.personalInfo.phone} | [${data.personalInfo.email}](mailto:${data.personalInfo.email})\n`;
    md += `[GitHub](${data.personalInfo.github}) | [Website](${data.personalInfo.website})\n\n`;
    md += `---\n\n## PROFESSIONAL SUMMARY\n${data.summary}\n\n`;

    md += `---\n\n## EDUCATION\n`;
    data.education.forEach((edu) => {
      md += `### ${edu.institution} | ${edu.location}\n`;
      md += `**${edu.degree}** | *${edu.period}*\n`;
      md += `- ${edu.details}\n\n`;
    });

    md += `---\n\n## CORE TECHNICAL SKILLS\n`;
    if ((data.skills as any).aiAndAgents) {
      md += `- **AI Engineering & Agent Harnesses:** ${(data.skills as any).aiAndAgents.join(", ")}\n`;
    }
    md += `- **Security & DevSecOps:** ${data.skills.security.join(", ")}\n`;
    md += `- **Backend & Full-Stack:** ${((data.skills as any).backendAndWeb || (data.skills as any).backend || []).join(", ")}\n`;
    md += `- **Systems & Infrastructure:** ${data.skills.systems.join(", ")}\n`;
    md += `- **Leadership & Communication:** ${data.skills.leadership.join(", ")}\n\n`;

    md += `---\n\n## FEATURED TECHNICAL PROJECTS\n`;
    data.technicalProjects.forEach((proj) => {
      md += `### ${proj.name} — ${proj.type}\n`;
      md += `*${proj.role}* | *${proj.period}*${proj.link ? ` | [Link](${proj.link})` : ""}\n`;
      proj.highlights.forEach((h) => {
        md += `- ${h}\n`;
      });
      md += `*Tags:* ${proj.tags.join(", ")}\n\n`;
    });

    md += `---\n\n## LEADERSHIP & EXPERIENCES\n`;
    data.experience.forEach((exp) => {
      md += `### ${exp.role}\n`;
      md += `*${exp.organization}* | *${exp.period}* | ${exp.location}\n`;
      exp.highlights.forEach((h) => {
        md += `- ${h}\n`;
      });
      md += `\n`;
    });

    md += `---\n\n## CERTIFICATIONS & LANGUAGES\n`;
    data.certifications.forEach((c) => {
      md += `- **${c.title}** — ${c.issuer} (${c.year})\n`;
    });
    md += `\n**Languages:** ` + data.languages.map((l) => `${l.language} (${l.proficiency})`).join(" | ") + `\n`;

    return md;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV_Timothy_Sebastian_Darmawan.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  // Filter projects/skills based on focus preset
  const filteredProjects = data.technicalProjects.filter((p) => {
    if (focusPreset === "security") return p.tags.some((t) => ["AppSec", "DevSecOps", "Threat Modeling", "Security Tooling"].includes(t));
    if (focusPreset === "backend") return p.tags.some((t) => ["Node.js", "API Design", "Python", "Self-Hosting", "Networking"].includes(t));
    if (focusPreset === "leadership") return p.role.includes("Lead") || p.role.includes("Creator") || p.role.includes("Designer");
    return true;
  });

  return (
    <div className="cv-page-wrapper" data-cv-theme={theme}>
      {/* Top Action Bar */}
      <div className="cv-action-bar no-print">
        <div className="bar-left">
          <a href="/" className="back-link">← Portfolio</a>
          <span className="bar-divider">|</span>
          <span className="bar-title">OPERATOR CV BUILDER & LIVE EDITOR</span>
        </div>

        <div className="bar-controls">
          <div className="control-group">
            <label>Mode:</label>
            <button
              className={activeTab === "preview" ? "btn-active" : ""}
              onClick={() => setActiveTab("preview")}
            >
              📄 Preview & Print
            </button>
            <button
              className={activeTab === "editor" ? "btn-active" : ""}
              onClick={() => setActiveTab("editor")}
            >
              ⚙️ Form Editor
            </button>
          </div>

          <div className="control-group">
            <label>Focus Preset:</label>
            <select value={focusPreset} onChange={(e) => setFocusPreset(e.target.value as any)}>
              <option value="all">Full Comprehensive CV</option>
              <option value="security">Security & DevSecOps Focus</option>
              <option value="backend">Backend & Infrastructure Focus</option>
              <option value="leadership">Leadership & Product Focus</option>
            </select>
          </div>

          <div className="control-group">
            <label>Theme:</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
              <option value="gruvbox">Gruvbox Dark</option>
              <option value="light">Clean Light</option>
              <option value="executive">Executive Navy</option>
            </select>
          </div>

          <div className="action-buttons">
            <a href="/CV_Timothy_Sebastian_Darmawan.docx" download className="cv-download-btn">
              📝 Download .docx
            </a>
            <a href="/CV_Timothy_Sebastian_Darmawan.pdf" target="_blank" download className="cv-download-btn">
              📄 Download .pdf
            </a>
            <button className="btn-primary" onClick={handlePrint}>
              🖨️ Print / Save PDF
            </button>
            <button onClick={handleDownloadMarkdown}>📥 Download .md</button>
            <button onClick={handleDownloadJson}>📥 Export .json</button>
            <button onClick={handleCopyMarkdown}>
              {copySuccess ? "✅ Copied!" : "📋 Copy MD"}
            </button>
            <button className="btn-danger" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {activeTab === "editor" && (
        <div className="cv-form-editor no-print">
          <h2>Edit CV Information</h2>
          <p className="editor-sub">Changes save automatically to browser storage.</p>

          <fieldset>
            <legend>Personal & Contact Details</legend>
            <div className="form-grid">
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, fullName: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Title / Headline</label>
                <input
                  type="text"
                  value={data.personalInfo.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, title: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, email: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, location: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>GitHub URL</label>
                <input
                  type="text"
                  value={data.personalInfo.github}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, github: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Professional Summary</legend>
            <textarea
              rows={4}
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
            />
          </fieldset>

          <fieldset>
            <legend>Skills (Comma-Separated)</legend>
            <div className="form-grid">
              <div>
                <label>AI Engineering & Agent Harnesses</label>
                <input
                  type="text"
                  value={((data.skills as any).aiAndAgents || []).join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      skills: {
                        ...data.skills,
                        aiAndAgents: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Security & DevSecOps</label>
                <input
                  type="text"
                  value={data.skills.security.join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      skills: {
                        ...data.skills,
                        security: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Backend & Full-Stack</label>
                <input
                  type="text"
                  value={((data.skills as any).backendAndWeb || (data.skills as any).backend || []).join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      skills: {
                        ...data.skills,
                        backendAndWeb: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Systems & Infrastructure</label>
                <input
                  type="text"
                  value={data.skills.systems.join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      skills: {
                        ...data.skills,
                        systems: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Leadership & Communication</label>
                <input
                  type="text"
                  value={data.skills.leadership.join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      skills: {
                        ...data.skills,
                        leadership: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
            </div>
          </fieldset>

          <div style={{ marginTop: "1rem" }}>
            <button className="btn-primary" onClick={() => setActiveTab("preview")}>
              ✓ Done Editing — Return to Preview
            </button>
          </div>
        </div>
      )}

      {/* CV Document Output Area */}
      <main className="cv-document-paper">
        <header className="doc-header">
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setData({
                ...data,
                personalInfo: { ...data.personalInfo, fullName: e.currentTarget.innerText },
              })
            }
          >
            {data.personalInfo.fullName}
          </h1>
          <div
            className="doc-subtitle"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setData({
                ...data,
                personalInfo: { ...data.personalInfo, title: e.currentTarget.innerText },
              })
            }
          >
            {data.personalInfo.title}
          </div>
          <div className="doc-contacts">
            <span>📍 {data.personalInfo.location}</span>
            <span>📞 {data.personalInfo.phone}</span>
            <span>
              ✉️ <a href={`mailto:${data.personalInfo.email}`}>{data.personalInfo.email}</a>
            </span>
            <span>
              📸 <a href="https://instagram.com/timsurreal" target="_blank" rel="noreferrer">@timsurreal</a>
            </span>
            <span>
              🌐 <a href={data.personalInfo.github} target="_blank" rel="noreferrer">github.com/timsurrealedu</a>
            </span>
          </div>
        </header>

        <section className="doc-section">
          <h2 className="doc-section-title">Professional Summary</h2>
          <p
            className="doc-summary"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setData({ ...data, summary: e.currentTarget.innerText })}
          >
            {data.summary}
          </p>
        </section>

        <section className="doc-section">
          <h2 className="doc-section-title">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="doc-item">
              <div className="doc-item-row">
                <span className="doc-bold">{edu.institution}</span>
                <span className="doc-dim">{edu.period}</span>
              </div>
              <div className="doc-subrow">
                <span className="doc-accent">{edu.degree}</span> | <span className="doc-dim">{edu.location}</span>
              </div>
              <p className="doc-desc">{edu.details}</p>
            </div>
          ))}
        </section>

        <section className="doc-section">
          <h2 className="doc-section-title">Core Technical Skills</h2>
          <div className="doc-skills-grid">
            {(data.skills as any).aiAndAgents && (
              <div className="skill-box">
                <div className="skill-box-title">AI Engineering & Agent Harnesses</div>
                <div>{(data.skills as any).aiAndAgents.join(" · ")}</div>
              </div>
            )}
            <div className="skill-box">
              <div className="skill-box-title">Security & DevSecOps</div>
              <div>{data.skills.security.join(" · ")}</div>
            </div>
            <div className="skill-box">
              <div className="skill-box-title">Backend & Full-Stack</div>
              <div>{((data.skills as any).backendAndWeb || (data.skills as any).backend || []).join(" · ")}</div>
            </div>
            <div className="skill-box">
              <div className="skill-box-title">Systems & Infrastructure</div>
              <div>{data.skills.systems.join(" · ")}</div>
            </div>
            <div className="skill-box">
              <div className="skill-box-title">Leadership & Communication</div>
              <div>{data.skills.leadership.join(" · ")}</div>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2 className="doc-section-title">Featured Technical Projects & Security Tooling</h2>
          {filteredProjects.map((proj, idx) => (
            <div key={idx} className="doc-item">
              <div className="doc-item-row">
                <span>
                  <strong className="doc-bold">{proj.name}</strong> — <span className="doc-accent">{proj.role}</span>
                </span>
                <span className="doc-dim">{proj.period}</span>
              </div>
              <div className="doc-dim doc-small">{proj.type}</div>
              <ul className="doc-bullets">
                {proj.highlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>
              <div className="doc-tags">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="doc-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="doc-section">
          <h2 className="doc-section-title">Leadership & Organizational Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="doc-item">
              <div className="doc-item-row">
                <strong className="doc-bold">{exp.role}</strong>
                <span className="doc-dim">{exp.period}</span>
              </div>
              <div className="doc-subrow">
                <span className="doc-accent">{exp.organization}</span> | <span className="doc-dim">{exp.location}</span>
              </div>
              <ul className="doc-bullets">
                {exp.highlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="doc-section">
          <h2 className="doc-section-title">Certifications & Languages</h2>
          <ul className="doc-bullets">
            {data.certifications.map((cert, idx) => (
              <li key={idx}>
                <strong>{cert.title}</strong> — {cert.issuer} ({cert.year})
              </li>
            ))}
            <li>
              <strong>Languages:</strong>{" "}
              {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(" · ")}
            </li>
          </ul>
        </section>
      </main>

      <style jsx global>{`
        /* CV Component Styles */
        .cv-page-wrapper {
          min-height: 100vh;
          background: #191b1c;
          color: #ebdbb2;
          font-family: var(--font, "JetBrains Mono", monospace);
          padding-bottom: 4rem;
        }

        .cv-page-wrapper[data-cv-theme="light"] {
          background: #eef2f5;
          color: #1e293b;
        }

        .cv-page-wrapper[data-cv-theme="executive"] {
          background: #0b1329;
          color: #e2e8f0;
        }

        .cv-action-bar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #282828;
          border-bottom: 2px solid #3c3836;
          padding: 0.75rem 1.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        [data-cv-theme="light"] .cv-action-bar {
          background: #ffffff;
          border-bottom-color: #cbd5e1;
        }

        [data-cv-theme="executive"] .cv-action-bar {
          background: #1e293b;
          border-bottom-color: #334155;
        }

        .bar-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 800;
          font-size: 0.88rem;
        }

        .back-link {
          color: #fe8019;
          text-decoration: none;
        }
        .back-link:hover { text-decoration: underline; }

        .bar-divider { color: #504945; }
        .bar-title { color: #8ec07c; letter-spacing: 0.05em; }

        .bar-controls {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
        }

        .control-group label {
          color: #a89984;
        }

        .cv-action-bar button, .cv-action-bar select, .cv-download-btn {
          background: #1d2021;
          color: #ebdbb2;
          border: 1px solid #504945;
          padding: 0.35rem 0.65rem;
          font-size: 0.8rem;
          font-family: inherit;
          cursor: pointer;
          border-radius: 2px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        [data-cv-theme="light"] .cv-action-bar button,
        [data-cv-theme="light"] .cv-action-bar select,
        [data-cv-theme="light"] .cv-download-btn {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #cbd5e1;
        }

        .cv-action-bar button:hover, .cv-action-bar select:hover, .cv-download-btn:hover {
          border-color: #fe8019;
          color: #fe8019;
        }

        .cv-action-bar button.btn-active {
          background: #fe8019;
          color: #1d2021;
          border-color: #fe8019;
          font-weight: bold;
        }

        .cv-action-bar button.btn-primary {
          background: #8ec07c;
          color: #1d2021;
          border-color: #8ec07c;
          font-weight: bold;
        }

        .cv-action-bar button.btn-danger {
          color: #fb4934;
          border-color: #fb4934;
        }

        .action-buttons {
          display: flex;
          gap: 0.4rem;
        }

        .cv-form-editor {
          max-width: 900px;
          margin: 1.5rem auto;
          background: #282828;
          border: 1px solid #3c3836;
          padding: 1.5rem;
          border-radius: 4px;
        }

        [data-cv-theme="light"] .cv-form-editor {
          background: #ffffff;
          border-color: #cbd5e1;
        }

        .cv-form-editor h2 {
          margin-top: 0;
          color: #fe8019;
          font-size: 1.2rem;
        }

        .editor-sub {
          color: #a89984;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        fieldset {
          border: 1px solid #3c3836;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 3px;
        }

        legend {
          color: #8ec07c;
          padding: 0 0.5rem;
          font-weight: bold;
          font-size: 0.85rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.8rem;
        }

        .form-grid label {
          display: block;
          font-size: 0.75rem;
          color: #a89984;
          margin-bottom: 0.2rem;
        }

        .form-grid input, textarea {
          width: 100%;
          background: #1d2021;
          border: 1px solid #3c3836;
          color: #ebdbb2;
          padding: 0.4rem 0.6rem;
          font-family: inherit;
          font-size: 0.85rem;
          border-radius: 2px;
        }

        [data-cv-theme="light"] .form-grid input,
        [data-cv-theme="light"] textarea {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
        }

        .cv-document-paper {
          max-width: 900px;
          margin: 2rem auto;
          background: #282828;
          border: 1px solid #3c3836;
          padding: 2.5rem 3rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          line-height: 1.5;
        }

        [data-cv-theme="light"] .cv-document-paper {
          background: #ffffff;
          border-color: #cbd5e1;
          color: #0f172a;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        [data-cv-theme="executive"] .cv-document-paper {
          background: #1e293b;
          border-color: #334155;
          color: #f1f5f9;
        }

        .doc-header {
          border-bottom: 2px solid #3c3836;
          padding-bottom: 1.2rem;
          margin-bottom: 1.5rem;
        }
        [data-cv-theme="light"] .doc-header { border-bottom-color: #e2e8f0; }

        .doc-header h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 900;
          color: #fbf1c7;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        [data-cv-theme="light"] .doc-header h1 { color: #0f172a; }

        .doc-subtitle {
          color: #fe8019;
          font-weight: 700;
          font-size: 0.95rem;
          margin-top: 0.3rem;
        }
        [data-cv-theme="light"] .doc-subtitle { color: #d65d0e; }

        .doc-contacts {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
          margin-top: 0.7rem;
          font-size: 0.85rem;
          color: #a89984;
        }
        [data-cv-theme="light"] .doc-contacts { color: #64748b; }
        .doc-contacts a { color: #8ec07c; text-decoration: none; }
        [data-cv-theme="light"] .doc-contacts a { color: #2563eb; }

        .doc-section { margin-bottom: 1.5rem; }

        .doc-section-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #fe8019;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-bottom: 1px solid #3c3836;
          padding-bottom: 0.25rem;
          margin-bottom: 0.8rem;
        }
        [data-cv-theme="light"] .doc-section-title { color: #1e3a8a; border-bottom-color: #e2e8f0; }

        .doc-summary { font-size: 0.92rem; color: #ebdbb2; line-height: 1.6; }
        [data-cv-theme="light"] .doc-summary { color: #334155; }

        .doc-item { margin-bottom: 1rem; }
        .doc-item-row { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; }
        .doc-bold { font-weight: 700; color: #fbf1c7; font-size: 0.95rem; }
        [data-cv-theme="light"] .doc-bold { color: #0f172a; }
        .doc-accent { color: #8ec07c; font-weight: 600; font-size: 0.9rem; }
        [data-cv-theme="light"] .doc-accent { color: #2563eb; }
        .doc-dim { color: #a89984; font-size: 0.85rem; }
        [data-cv-theme="light"] .doc-dim { color: #64748b; }
        .doc-small { font-size: 0.8rem; margin-top: 0.1rem; }

        .doc-subrow { font-size: 0.88rem; margin-top: 0.1rem; }

        .doc-desc { font-size: 0.88rem; margin-top: 0.25rem; }

        .doc-bullets { margin-top: 0.35rem; padding-left: 1.2rem; }
        .doc-bullets li { font-size: 0.88rem; margin-bottom: 0.25rem; }

        .doc-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem; }
        .doc-tag {
          font-size: 0.72rem;
          background: #1d2021;
          border: 1px solid #3c3836;
          color: #a89984;
          padding: 0.1rem 0.4rem;
          border-radius: 2px;
        }
        [data-cv-theme="light"] .doc-tag { background: #f1f5f9; border-color: #cbd5e1; color: #475569; }

        .doc-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .skill-box {
          background: #1d2021;
          border: 1px solid #3c3836;
          padding: 0.65rem 0.85rem;
          font-size: 0.85rem;
        }
        [data-cv-theme="light"] .skill-box { background: #f8fafc; border-color: #e2e8f0; }

        .skill-box-title {
          font-size: 0.78rem;
          font-weight: 800;
          color: #fe8019;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }
        [data-cv-theme="light"] .skill-box-title { color: #1e3a8a; }

        /* Print Override Rules */
        @media print {
          .no-print { display: none !important; }
          .cv-page-wrapper {
            background: white !important;
            color: black !important;
            padding: 0 !important;
          }
          .cv-document-paper {
            max-width: 100% !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .doc-header h1 { color: black !important; }
          .doc-subtitle { color: #1e3a8a !important; }
          .doc-section-title { color: #1e3a8a !important; border-bottom-color: #cbd5e1 !important; }
          .doc-bold { color: black !important; }
          .doc-accent { color: #2563eb !important; }
          .doc-dim { color: #475569 !important; }
          .doc-tag { background: #f1f5f9 !important; border-color: #cbd5e1 !important; color: #334155 !important; }
          .skill-box { background: #f8fafc !important; border-color: #e2e8f0 !important; }
          .skill-box-title { color: #1e3a8a !important; }
          
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      `}</style>
    </div>
  );
}
