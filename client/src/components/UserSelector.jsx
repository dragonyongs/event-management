import React, { useState } from 'react';

const UserSelector = ({ availableUsers, selectedUsers, onChange }) => {
    const [userSearch, setUserSearch] = useState('');

    // availableUsers에서 검색하고, 이미 선택된 유저는 제외
    const filteredUsers = availableUsers.filter(
        (user) =>
            user.name.includes(userSearch) &&
            !selectedUsers.find((sel) => sel.id === user.id)
    );

    const handleSelectUser = (user) => {
        onChange([...selectedUsers, user]);
        setUserSearch('');
    };

    const handleRemoveUser = (userId) => {
        onChange(selectedUsers.filter((user) => user.id !== userId));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사용자 추가</label>
            <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="사용자 검색"
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
            />
            {userSearch.trim() && filteredUsers.length > 0 && (
                <ul className="border border-gray-200 mt-1 rounded-lg max-h-40 overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <li
                            key={user.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectUser(user)}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                    <span key={user.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                        {user.name}
                        <button className="ml-1 text-blue-500" onClick={() => handleRemoveUser(user.id)}>
                            X
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default UserSelector;