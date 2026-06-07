"use client";

import {
  useAIInsight,
} from "@/hooks/useAIInsight";

interface Props {
  foods: {
    name: string;
    reasons?: string[];
  }[];
}

export default function AIInsights({
  foods,
}: Props) {

  const {
    insight,
    loading,
  } =
    useAIInsight(
      foods
    );

  return (
    <div className="mb-8 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">

      <h2 className="mb-3 text-2xl font-bold text-orange-400">
         AI Insight
      </h2>

      <p className="text-zinc-300">

        {loading
          ? "Analyzing your preferences..."
          : insight}

      </p>

    </div>
  );
}