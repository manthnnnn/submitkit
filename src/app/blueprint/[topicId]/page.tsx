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
  return {
    title: `${topic.title} — Project Blueprint | SubmitKit`,
    description: topic.tagline || topic.whatItDoes,
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
