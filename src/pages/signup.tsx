import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useUser } from "@/hooks/useUser";
import CornerDecoration from "@/components/CornerDecoration";
import TitleBar from "@/components/TitleBar";

export default function SignUp() {
    const router = useRouter();
    const { saveUser } = useUser();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password, admin: isAdmin }),
            });
            const data = await response.json();
            if (response.ok) {
                saveUser({
                    id: data.user._id,
                    fullName: data.user.fullName,
                    isAdmin: data.user.admin
                });
                router.push('/training');
            } else {
                setError(data.error || "Failed to create an account.");
            }
        } catch (err) {
            setError("An error occurred. Please Try Again.");
        }
    };

    return (
    <div className="relative flex flex-col min-h-screen bg-white">
        <TitleBar />
        <main className="flex grow flex-col items-center justify-center z-10 px-4">
            <div className="w-full flex flex-col items-center" style={{ maxWidth: '38.8125rem' }}>
                <h1 className="font-bold text-center mb-8" style={{ fontSize: '3.5rem', lineHeight: '1.34' }}>Create Account</h1>

                <form onSubmit={handleSignUp} className="w-full flex flex-col" style={{ gap: '1rem' }}>
                    <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder-gray-500"
                    style={{ borderBottom: '2.5px solid #D21312', padding: '0.5rem 0.25rem', fontSize: '1rem', color: '#1a1a1a' }}
                    required
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder-gray-500"
                    style={{ borderBottom: '2.5px solid #D21312', padding: '0.5rem 0.25rem', fontSize: '1rem', color: '#1a1a1a' }}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder-gray-500"
                    style={{ borderBottom: '2.5px solid #D21312', padding: '0.5rem 0.25rem', fontSize: '1rem', color: '#1a1a1a' }}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder-gray-500"
                    style={{ borderBottom: '2.5px solid #D21312', padding: '0.5rem 0.25rem', fontSize: '1rem', color: '#1a1a1a' }}
                    required
                    />

                    <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '1rem' }}>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        className="w-4 h-4 accent-[#D21312]"
                    />
                    Admin access
                    </label>

                    {error && <p className="text-center font-bold" style={{ color: '#D21312' }}>{error}</p>}

                    <button
                    type="submit"
                    className="w-full text-white font-bold transition-opacity hover:opacity-90 active:opacity-80"
                    style={{ backgroundColor: '#D21312', height: '4.375rem', borderRadius: '1.25rem', fontSize: '1.8rem', marginTop: '0.5rem' }}
                    >
                    Sign up
                    </button>

                    <div
                    className="text-center"
                    style={{ fontSize: '1rem', height: '2.3125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a' }}
                    >
                        Already have an account?{' '}
                        <Link href="/" className="font-bold hover:underline ml-1" style={{ color: '#1a1a1a' }}>Sign in</Link>
                    </div>
                </form>
            </div>
        </main>

        <footer
            className="text-center z-10"
            style={{ color: '#6b7280', paddingBottom: '1.5rem', paddingTop: '1rem', fontSize: '0.875rem', lineHeight: '1.6' }}
        >
            <p>Made with ♡ by Long Lam</p>
            <p>© 2023 BOG Developer Bootcamp. All rights reserved.</p>
        </footer>

        <CornerDecoration />
</div>
);
}