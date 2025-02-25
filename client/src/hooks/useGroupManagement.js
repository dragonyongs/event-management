import { useState } from 'react';

const initialGroupForm = {
    id: '',
    name: '',
    teeTime: { start: '', estimatedDuration: '' },
    members: [],
};

export const useGroupManagement = (
    selectedEvent,
    setSelectedEvent,
    setSelectedGroupDatas,
    setIsDrawerOpen,
    setDrawerContent
) => {
    const [groupForm, setGroupForm] = useState(initialGroupForm);

    const openAddGroupDrawer = (type, group) => {
        setDrawerContent(type);
        if (group) {
            setSelectedGroupDatas(group);
            setGroupForm(group);
        } else {
            const newInitialGroupForm = { ...initialGroupForm, id: Date.now() };
            setSelectedGroupDatas(newInitialGroupForm);
            setGroupForm(newInitialGroupForm);
        }
        setIsDrawerOpen(true);
    };

    const handleGroupSubmit = (newGroupData) => {
        if (!selectedEvent) return;
    
        setSelectedEvent((prev) => {
            const golfSubEventIndex = prev.subEvents.findIndex((sub) => sub.type === 'golf');
            if (golfSubEventIndex === -1) return prev;
    
            const golfSubEvent = prev.subEvents[golfSubEventIndex];
            const groupExists = golfSubEvent.groups.some((group) => group.id === newGroupData.id);
            const updatedGroups = groupExists
                ? golfSubEvent.groups.map((group) => (group.id === newGroupData.id ? newGroupData : group))
                : [...golfSubEvent.groups, newGroupData];
    
            const updatedSubEvents = [...prev.subEvents];
            updatedSubEvents[golfSubEventIndex] = {
                ...golfSubEvent,
                groups: updatedGroups,
            };
    
            return { ...prev, subEvents: updatedSubEvents };
        });
    
        handleCloseDrawer();
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedGroupDatas(null);
        setGroupForm(initialGroupForm);
    };

    return { groupForm, setGroupForm, handleGroupSubmit, handleCloseDrawer, openAddGroupDrawer };
};