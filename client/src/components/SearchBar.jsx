import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        const search = e.target.value;

        setQuery(search);
        onSearch(search);

        console.log('search', search);
    };

    return (
        <div className="w-full bg-white px-4 py-2 overflow-x-auto scrollbar-hide">
            <input type="text" placeholder='검색어 입력' value={query} onChange={handleSearch} className="w-full flex-1 border border-slate-100 rounded-md py-2 px-4"/>
        </div>
    )
}

export default SearchBar