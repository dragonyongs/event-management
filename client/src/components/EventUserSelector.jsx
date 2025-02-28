import React, { useState, useMemo, useEffect, useContext } from 'react';
import { GrClose, GrSearch, GrCheckmark } from "react-icons/gr";
import { EventContext } from '../context/EventContext';

const EventUserSelector = () => {
    const { state, dispatch } = useContext(EventContext);
    // 전역 상태에서 availableUsers와 선택된 사용자 목록을 가져옴
    const availableUsers = state.users;
    const selectedUsers = state.selectedEvent?.users || [];
    
    const [searchQuery, setSearchQuery] = useState('');
    const [tempSelected, setTempSelected] = useState([]);

    // 전역 selectedUsers가 변경되면 tempSelected를 업데이트
    useEffect(() => {
        if (selectedUsers && selectedUsers.length > 0) {
            if (typeof selectedUsers[0] === 'object') {
                setTempSelected(selectedUsers.map(user => user.id));
            } else {
                setTempSelected(selectedUsers);
            }
        } else {
            setTempSelected([]);
        }
    }, [selectedUsers]);

    const toggleUser = (userId) => {
        setTempSelected(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return availableUsers;
        return availableUsers.filter((user) =>
            user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.team?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, availableUsers]);

    const handleConfirm = () => {
        const selectedUserObjects = availableUsers.filter(user =>
            tempSelected.includes(user.id)
        );

        // 전역 상태의 selectedEvent.users를 업데이트
        dispatch({
            type: 'SET_SELECTED_EVENT_USERS',
            users: selectedUserObjects,
        });
        // 사용자 선택 드로어 닫기 (isUserSelectorOpen이 초기 상태에 정의되어 있어야 합니다)
        dispatch({
            type: 'CLOSE_DRAWER',
            drawer: 'isUserSelectorOpen',
        });
    };

    const handleClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER',
            drawer: 'isUserSelectorOpen',
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">참가자 선택</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                        <GrClose size={20} />
                    </button>
                </div>
                <div className="p-4 border-b">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <GrSearch size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full p-2 pl-10 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="이름, 이메일, 부서, 팀 검색..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                            onClick={() => toggleUser(user.id)}
                        >
                            <div
                                className={`w-5 h-5 rounded-md border mr-2 flex items-center justify-center transition-colors ${
                                    tempSelected.includes(user.id)
                                        ? 'bg-indigo-500 border-indigo-500 text-white'
                                        : 'border-gray-300'
                                }`}
                            >
                                {tempSelected.includes(user.id) && <GrCheckmark size={14} />}
                            </div>
                            <div className="flex-1">
                                <div>{user.name}</div>
                                <div className="text-xs text-gray-500">
                                    {user.company} {user.department} {user.rank} {user.team}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex justify-end space-x-2 bg-gray-50">
                    <button onClick={handleClose} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                        취소
                    </button>
                    <button onClick={handleConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventUserSelector;
