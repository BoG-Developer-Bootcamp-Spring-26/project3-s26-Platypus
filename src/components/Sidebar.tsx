import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../hooks/useUser";
import React, { useState } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const { user, clearUser } = useUser();
  const [showDeleteScreen, setShowDeleteScreen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  function handleLogout() {
    clearUser();
    router.push("/");
  }

  async function handleDeleteAccount() {
    if (!email || !password) {
      setError("Email and Password were not provided.");
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user?.id, email, password })
      });
      if (response.ok) {
        clearUser();
        router.push('/signup');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  }

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      {showDeleteScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              This action is permanent. Please confirm your credentials to delete your account.
            </p>
            <div className="space-y-3 mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D21312]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D21312]"
              />
            </div>
            {error && <p className="text-[#D21312] text-sm font-bold mb-4">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowDeleteScreen(false); setError(""); setEmail(""); setPassword(""); }}
                className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-[#D21312] text-white hover:bg-red-700 font-bold text-sm disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="flex flex-col w-48 min-h-screen bg-white border-r border-gray-200 py-6 px-4">
        <nav className="flex flex-col gap-1 flex-1">
          <Link
            href="/training"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
              isActive("/training") ? "bg-[#D21312] text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Image
              src={isActive("/training") ? "/images/activeTrainingLogo.png" : "/images/inactiveTrainingLogs.png"}
              alt="Training Logs"
              width={18}
              height={18}
            />
            Training logs
          </Link>

          <Link
            href="/animals"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
              isActive("/animals") ? "bg-[#D21312] text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Image
              src={isActive("/animals") ? "/images/activeAnimalsLogo.png" : "/images/inactiveAnimalLogo.png"}
              alt="Animals"
              width={18}
              height={18}
            />
            Animals
          </Link>

          {user?.isAdmin && (
            <>
              <div className="mt-4 mb-1 text-xs font-semibold text-gray-800 px-3">
                Admin access
              </div>
              <div className="border-t border-gray-200 mb-2" />

              <Link
                href="/admin/training"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive("/admin/training") ? "bg-[#D21312] text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Image
                  src={isActive("/admin/training") ? "/images/activeAllTrainingLogo.png" : "/images/inactiveAllTrainingLogo.png"}
                  alt="All Training"
                  width={18}
                  height={18}
                />
                All training
              </Link>

              <Link
                href="/admin/animals"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive("/admin/animals") ? "bg-[#D21312] text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Image
                  src={isActive("/admin/animals") ? "/images/activeAllAnimalsLogo.png" : "/images/inactiveAllAnimalsLogo.png"}
                  alt="All Animals"
                  width={18}
                  height={18}
                />
                All animals
              </Link>

              <Link
                href="/admin/users"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive("/admin/users") ? "bg-[#D21312] text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Image
                  src={isActive("/admin/users") ? "/images/activeAllUsersLogo.png" : "/images/inactiveAllUsersLogo.png"}
                  alt="All Users"
                  width={18}
                  height={18}
                />
                All users
              </Link>
            </>
          )}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200">
          {user && (
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-full text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: '#D21312', width: '2rem', height: '2rem' }}
                >
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col items-start mb-2">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{user.fullName}</p>
                  <p className="text-xs text-gray-400 mb-1">{user.isAdmin ? "Admin" : "User"}</p>
                  <button
                    onClick={() => setShowDeleteScreen(true)}
                    className="text-[11px] font-bold text-[#D21312] hover:underline cursor-pointer"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <Image src="/images/logoutLogo.png" alt="Logout" width={20} height={20} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
