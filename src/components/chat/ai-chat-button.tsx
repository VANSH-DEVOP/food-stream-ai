"use client";

interface Props {
  onClick: () => void;
}

export default function AIChatButton({
  onClick,
}: Props) {

  return (
    <button
    aria-label="Ai chat button"
    type="button"
    onClick={onClick}
    className="
        fixed
        bottom-40
        right-6
        z-50
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-orange-500
        text-2xl
        shadow-lg
        transition
        hover:scale-105
        hover:bg-orange-400
    "
    >
    🤖
    </button>
  );
}