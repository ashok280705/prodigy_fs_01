"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      router.push("/login");
    } else {
      alert(data.msg || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}