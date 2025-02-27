import React from 'react';
import { FiCheck, FiUserMinus } from 'react-icons/fi';

const UserTable = ({
    users,
    assignmentCategories,
    onAssignUser,
    selectedUserIds,
    toggleSelectUser,
    toggleSelectAllOnPage,
    handleUserInfo,
    onDeleteUser,
    enableAssignment
}) => {
    return (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 w-12">
                            <input
                                type="checkbox"
                                onChange={toggleSelectAllOnPage}
                                checked={users.length > 0 && users.every(u => selectedUserIds.includes(u.id))}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                        </th>
                        <th className="p-4 font-medium">이름</th>
                        <th className="p-4 font-medium">회사</th>
                        <th className="p-4 font-medium">팀</th>
                        <th className="p-4 font-medium">직위</th>
                        <th className="p-4 font-medium">직급</th>
                        <th className="p-4 font-medium">역할</th>
                        <th className="p-4 font-medium">구분</th>
                        <th className="p-4 font-medium">연락처</th>
                        <th className="p-4 font-medium">메모</th>
                        {enableAssignment && <th className="p-4 font-medium">배정</th>}
                        {enableAssignment && <th className="p-4 font-medium">제외</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="p-6 text-center text-gray-500">
                                해당 조건에 맞는 사용자가 없습니다.
                            </td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr
                                key={user.id}
                                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        onClick={(e) => e.stopPropagation()}
                                        checked={selectedUserIds.includes(user.id)}
                                        onChange={() => toggleSelectUser(user.id)}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                </td>
                                <td className="p-4 whitespace-nowrap cursor-pointer" onClick={() => handleUserInfo(user)}>{user.name}</td>
                                <td className="p-4 whitespace-nowrap">{user.company}</td>
                                <td className="p-4 whitespace-nowrap">{user.team}</td>
                                <td className="p-4 whitespace-nowrap">{user.position}</td>
                                <td className="p-4 whitespace-nowrap">{user.rank}</td>
                                <td className="p-4 whitespace-nowrap">{user.role}</td>
                                <td className="p-4 whitespace-nowrap">{user.division}</td>
                                <td className="p-4 whitespace-nowrap">
                                    {user.phone} <br />
                                    <span className="text-xs text-gray-400">{user.email}</span>
                                </td>
                                <td className="p-4 whitespace-nowrap">{user.memo}</td>
                                {enableAssignment && 
                                    <td className="p-4 whitespace-nowrap space-x-2">
                                        {(!user.assignments || user.assignments.length === 0) ? (
                                            // 배정이 없으면 모든 버튼을 보여줌
                                            assignmentCategories.map(cat => (
                                                <button
                                                    key={cat.key}
                                                    onClick={() => onAssignUser(user, cat.key)}
                                                    className={`px-3 py-1 text-xs font-medium text-white rounded-md ${cat.style} ${cat.hoverStyle} transition`}
                                                >
                                                    {cat.label}
                                                </button>
                                            ))
                                        ) : (
                                            // 배정이 있으면 해당 배정 버튼만 보임 (토글: 다시 누르면 제거)
                                            user.assignments.map(assignment => {
                                                const category = assignmentCategories.find(cat => cat.key === assignment);
                                                return (
                                                    <button
                                                        key={assignment}
                                                        onClick={() => onAssignUser(user, assignment)}
                                                        className={`inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-md ${
                                                            category?.labelStyle || category.style
                                                        } transition`}
                                                    >
                                                        <FiCheck className="mr-1" /> {category.label}
                                                    </button>
                                                );
                                            })
                                        )}
                                    </td>
                                }   
                                {enableAssignment && 
                                    <td className="p-4 whitespace-nowrap">
                                        <button
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteUser(user.id);
                                            }}
                                            className="text-red-600 hover:text-red-800 text-xs font-medium flex items-center"
                                        >
                                            <FiUserMinus className="mr-1" /> 제외
                                        </button>
                                    </td>   
                                }   
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
