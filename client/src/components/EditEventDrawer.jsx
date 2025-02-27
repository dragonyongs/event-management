import React from 'react';
import Drawer from 'react-modern-drawer';
import EventForm from './EventForm';
import { FiX } from 'react-icons/fi';

const EditEventDrawer = ({ drawerSize, event, searchUsers, isOpen, onClose, onUpdate }) => {

    const handleSubmit = (eventData) => {
        const updatedEvent = { ...event, ...eventData };
        onUpdate(updatedEvent);
        onClose();
    };

    return (
        <Drawer open={isOpen} onClose={onClose} direction="right" size={drawerSize} className="overflow-y-auto">
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
