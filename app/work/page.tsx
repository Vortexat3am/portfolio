import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";
import Footer from "@/components/Footer";

const TITLE = "Work — Romeo Culp";
const DESCRIPTION =
  "The full archive of Romeo Culp's work — concept websites, fan art, posters, and brand identity projects.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function WorkPage() {
  return (
    <main>
      <WorkGrid />
      <Footer />
    </main>
  );
}
