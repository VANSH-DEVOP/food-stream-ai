"use client";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const items = useCartStore(
  (state) => state.items
  );

  const totalItems = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );
  const toggleCart = useUIStore(
    (state) => state.toggleCart
  );

  const setUser = useAuthStore(
  (state) => state.setUser
  );

  const setSelectedProfile =
  useAuthStore(
    (state) =>
      state.setSelectedProfile
  );

  const router = useRouter();

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const toggleFilter = useUIStore(
    (state) => state.toggleFilter
  );

  async function handleLogout() {
    await signOut(auth);

    setUser(null);

    setSelectedProfile(null);

    clearCart();
    router.push("/login");
  }
  return (
    <nav className="fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b border-zinc-800 bg-black/80 px-6 py-4 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-orange-500">
        FoodStream AI
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            router.push("/profiles")
          }
          className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
        >
          Profiles
        </button>

        <button
          onClick={toggleFilter}
          className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
        >
          Filters
        </button>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}