import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 py-10">
      <div className="mx-auto max-w-6xl px-6">

        <h2 className="text-2xl font-bold text-orange-500">
          FoodStream AI
        </h2>

        <p className="mt-3 max-w-md text-sm text-zinc-400">
          Personalized food recommendations powered by
          profile-based analytics and ordering patterns.
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full bg-zinc-800 px-3 py-1">
                Personalized Recommendations
            </span>

            <span className="rounded-full bg-zinc-800 px-3 py-1">
                Multi-Profile Support
            </span>

            <span className="rounded-full bg-zinc-800 px-3 py-1">
                Food Analytics
            </span>
        </div>

        <div className="mt-6 flex gap-6 text-sm text-zinc-400">
            <Link 
            href="/home"
            className="transition hover:text-orange-500"
            >
                Home
            </Link>
            <Link 
            href="/orders"
            className="transition hover:text-orange-500"
            >
                Orders
            </Link>
            <Link 
            href="/profiles"
            className="transition hover:text-orange-500"
            >
                Profiles
            </Link>
        </div>

        <div className="mt-6 text-sm text-zinc-500">
          Built with Next.js • TypeScript • Firebase
        </div>

        <div className="mt-4 text-xs text-zinc-600">
          © 2026 FoodStream AI
        </div>

      </div>
    </footer>
  );
}