import React, { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import EventForm from './EventForm';

const CreateEventDrawer = ({ isOpen, onClose, searchUsers, handleCreateEvent }) => {

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
            <div>
                <h2 className="text-xl font-semibold pt-6 px-6">새 이벤트 생성</h2>
                <EventForm initialData={initialData} searchUsers={searchUsers} onSubmit={handleSubmit} />
            </div>
        </Drawer>
    );
};

export default CreateEventDrawer;