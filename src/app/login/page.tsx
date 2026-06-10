"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { login, signup, forgotPassword } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

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
            setError("No account found with this email.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password.");
            break;
          case "auth/email-already-in-use":
            setError("Email is already registered.");
            break;
          case "auth/weak-password":
            setError("Password must be at least 6 characters.");
            break;
          case "auth/invalid-credential":
            setError("Invalid email or password.");
            break;
          default:
            setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {

    if (!email.trim()) {
      setError(
        "Please enter your email first."
      );
      return;
    }

    try {

      await forgotPassword(email);

      setError(
        "Password reset email sent. Check your inbox."
      );

    } catch {

      setError(
        "Unable to send reset email."
      );

    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      {/* Background */}
      <div
        className="
          absolute
          inset-0
          bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')]
          bg-cover
          bg-center
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Gradient blobs */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-6">

        {/* Brand */}
        <div className="mb-12 text-center">

          <h1 className="text-6xl font-black tracking-tight">
            FoodStream
            <span className="text-orange-500">
              AI
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-300">
            Personalized food recommendations powered by
            behavioral analytics, profile intelligence,
            and generative AI.
          </p>

          {/* Feature Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <div className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm backdrop-blur-md">
              Personalized Recommendations
            </div>

            <div className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm backdrop-blur-md">
              Multi-Profile Ordering
            </div>

            <div className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm backdrop-blur-md">
              AI Food Assistant
            </div>

          </div>

        </div>

        {/* Auth Card */}
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/60
            p-8
            backdrop-blur-xl
            shadow-2xl
          "
        >

          {/* Toggle */}
          <div className="mb-8 flex rounded-xl bg-zinc-800 p-1">

            <button
              aria-label="Login button"
              type="button"
              onClick={() => {
                setIsSignup(false);
                setError("");
              }}
              className={`flex-1 rounded-lg py-2 font-medium transition ${
                !isSignup
                  ? "bg-orange-500 text-black"
                  : "text-zinc-400"
              }`}
            >
              Login
            </button>

            <button
            aria-label="Sign-up button"
            type="button"
              onClick={() => {
                setIsSignup(true);
                setError("");
              }}
              className={`flex-1 rounded-lg py-2 font-medium transition ${
                isSignup
                  ? "bg-orange-500 text-black"
                  : "text-zinc-400"
              }`}
            >
              Sign Up
            </button>

          </div>

          <div className="space-y-5">

            <input
              aria-label="Enter Email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-zinc-950/50
                p-4
                outline-none
                transition
                focus:border-orange-500
              "
            />

            <input
              aria-label="Enter Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-zinc-950/50
                p-4
                outline-none
                transition
                focus:border-orange-500
              "
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-orange-400 hover:text-orange-300"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
            aria-label="Continue button"
            type="button"
              onClick={handleAuth}
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-orange-500
                p-4
                font-bold
                text-black
                transition
                hover:bg-orange-400
                disabled:opacity-60
              "
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Continue"}
            </button>

          </div>

          <div className="mt-8 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
            Powered by Gemini AI, Firebase and Next.js
          </div>

        </div>

      </div>

    </main>
  );
}