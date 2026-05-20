export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
      <h1 className="text-2xl font-bold text-orange-500">
        FoodStream AI
      </h1>

      <button className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700">
        Profile
      </button>
    </nav>
  );
}