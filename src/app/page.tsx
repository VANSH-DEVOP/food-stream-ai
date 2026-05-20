import Navbar from "../components/layout/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="p-10">
        <h1 className="text-5xl font-bold">
          Welcome to FoodStream AI
        </h1>

        <p className="mt-4 text-zinc-400">
          AI-powered personalized food platform
        </p>
      </section>
    </main>
  );
}