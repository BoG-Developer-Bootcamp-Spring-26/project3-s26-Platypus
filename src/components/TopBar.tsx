import Image from "next/image";
import SearchBar from "./SearchBar";

type Props = {
  onSearch: (query: string) => void;
};

export default function TopBar({ onSearch }: Props) {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center">
      <div className="flex items-center gap-2 w-48 shrink-0">
        <Image src="/images/appLogo.png" alt="Progress" width={36} height={36} />
        <span
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "28px", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1 }}
          className="text-gray-900"
        >
          Progress
        </span>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-md">
          <SearchBar onSearch={onSearch} placeholder="Search" />
        </div>
      </div>
    </div>
  );
}
