import {
  useEffect,
  useState,
} from "react";

import {
  getAIExplanation,
} from "@/services/ai-client-service";

export function useAIExplanation(
  foodName: string,
  reasons: string[]
) {

  const [
    explanation,
    setExplanation,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const result =
          await getAIExplanation(
            foodName,
            reasons
          );

        setExplanation(
          result
        );

      } finally {

        setLoading(false);

      }
    }

    if (
      reasons.length > 0
    ) {
      load();
    }

  }, [
    foodName,
    reasons,
  ]);

  return {
    explanation,
    loading,
  };
}