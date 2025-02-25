import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    const search = e.target.value;
    setQuery(search);
    onSearch(search);
  };

  return (
    <div className="w-full px-4 py-3 bg-gray-50">
      <div className="relative max-w-2xl mx-auto">
        <div className={`
          relative rounded-xl overflow-hidden
          ${isFocused 
            ? 'ring-2 ring-blue-500 bg-white shadow-lg' 
            : 'bg-white/80 shadow-sm hover:shadow'
          }
          transition-all duration-200
        `}>
          <input
            name="search"
            type="text"
            placeholder="이벤트 검색"
            value={query}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-4 py-3.5 border-0 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
          <div className={`
            absolute left-4 top-1/2 -translate-y-1/2 
            ${isFocused ? 'text-blue-500' : 'text-gray-400'}
            transition-colors duration-200
          `}>
            <LuSearch className="w-5 h-5" />
          </div>
        </div>
      </div> 
    </div>
  );
};
export default SearchBar;
