import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useUser } from "@/hooks/useUser";

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
                    id: data.user_id,
                    fullName: data.user.fullName,
                    isAdmin: data.user.admin
                });
                router.push('/animals'); // ** PUSH TO TRAINING PART
            } else {
                setError(data.error || "Failed to create an account.");
            }
        } catch (err) {
            setError("An error occurred. Please Try Again.");
        }
    };

    return (
    <div >
      <h1>Create Account</h1>
      
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin access
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">Sign up</button>
      </form>

      {/* Link to Log In Page */}
      <p>
        Already have an account? <Link href="/">Sign in</Link>
      </p>
    </div>
  );
}