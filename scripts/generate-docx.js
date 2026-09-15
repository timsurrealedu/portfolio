const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ImageRun,
} = require("docx");

const cvData = require("../cv-data.json");

const COLOR_TEXT = "000000";
const COLOR_MUTED = "333333";
const COLOR_LINE = "000000";

function createHeaderTable() {
  const headshotPath = path.join(__dirname, "../public/timothy-headshot.png");
  let imageRun = null;

  if (fs.existsSync(headshotPath)) {
    const imageBuffer = fs.readFileSync(headshotPath);
    imageRun = new ImageRun({
      data: imageBuffer,
      transformation: {
        width: 110,
        height: 110,
      },
    });
  }

  const nameCell = new TableCell({
    width: { size: 75, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    children: [
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: "TIMOTHY SEBASTIAN",
            bold: true,
            size: 34, // 17pt
            color: COLOR_TEXT,
            font: "Arial",
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "DARMAWAN",
            bold: true,
            size: 34, // 17pt
            color: COLOR_TEXT,
            font: "Arial",
          }),
        ],
      }),
    ],
  });

  const photoCell = new TableCell({
    width: { size: 25, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: imageRun ? [imageRun] : [],
      }),
    ],
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    rows: [new TableRow({ children: [nameCell, photoCell] })],
  });
}

function createHeading(titleText) {
  return new Paragraph({
    spacing: { before: 150, after: 70 },
    children: [
      new TextRun({
        text: titleText.toUpperCase(),
        bold: true,
        size: 19, // 9.5pt
        color: COLOR_TEXT,
        font: "Arial",
      }),
    ],
  });
}

function createLeftColumnChildren() {
  const children = [
    createHeading("ABOUT ME"),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: "Cyber Security student at Bina Nusantara University combining practical depth in AppSec, DevSecOps, and Linux infrastructure with advanced hands-on expertise in LLM agent harnesses, prompt caching economics, and AI orchestration. Experienced in building full-stack B2B SaaS platforms (ReviewTap), developing threat detection engines (Nolen), operating self-hosted cloud systems (Noema), engineering production corporate web systems (Terang Darma Jaya), and leading technical teams.",
          size: 17,
          color: COLOR_TEXT,
          font: "Arial",
        }),
      ],
    }),
    createHeading("EXPERIENCES & PROJECTS"),

    new Paragraph({
      spacing: { before: 70, after: 25 },
      children: [
        new TextRun({ text: "2025 — 2026 Featured Engineering Platforms", bold: true, size: 18, color: COLOR_TEXT, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "ReviewTap (B2B SaaS): ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Architected NFC/QR Google review platform with sub-second (<1s) dynamic redirect engine, merchant dashboards, and Supabase PostgreSQL (RLS).", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "Nolen Lead: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Authored threat model, telemetry security requirements, detection rules (MITRE ATT&CK), SSH correlation engine; passed 52 tests and 6 offline scenarios.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "Terang Darma Jaya: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Designed and built production corporate website (terangdarmajaya.com), custom UI animations, and Google Tag Manager telemetry.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "Noema & LifeOS: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Self-hosted workspace (Next.js PWA, SQLite, background jobs, Bubblewrap sandbox, Tailscale mesh).", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "SmartWarga & GuruAI: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "RT/RW governance platform with dues verification queue (Next.js); Kurikulum Merdeka pedagogical AI co-pilot.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 70 },
      children: [
        new TextRun({ text: "CTF Competition & Sentinel: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Autonomous CTF orchestration agent skill with compaction recovery; developer-oriented vulnerability & secret scanner.", size: 17, font: "Arial" }),
      ],
    }),

    new Paragraph({
      spacing: { before: 50, after: 25 },
      children: [
        new TextRun({ text: "Organizational & Leadership Experience", bold: true, size: 18, color: COLOR_TEXT, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "Head of Committee / PIC (BNCC HRD): ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Led a 6-person team managing the 3-week ADP Adobe After Effects Program (Jul—Aug 2026).", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "Backend Dev (BNCC TPM Final Project): ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Engineered auth, dashboard, and Prisma ORM services for a hackathon platform (Feb 2026).", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 25 },
      children: [
        new TextRun({ text: "Activist of BNCC (R&D / HRD): ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Backend APIs and DevSecOps CI/CD proposal (GitHub Actions, SonarCloud, Trivy).", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 70 },
      children: [
        new TextRun({ text: "Campus Communities: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Google Developer Groups on Campus (GDG), Cyber Security Community (CSC), ISACA Student Group (ISG), PO.", size: 17, font: "Arial" }),
      ],
    }),

    createHeading("CONTACT"),
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({ text: "📞 +62 877 7717 9775", bold: true, size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({ text: "✉️ td522637@gmail.com", bold: true, size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({ text: "📸 @timsurreal", bold: true, size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({ text: "🌐 github.com/timsurrealedu", bold: true, size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({ text: "📍 Jakarta, Indonesia", bold: true, size: 17, font: "Arial" }),
      ],
    }),
  ];

  return children;
}

function createRightColumnChildren() {
  const children = [
    createHeading("EDUCATION"),

    new Paragraph({
      spacing: { before: 50, after: 15 },
      children: [
        new TextRun({ text: "• 2025 ~ Expected 2029", bold: true, size: 18, color: COLOR_TEXT, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 15 },
      children: [
        new TextRun({ text: "Bina Nusantara University", bold: true, size: 18, color: COLOR_TEXT, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 90 },
      children: [
        new TextRun({ text: "B.Sc. in Cyber Security (Specialization in AppSec, Systems & AI Tooling)", size: 17, color: COLOR_MUTED, font: "Arial" }),
      ],
    }),

    new Paragraph({
      spacing: { before: 35, after: 15 },
      children: [
        new TextRun({ text: "• 2022 - 2025", bold: true, size: 18, color: COLOR_TEXT, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 15 },
      children: [
        new TextRun({ text: "SMAK 1 BPK Penabur Jakarta", bold: true, size: 18, color: COLOR_TEXT, font: "Arial" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({ text: "High School Diploma, Science Major (IELTS Band 8.0)", size: 17, color: COLOR_MUTED, font: "Arial" }),
      ],
    }),

    createHeading("SKILLS & CAPABILITIES"),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 45 },
      children: [
        new TextRun({ text: "AI Engineering & Agent Harnesses: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Reasonix, Claude Code, Codex, prompt caching optimization, token economics, custom agent skills, model evaluation across Western & Chinese frontier models.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 45 },
      children: [
        new TextRun({ text: "Full-Stack & Web Platforms: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "TypeScript, Next.js 15, TailwindCSS v4, Node.js, Express, Prisma ORM, Supabase PostgreSQL (RLS), dynamic redirect engines, Google Tag Manager.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 45 },
      children: [
        new TextRun({ text: "Security & DevSecOps: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "AppSec threat modeling, MITRE ATT&CK, detection engineering, secret scanning, Trivy, SonarCloud, GitHub Actions CI/CD.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 45 },
      children: [
        new TextRun({ text: "Systems & Self-Hosting: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Linux (Arch Linux, NixOS, Fedora), system admin, Oracle Cloud (OCI), Tailscale mesh, Syncthing, Bubblewrap sandbox.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 45 },
      children: [
        new TextRun({ text: "Leadership & Communication: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "Team management, program planning, technical workshops, public speaking, SWOT analysis.", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 45 },
      children: [
        new TextRun({ text: "Languages: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "English (IELTS Band 8.0 — Professional), Indonesian (Native), Mandarin (Basic).", size: 17, font: "Arial" }),
      ],
    }),
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 45 },
      children: [
        new TextRun({ text: "Certifications: ", bold: true, size: 17, font: "Arial" }),
        new TextRun({ text: "ISACA ARISE IT Audit (2026), BNCC TPM Back-End (2026), IT FAIR XIV UI/UX Competition (2026).", size: 17, font: "Arial" }),
      ],
    }),
  ];

  return children;
}

function createBodyTable() {
  const leftCell = new TableCell({
    width: { size: 56, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.SINGLE, size: 12, color: COLOR_LINE },
    },
    margins: { right: 180 },
    children: createLeftColumnChildren(),
  });

  const rightCell = new TableCell({
    width: { size: 44, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    margins: { left: 180 },
    children: createRightColumnChildren(),
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    rows: [new TableRow({ children: [leftCell, rightCell] })],
  });
}

function createHorizontalRule() {
  return new Paragraph({
    spacing: { before: 70, after: 70 },
    border: {
      bottom: {
        color: COLOR_LINE,
        space: 2,
        style: BorderStyle.SINGLE,
        size: 12,
      },
    },
  });
}

async function main() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 440,    // 0.30 in
              bottom: 440,
              left: 440,
              right: 440,
            },
          },
        },
        children: [
          createHorizontalRule(),
          createHeaderTable(),
          createHorizontalRule(),
          createBodyTable(),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, "../CV_Timothy_Sebastian_Darmawan.docx");
  fs.writeFileSync(outputPath, buffer);
  const publicPath = path.join(__dirname, "../public/CV_Timothy_Sebastian_Darmawan.docx");
  fs.writeFileSync(publicPath, buffer);
  console.log(`✅ Successfully generated 2-column DOCX with TDJ and ReviewTap at: ${outputPath}`);
}

main().catch(console.error);
