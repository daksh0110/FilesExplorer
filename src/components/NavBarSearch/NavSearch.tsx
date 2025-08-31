import { IoMdSearch } from "react-icons/io";

type SearchProps = {
  onSearch?: (query: string) => void;
};

export default function NavSearch({ onSearch }: SearchProps) {
  return (
    <div className="relative w-full">
      {/* Search icon inside */}
      <IoMdSearch
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 
focus:ring-2 focus:ring-blue-400                   focus:outline-none  
                   text-gray-800 bg-gray-100"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}
