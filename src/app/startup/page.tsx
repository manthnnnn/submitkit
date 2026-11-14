import { Suspense } from "react";
import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { CustomProjectClient } from "../custom/CustomProjectClient";

export const metadata: Metadata = {
  title: { absolute: `Execute Your Startup Idea | End-to-End Software Studio | ${CONSTANTS.APP_NAME}` },
  description: `Built for non-technical founders, entrepreneurs, and visionaries. Tell us your startup idea, SaaS concept, or web platform in plain words — senior engineers design, code, test, and deliver production software with 100% intellectual property ownership in 48–72 hours. Starts ₹1,999 (~$24 USD).`,
  keywords: [
    "execute startup idea",
    "software for non coders",
    "build startup without coding",
    "hire engineers to build my idea",
    "done for you software development",
    "saas development for founders",
    "turn idea into reality software",
    ...CONSTANTS.SEO_KEYWORDS,
  ],
  alternates: { canonical: "/startup" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${CONSTANTS.APP_URL}/startup`,
    title: `Execute Your Startup Idea | End-to-End Software Studio | ${CONSTANTS.APP_NAME}`,
    description: `Turn your software or SaaS concept into working reality with 100% IP rights and production code in 48–72 hours. Starts ₹1,999.`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function StartupPage() {
  return (
    <Suspense fallback={null}>
      <CustomProjectClient initialMode="startup" />
    </Suspense>
  );
}
