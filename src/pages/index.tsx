import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CornerDecoration from '@/components/CornerDecoration';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('api/user/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('isAdmin', String(data.admin));

        router.push('/training'); // ***ROUTE THIS TO TRAINING LOGS PAGE***
      } else {
        const r = await response.json();
        if (r.error === "Invalid Username") {
          setError("Please create an account first.");
        } else {
          setError("Login failed. Please Try again.");
        }
      }
    } catch (err) {
      setError("An error occurred");
    }

  };

  return (
    <div className="relative flex flex-col h-screen bg-white">
      <main className="flex grow flex-col items-center justify-center z-10 px-4">
        <h1 className="text-[4rem] font-bold mb-16">Login</h1>
        <form onSubmit={handleLogin} className="w-full max-w-lg flex flex-col gap-6">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-red-600 p-2 text-xl outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 border-red-600 p-2 text-xl outline-none"
            required
          />

          {error && <p className="text-red-600 text-center font-bold">{error}</p>}

          <button
            type="submit"
            className="bg-red-600 text-white font-bold text-xl py-4 rounded-2xl mt-4 hover:bg-red-700"
          >
            Log in
          </button>

          <div className="text-center text-lg mt-2">
            Don't have an account?{' '}
            <Link href="/signup" className="font-bold hover:underline">
              Sign up
            </Link>
          </div>

        </form>

      </main>
      <footer className="text-center text-gray-500 py-6 z-10">
        <p>Made with ♡ by Long Lam</p>
        <p>© 2023 BOG Developer Bootcamp. All rights reserved.</p>
      </footer>

      <CornerDecoration />

    </div>
  );
}
