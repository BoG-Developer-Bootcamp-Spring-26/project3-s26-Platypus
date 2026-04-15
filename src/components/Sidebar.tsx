import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../hooks/useUser";

export default function Sidebar() {
  const router = useRouter();
  const { user, clearUser } = useUser();

  function handleLogout() {
    clearUser();
    router.push("/");
  }

  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="flex flex-col w-48 min-h-screen bg-white border-r border-gray-200 py-6 px-4">
      {/* Logo */}
      <div className="mb-8">
        <Image src="/images/appLogo.png" alt="App Logo" width={120} height={40} />
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-2 flex-1">
        <Link href="/training" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
          <Image
            src={isActive("/training") ? "/images/activeTrainingLogo.png" : "/images/inactiveTrainingLogs.png"}
            alt="Training Logs"
            width={20}
            height={20}
          />
          <span className={`text-sm ${isActive("/training") ? "font-semibold text-black" : "text-gray-500"}`}>
            Training Logs
          </span>
        </Link>

        <Link href="/animals" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
          <Image
            src={isActive("/animals") ? "/images/activeAnimalsLogo.png" : "/images/inactiveAnimalLogo.png"}
            alt="Animals"
            width={20}
            height={20}
          />
          <span className={`text-sm ${isActive("/animals") ? "font-semibold text-black" : "text-gray-500"}`}>
            Animals
          </span>
        </Link>

        {/* Admin links */}
        {user?.isAdmin && (
          <>
            <div className="mt-4 mb-1 text-xs text-gray-400 uppercase px-3">Admin</div>

            <Link href="/admin/users" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Image
                src={isActive("/admin/users") ? "/images/activeAllUsersLogo.png" : "/images/inactiveAllUsersLogo.png"}
                alt="All Users"
                width={20}
                height={20}
              />
              <span className={`text-sm ${isActive("/admin/users") ? "font-semibold text-black" : "text-gray-500"}`}>
                All Users
              </span>
            </Link>

            <Link href="/admin/animals" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Image
                src={isActive("/admin/animals") ? "/images/activeAllAnimalsLogo.png" : "/images/inactiveAllAnimalsLogo.png"}
                alt="All Animals"
                width={20}
                height={20}
              />
              <span className={`text-sm ${isActive("/admin/animals") ? "font-semibold text-black" : "text-gray-500"}`}>
                All Animals
              </span>
            </Link>

            <Link href="/admin/training" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Image
                src={isActive("/admin/training") ? "/images/activeAllTrainingLogo.png" : "/images/inactiveAllTrainingLogo.png"}
                alt="All Training"
                width={20}
                height={20}
              />
              <span className={`text-sm ${isActive("/admin/training") ? "font-semibold text-black" : "text-gray-500"}`}>
                All Training
              </span>
            </Link>
          </>
        )}
      </nav>

      {/* User info + logout */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        {user && (
          <div className="mb-3 px-1">
            <p className="text-sm font-semibold text-gray-800">{user.fullName}</p>
            <p className="text-xs text-gray-400">{user.isAdmin ? "Admin" : "User"}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg hover:bg-gray-100 text-sm text-gray-500"
        >
          <Image src="/images/logoutLogo.png" alt="Logout" width={20} height={20} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
