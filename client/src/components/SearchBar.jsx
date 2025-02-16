import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const search = e.target.value;
    setQuery(search);
    onSearch(search);
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="이벤트 검색"
          value={query}
          onChange={handleSearch}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl 
                             focus:ring-2 focus:ring-blue-500 focus:bg-white
                             transition-all duration-300"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
