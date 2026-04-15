import { useState, useEffect } from "react";

export type UserSession = {
  id: string;
  fullName: string;
  isAdmin: boolean;
};

export function useUser() {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function saveUser(u: UserSession) {
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  }

  function clearUser() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return { user, saveUser, clearUser };
}
