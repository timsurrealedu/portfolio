import type { Metadata } from "next";
import { CvEditor } from "@/components/cv-editor";

export const metadata: Metadata = {
  title: "Timothy Sebastian Darmawan — Editable Professional CV",
  description: "Interactive and editable professional CV of Timothy Sebastian Darmawan. Export to PDF, Markdown, or JSON.",
};

export default function CvPage() {
  return <CvEditor />;
}
