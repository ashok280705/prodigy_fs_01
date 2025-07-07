"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      console.error("Invalid JSON response");
    }

    if (res.ok) {
      alert(data.msg); // shows "Login successful"
      localStorage.setItem("token", data.token);
      router.push("/Dashboard");
    } else {
      alert(data.msg || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      console.error("Invalid JSON response");
    }

    if (res.ok) {
      alert("Signup successful");
      router.push("/Dashboard");
    } else {
      alert(data.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d1c4e9] via-[#f8bbd0] to-[#ffe0b2] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/40">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">
          🔐 Prodigy
        </h1>

        {isSignup ? (
          <>
            <p className="text-center text-gray-600 mb-6">
              Welcome! Create an account
            </p>
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition-all font-semibold text-lg"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-500">
              Already have an account?{" "}
              <span
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
                onClick={() => setIsSignup(false)}
              >
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-6">
              Welcome back! Please login to continue
            </p>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition-all font-semibold text-lg"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-500">
              Don’t have an account?{" "}
              <span
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
