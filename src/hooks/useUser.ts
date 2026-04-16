import { useState, useEffect } from "react";

export type UserSession = {
  id: string;
  fullName: string;
  isAdmin: boolean;
};

export function useUser() {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  function saveUser(u: UserSession) {
    setUser(u);
  }

  async function clearUser() {
    await fetch('/api/user/logout', { method: 'POST' });
    setUser(null);
  }

  return { user, saveUser, clearUser };
}
