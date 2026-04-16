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
    <aside className="flex flex-col w-48 h-full bg-white border-r border-gray-200 py-6 px-4">

      <nav className="flex flex-col gap-1 flex-1">
        <Link
          href="/training"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
            isActive("/training")
              ? "bg-[#D21312] text-white"
              : "text-gray-500 hover:bg-gray-100"
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
            isActive("/animals")
              ? "bg-[#D21312] text-white"
              : "text-gray-500 hover:bg-gray-100"
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
                isActive("/admin/training")
                  ? "bg-[#D21312] text-white"
                  : "text-gray-500 hover:bg-gray-100"
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
                isActive("/admin/animals")
                  ? "bg-[#D21312] text-white"
                  : "text-gray-500 hover:bg-gray-100"
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
                isActive("/admin/users")
                  ? "bg-[#D21312] text-white"
                  : "text-gray-500 hover:bg-gray-100"
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
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">{user.fullName}</p>
                <p className="text-xs text-gray-400">{user.isAdmin ? "Admin" : "User"}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <Image src="/images/logoutLogo.png" alt="Logout" width={20} height={20} />
            </button>
          </div>
        )}
      </div>

    </aside>
  );
}