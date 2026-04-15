import Image from "next/image";
import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder = "Search..." }: Props) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch(value);
    }
  }

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 w-72 shadow-sm">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
      />
      <button onClick={() => onSearch(value)} className="shrink-0">
        <Image src="/images/searchLogo.png" alt="Search" width={18} height={18} />
      </button>
    </div>
  );
}
