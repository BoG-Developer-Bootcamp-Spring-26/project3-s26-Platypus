import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import CornerDecoration from '@/components/CornerDecoration';
import TitleBar from '@/components/TitleBar';

export default function Login() {
  const router = useRouter();
  const { saveUser } = useUser();
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
        saveUser({
          id: data.id,
          fullName: data.fullName,
          isAdmin: data.admin
        });
        router.push('/animals'); // ***ROUTE THIS TO TRAINING LOGS PAGE***
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
    <div className="relative flex flex-col min-h-screen bg-white">
      <TitleBar />
      <main className="flex grow flex-col items-center justify-center z-10 px-4">
        <div
          className="w-full flex flex-col items-center"
          style={{ maxWidth: '43.8125rem'}}
        >
          <h1
            className="font-bold text-center mb-8"
            style={{ fontSize: '3.5rem', lineHeight: '1.34'}}>Login</h1>
          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col"
            style={{ gap: '0' }}
          >
            <div
              className="w-full flex flex-col"
              style={{ gap: '1rem', marginBottom: '1rem' }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-base placeholder-gray-500"
                style={{
                  border: '2.5px solid #D21312',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '2.5px solid #D21312',
                  padding: '0.5rem 0.25rem',
                  fontSize: '1rem',
                  color: '#1a1a1a',
                }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-base placeholder-gray-500"
                style={{
                  border: '2.5px solid #D21312',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '2.5px solid #D21312',
                  padding: '0.5rem 0.25rem',
                  fontSize: '1rem',
                  color: '#1a1a1a',
                }}
                required
              />
            </div>
 
            {error && (
              <p
                className="text-center font-bold mb-2"
                style={{ color: '#D21312' }}
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full text-white font-bold transition-opacity hover:opacity-90 active:opacity-80"
              style={{
                backgroundColor: '#D21312',
                height: '4.375rem',
                borderRadius: '1.25rem',
                fontSize: '1.8rem',
                marginTop: '1.5rem',
                letterSpacing: '0.01em',
              }}
            >Log in</button>
            <div
              className="text-center"
              style={{
                marginTop: '1.25rem',
                fontSize: '1rem',
                height: '2.3125rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a1a1a',
              }}
            >Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-bold hover:underline ml-1"
                style={{ color: '#1a1a1a' }}
              >Sign up</Link>
            </div>
          </form>
        </div>
      </main>
      <footer
        className="text-center z-10"
        style={{
          color: '#6b7280',
          paddingBottom: '1.5rem',
          paddingTop: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <p>Made with ♡ by Long Lam</p>
        <p>© 2023 BOG Developer Bootcamp. All rights reserved.</p>
      </footer>
      <CornerDecoration />
    </div>
  );
}
