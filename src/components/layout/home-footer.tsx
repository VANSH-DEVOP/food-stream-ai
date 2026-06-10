export default function HomeFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-black/95 backdrop-blur">
      <div className="flex flex-wrap items-center justify-center gap-8 px-6 py-4 text-sm text-zinc-400">

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-red-500 px-4 py-1 text-red-400">
            🍖 Non-Veg
          </span>
          <span>Non-Veg Dishes</span>
        </div>

        <div className="h-8 w-px bg-zinc-700" />

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-green-500 px-4 py-1 text-green-400">
            🌿 Veg
          </span>
          <span>Vegetarian Dishes</span>
        </div>

        <div className="h-8 w-px bg-zinc-700" />

        <div className="flex items-center gap-3">
          <span className="text-2xl">♡</span>
          <span>Save for Later</span>
        </div>

        <div className="h-8 w-px bg-zinc-700" />

        <div className="flex items-center gap-3">
          <button 
          aria-label="Add to cart button"
          type="button"
          className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-black">
            Add to Cart
          </button>
          <span>One-Click Ordering</span>
        </div>

      </div>
    </footer>
  );
}