import { getTopicById } from "@/lib/blueprint-engine";
import { notFound } from "next/navigation";
import BlueprintDetailClient from "./BlueprintDetailClient";

export default function BlueprintTopicPage({
  params,
}: {
  params: { topicId: string };
}) {
  const topic = getTopicById(params.topicId);

  if (!topic) {
    notFound();
  }

  return <BlueprintDetailClient topic={topic} />;
}
