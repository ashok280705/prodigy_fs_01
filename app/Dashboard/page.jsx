"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This page is protected.</p>
    </div>
  );
}