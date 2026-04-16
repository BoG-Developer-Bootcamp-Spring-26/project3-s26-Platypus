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
    <div className="flex items-center gap-3 bg-white border border-gray-400 rounded-lg px-4 py-3 w-full shadow-sm">
      <button onClick={() => onSearch(value)} className="shrink-0 flex items-center justify-center">
        <Image src="/images/searchLogo.png" alt="Search" width={20} height={20} />
      </button>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 text-base text-gray-700 placeholder-gray-500 focus:outline-none bg-transparent"
      />
    </div>
  );
}
