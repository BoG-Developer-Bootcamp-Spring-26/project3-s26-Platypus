import { useState, useEffect } from "react";

export type UserSession = {
  id: string;
  fullName: string;
  isAdmin: boolean;
};

export function useUser() {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsed = JSON.parse(userString);
        const raw = parsed.user || parsed; 
        
        setUser({
          id: raw.id || raw._id,
          fullName: raw.fullName || "User",
          isAdmin: raw.admin === true || raw.isAdmin === true
        });
      } catch (e) {
        setUser(null);
      }
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
