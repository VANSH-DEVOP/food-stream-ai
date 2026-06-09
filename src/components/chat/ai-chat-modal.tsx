"use client";

import { useState } from "react";

import { askAI } from "@/services/ai-chat-client";

import { useCartStore }
from "@/store/cart-store";

import {
  FoodItem,
  UserProfile,
} from "@/types";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  foods: FoodItem[];

  profile: UserProfile;
}

type AIAction = {
  type: "add_to_cart";
  foodId: string;
  quantity: number;
} | null;

export default function AIChatModal({
  isOpen,
  onClose,
  foods,
  profile,
}: Props) {

  const [
    question,
    setQuestion,
  ] = useState("");

  const addToCart =
  useCartStore(
    (state) => state.addToCart
  );

  const [
    response,
    setResponse,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    action,
    setAction,
  ] = useState<AIAction>(
    null
  );

  const [
    lastRecommendedFood,
    setLastRecommendedFood,
  ] = useState<FoodItem | null>(
    null
  );

  if (!isOpen) {
    return null;
  }

  async function handleAsk() {

    if (!question.trim()) {
      return;
    }

    try {

      setLoading(true);

      const lowerQuestion =
      question
        .toLowerCase()
        .trim();

      const contextualCommands = [
        "order that",
        "order this",
        "add that",
        "add this",
        "order it",
        "add it",
        "i'll take that",
        "sounds good",
      ];

      if (
        contextualCommands.some(
          command =>
            lowerQuestion.includes(
              command
            )
        )
      ) {

        if (
          lastRecommendedFood
        ) {

          addToCart({
            ...lastRecommendedFood,
            profileId: profile.id,
            profileName: profile.name,
          });

          setResponse(
            `I've added ${lastRecommendedFood.name} to your cart.`
          );

          return;
        }
      }

      const answer =
        await askAI(
          question,
          foods,
          profile
        );


      const matchedFood =
      foods.find(
        food =>
          answer.response
            ?.toLowerCase()
            .includes(
              food.name.toLowerCase()
            )
      );

      if (
  answer.action?.type ===
  "add_to_cart"
) {

  const food =
    foods.find(
      item =>
        item.id ===
        answer.action.foodId
    );

  if (food) {

    addToCart({
      ...food,
      profileId: profile.id,
      profileName: profile.name,
    });

    setLastRecommendedFood(
      food
    );
  }
}

      if (
        matchedFood &&
        !answer.action
      ) {
        setLastRecommendedFood(
          matchedFood
        );
      }
        console.log(
          "CHATBOT RESULT:",
          answer
        );
      setResponse(answer.response);
      setAction(
        answer.action
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">

      <div className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 text-white">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-orange-500">
            🤖 FoodStream AI
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="mb-4 flex flex-wrap gap-2">

          <button
            onClick={() =>
              setQuestion(
                "Suggest dinner under ₹300"
              )
            }
            className="rounded-lg bg-zinc-800 px-3 py-2 text-sm"
          >
            Under ₹300
          </button>

          <button
            onClick={() =>
              setQuestion(
                "Recommend something spicy"
              )
            }
            className="rounded-lg bg-zinc-800 px-3 py-2 text-sm"
          >
            Spicy
          </button>

          <button
            onClick={() =>
              setQuestion(
                `What should ${profile.name} order today?`
              )
            }
            className="rounded-lg bg-zinc-800 px-3 py-2 text-sm"
          >
            For {profile.name}
          </button>

        </div>

        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Ask FoodStream AI..."
          className="mb-4 h-28 w-full rounded-lg bg-zinc-800 p-3 outline-none"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="mb-4 w-full rounded-lg bg-orange-500 p-3 font-semibold text-black"
        >
          {loading
            ? "Thinking..."
            : "Ask AI"}
        </button>

        {response && (
          <div className="max-h-[300px] overflow-y-auto rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">

            <p className="whitespace-pre-wrap text-zinc-200">
              {response}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}