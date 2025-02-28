import React from 'react';
import Drawer from 'react-modern-drawer';
import EventForm from './EventForm';
import { FiX } from 'react-icons/fi';

const EditEventDrawer = ({ size, event, searchUsers, isOpen, onClose, onUpdate }) => {

    const handleSubmit = (eventData) => {
        const updatedEvent = { ...event, ...eventData };
        onUpdate(updatedEvent);
        onClose();
    };

    // 배열로 초기 전달을 원할 경우
    // const handleSubmit = (eventData) => {
    //     // eventData.users가 객체 배열이라면, id만 추출합니다.
    //     let updatedUsers = eventData.users;
    //     if (Array.isArray(updatedUsers) && updatedUsers.length > 0 && typeof updatedUsers[0] === 'object') {
    //         updatedUsers = updatedUsers.map(user => user.id);
    //     }
    //     const updatedEvent = { 
    //         ...event, 
    //         ...eventData,
    //         users: updatedUsers 
    //     };
    //     onUpdate(updatedEvent);
    //     console.log("EditEventDrawer", eventData);
    //     onClose();
    // };

    return (
        <Drawer open={isOpen} onClose={onClose} direction="right" size={size} className="overflow-y-auto">
            <div className="h-full flex flex-col bg-white">
                {/* Header */}
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">이벤트 정보 수정</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                    {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-6">
                        <EventForm key={event.id} searchUsers={searchUsers} initialData={event} onSubmit={handleSubmit} onDelete={() => console.log('Delete')} />
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default EditEventDrawer;
