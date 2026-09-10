import { getTopicById } from "@/lib/blueprint-engine";
import { notFound } from "next/navigation";
import BlueprintDetailClient from "./BlueprintDetailClient";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicId: string }>;
}): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopicById(topicId);
  if (!topic) return { title: "Topic Not Found | SubmitKit" };
  const title = `${topic.title} — Free Project Blueprint | SubmitKit`;
  const description = topic.tagline || topic.whatItDoes;
  return {
    title,
    description,
    keywords: [
      topic.title,
      topic.category,
      "project blueprint",
      "final year project",
      "viva defense",
      "source code",
      "college project",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://submitkit.in/blueprint/${topic.id}`,
      siteName: "SubmitKit",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlueprintTopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);

  if (!topic) {
    notFound();
  }

  return <BlueprintDetailClient topic={topic} />;
}
