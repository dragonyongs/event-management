import React from 'react';
import Drawer from 'react-modern-drawer';
import EventForm from './EventForm';

const CreateEventDrawer = ({ isOpen, onClose, handleCreateEvent }) => {
    const initialData = {
        title: '',
        startDate: '',
        endDate: '',
        thumbnail: { url: '', icon: '', bgColor: '' },
        type: [],
        users: [],
        staffs: [],
        subEvents: [
            {
                type: 'golf',
                users: [],
                groups: []
            },
            {
                type: 'travel',
                users: [],
            },
        ]
    };

    const handleSubmit = (eventData) => {
        
        const newEvent = {
            id: `evt_${Date.now()}`,
            ...eventData,
            status: 'upcoming',
        };
        handleCreateEvent(newEvent);
        onClose();
    };

    return (
        <Drawer open={isOpen} onClose={onClose} direction="right" size={480}>
            <div className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">새 이벤트 생성</h2>
                <EventForm initialData={initialData} onSubmit={handleSubmit} />
            </div>
        </Drawer>
    );
};

export default CreateEventDrawer;