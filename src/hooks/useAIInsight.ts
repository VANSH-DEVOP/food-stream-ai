import {
  useEffect,
  useState,
} from "react";

import {
  getAIInsight,
} from "@/services/ai-client-service";

export function useAIInsight(
  foods: {
    name: string;
    reasons?: string[];
  }[]
) {

  const [
    insight,
    setInsight,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const foodKey =
  JSON.stringify(
    foods.map(
      (food) => food.name
    )
  );

  useEffect(() => {

    async function load() {

      try {

        const result =
          await getAIInsight(
            foods
          );

        setInsight(
          result
        );

      } finally {

        setLoading(false);

      }
    }

    if (
      foods.length > 0
    ) {
      load();
    }

  }, [foodKey]);

  return {
    insight,
    loading,
  };
}