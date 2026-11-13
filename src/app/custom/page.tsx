import { Suspense } from "react";
import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { CustomProjectClient } from "./CustomProjectClient";

export const metadata: Metadata = {
  title: { absolute: `Done-For-You Software & Startup MVP Studio | ${CONSTANTS.APP_NAME}` },
  description: `Built for non-coders, startup founders, and students. Tell us your software or startup idea in plain words — our senior engineers design, code, test, and deliver 100% working software in 48-72 hours. Complete source code, documentation, and 1-on-1 walkthrough. Starts ₹1,999 (~$24 USD).`,
  keywords: [
    "build software without coding",
    "done for you software development",
    "software for non coders",
    "build startup mvp non technical founder",
    "hire engineers to build my idea",
    "custom software development for non coders",
    "custom engineering projects",
    "custom final year projects",
    "build my project idea",
    ...CONSTANTS.SEO_KEYWORDS,
  ],
  alternates: { canonical: "/custom" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${CONSTANTS.APP_URL}/custom`,
    title: `Done-For-You Software & Startup MVP Studio | ${CONSTANTS.APP_NAME}`,
    description: `Built for non-coders, founders, and students. We design, code, and deliver 100% working custom software and startup MVPs in 48-72 hours with zero coding required. Starts ₹1,999.`,
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
