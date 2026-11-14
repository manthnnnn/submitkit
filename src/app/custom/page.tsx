import { Suspense } from "react";
import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { CustomProjectClient } from "./CustomProjectClient";

export const metadata: Metadata = {
  title: { absolute: `Custom College Projects & Startup Ideas Studio | ${CONSTANTS.APP_NAME}` },
  description: `Built for college engineering students, non-coders, and startup founders. Tell us your approved college topic or startup software idea in plain words — our senior engineers design, code, test, and deliver 100% working software with IEEE Black Book reports (.docx) and 1-click execution in 48-72 hours. Starts ₹1,999 (~$24 USD).`,
  keywords: [
    "custom college engineering project",
    "custom final year engineering project",
    "build my college project idea",
    "ieee black book custom project",
    "build software without coding",
    "done for you software development",
    "software for non coders",
    "build startup for non technical founders",
    "hire engineers to build my idea",
    "custom software development for non coders",
    ...CONSTANTS.SEO_KEYWORDS,
  ],
  alternates: { canonical: "/custom" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${CONSTANTS.APP_URL}/custom`,
    title: `Custom College Projects & Startup Ideas Studio | ${CONSTANTS.APP_NAME}`,
    description: `Built for college students, non-coders, and founders. We design, code, and deliver 100% working custom software with IEEE reports and 1-click execution in 48-72 hours. Starts ₹1,999.`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function CustomProjectPage() {
  return (
    <Suspense fallback={null}>
      <CustomProjectClient />
    </Suspense>
  );
}
