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
        const groupExists = selectedEvent.golfDetails.groups.some((group) => group.id === newGroupData.id);
        const updatedGroups = groupExists
            ? selectedEvent.golfDetails.groups.map((group) => (group.id === newGroupData.id ? newGroupData : group))
            : [...selectedEvent.golfDetails.groups, newGroupData];

        setSelectedEvent((prev) => ({
            ...prev,
            golfDetails: { ...prev.golfDetails, groups: updatedGroups },
        }));

        handleCloseDrawer();

        // API 호출 예시 (주석 처리)
        // const saveGroup = async (eventId, groupData) => {
        //   try {
        //     await axios.post(`/events/${eventId}/groups`, groupData);
        //   } catch (error) {
        //     console.error('그룹 저장 실패:', error);
        //     throw error;
        //   }
        // };
        // try {
        //   await saveGroup(selectedEvent.id, newGroupData);
        // } catch (error) {
        //   alert('그룹 저장에 실패했습니다.');
        // }
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedGroupDatas(null);
        setGroupForm(initialGroupForm);
    };

    return { groupForm, setGroupForm, handleGroupSubmit, handleCloseDrawer, openAddGroupDrawer };
};