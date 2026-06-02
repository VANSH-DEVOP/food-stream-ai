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

        <p className="mt-4 max-w-2xl text-xl text-zinc-300">
          AI recommendations based on your
          taste profile, favorites, and
          order history.
        </p>

        <button
          onClick={() => {
            document
              .getElementById("recommendations")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
          className="mt-6 rounded-xl bg-orange-500 px-8 py-4 text-xl font-bold text-black transition hover:bg-orange-400"
        >
          Order Now
        </button>
      </div>
    </section>
  );
}