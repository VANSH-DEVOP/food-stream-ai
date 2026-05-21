"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { login, signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const router = useRouter();
  const user = useAuthStore(
    (state) => state.user
  );

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/profiles");
    }
  }, [user, router]);

  async function handleAuth() {
    try {
      setLoading(true);
      setError("");

      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }

      router.push("/profiles");
    } catch (error) {
        console.error(error);

        if (error instanceof FirebaseError) {
            switch (error.code) {
            case "auth/invalid-email":
                setError("Please enter a valid email.");
                break;

            case "auth/user-not-found":
                setError(
                "No account found with this email."
                );
                break;

            case "auth/wrong-password":
                setError("Incorrect password.");
                break;

            case "auth/email-already-in-use":
                setError(
                "Email is already registered."
                );
                break;

            case "auth/weak-password":
                setError(
                "Password must be at least 6 characters."
                );
                break;

            case "auth/invalid-credential":
                setError(
                "Invalid email or password."
                );
                break;

            default:
                setError(
                "Something went wrong. Please try again."
                );
        }
    } else {
        setError(
        "Unexpected error occurred."
        );
    }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-6 text-3xl font-bold">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none"
          />

          {error && (
            <p className="text-sm text-red-500">
                {error}
            </p>
           )}

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 p-3 font-semibold text-black transition hover:bg-orange-400"
          >
            {loading
              ? "Loading..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>

          <button
            onClick={() =>
              setIsSignup(!isSignup)
            }
            className="w-full text-sm text-zinc-400"
          >
            {isSignup
              ? "Already have an account?"
              : "Create a new account"}
          </button>
        </div>
      </div>
    </main>
  );
}