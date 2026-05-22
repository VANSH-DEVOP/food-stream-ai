export default function HeroBanner() {
  return (
    <section className="relative h-[500px] overflow-hidden rounded-3xl">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Hero Food"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute bottom-10 left-10">
        <h1 className="text-6xl font-bold">
          Discover Your Next Meal
        </h1>

        <p className="mt-4 max-w-xl text-zinc-300">
          Personalized AI-powered food
          recommendations just for you.
        </p>

        <button className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-lg font-semibold text-black transition hover:bg-orange-400">
          Order Now
        </button>
      </div>
    </section>
  );
}