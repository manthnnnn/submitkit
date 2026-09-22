import { Metadata } from "next";
import { CONSTANTS } from "@/lib/constants";
import { CustomProjectClient } from "./CustomProjectClient";

export const metadata: Metadata = {
  title: { absolute: `Custom Final Year Project — Built for You | ${CONSTANTS.APP_NAME}` },
  description: `Can't find your exact topic? We build custom final year projects from scratch. Working source code + IEEE Black Book report + PPT + Viva Q&A. Custom Mini from ₹1,999. Delivered in 3-5 days. CSE AIML IoT FullStack Cybersecurity.`,
  keywords: [
    "custom final year project india",
    "custom engineering project with source code",
    "custom ieee project report",
    "final year project built for you",
    "custom project cse aiml",
    "btech custom project service",
    ...CONSTANTS.SEO_KEYWORDS,
  ],
  alternates: { canonical: "/custom" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${CONSTANTS.APP_URL}/custom`,
    title: `Custom Final Year Project — Built for You | ${CONSTANTS.APP_NAME}`,
    description: `We build your exact project from scratch. Working code + IEEE Report + PPT + Viva Q&A. Custom Mini ₹1,999 / Major ₹2,999.`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function CustomProjectPage() {
  return <CustomProjectClient />;
}
