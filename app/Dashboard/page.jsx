"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/70 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">🎉 Welcome to Your Dashboard</h1>
        <p className="text-gray-700 text-lg mb-6">This page is protected. You’ve successfully logged in!</p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}