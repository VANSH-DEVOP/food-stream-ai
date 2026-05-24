"use client";
import { useCartStore } from "@/store/cart-store";

interface FoodCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
}

export default function FoodCard({
  id,
  name,
  image,
  price,
  category,
}: FoodCardProps) {

    const addToCart =
        useCartStore(
        (state) => state.addToCart
    );

  return (
    <div className="min-w-[250px] overflow-hidden rounded-2xl bg-zinc-900 transition hover:scale-105">
      <img
        src={image}
        alt={name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {name}
          </h2>

          <span
            className={`rounded-full px-2 py-1 text-xs ${
              category === "Veg"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {category}
          </span>
        </div>

        <p className="mt-2 text-orange-500">
          ₹{price}
        </p>

        <button className="mt-4 w-full rounded-lg bg-orange-500 p-2 font-semibold text-black transition hover:bg-orange-400"
            onClick={() =>
                addToCart({
                id,
                name,
                image,
                price,
                })
            }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}