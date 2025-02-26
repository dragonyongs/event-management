import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchAndFilter = ({ searchQuery, setSearchQuery, filterDivision, setFilterDivision }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full md:w-1/3">
            <div className="flex items-center gap-2 w-full">
                <select
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={filterDivision}
                onChange={(e) => setFilterDivision(e.target.value)}
                >
                    <option value="ALL">전체</option>
                    <option value="컨설턴트">컨설턴트</option>
                    <option value="스태프">스태프</option>
                    <option value="대표">대표</option>
                    <option value="임원">임원</option>
                    <option value="업체">업체</option>
                </select>
                <div className="relative w-full">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="이름, 회사, 직급, 역할 등 검색"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilter;