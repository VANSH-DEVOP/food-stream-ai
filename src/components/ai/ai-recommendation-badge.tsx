"use client";

import {
  useAIExplanation,
} from "@/hooks/useAIExplanation";

interface Props {
  foodName: string;
  reasons: string[];
}

export default function
AIRecommendationBadge({
  foodName,
  reasons,
}: Props) {

  const {
    explanation,
    loading,
  } =
    useAIExplanation(
      foodName,
      reasons
    );

  return (
    <div className="mt-2 rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">

      <p className="mb-1 text-sm font-bold text-orange-400">
        AI Recommendation
      </p>

      <p className="text-sm text-zinc-300">

        {loading
          ? "Generating recommendation..."
          : explanation}

      </p>

    </div>
  );
}