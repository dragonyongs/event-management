
import { useState } from 'react';

export const useMemberManagement = (selectedEvent, setSelectedEvent, setEventList, selectedGroupDatas, setSelectedGroupDatas) => {
    const [memberForm, setMemberForm] = useState(null);
    const [isMemberEditOpen, setIsMemberEditOpen] = useState(false);

    const handleAddMember = (group) => {
        setSelectedGroupDatas(group);

        const newMember = {
            id: Date.now(),
            name: '',
            status: 'pending',
            handicap: 0,
            reason: '',
            score: { total: '', holes: [] },
        };
        
        setMemberForm(newMember);
        setIsMemberEditOpen(true);
    };

    const handleEditMember = (group, member) => {
        console.log("handleEditMember-group", group);
        console.log("handleEditMember-member", member);

        setSelectedGroupDatas(group);
        setMemberForm(member);
        setIsMemberEditOpen(true);
    };

    const handleMemberSubmit = (updatedMember) => {
        if (!selectedGroupDatas?.id) {
            console.error('groupForm ID가 없습니다.');
            return;
        }
    
        setSelectedEvent((prev) => {
            if (!prev) return prev;
    
            const golfSubEventIndex = prev.subEvents.findIndex((sub) => sub.type === 'golf');
            if (golfSubEventIndex === -1) return prev;
    
            const golfSubEvent = prev.subEvents[golfSubEventIndex];
            const newGroups = golfSubEvent.groups.map((group) => {
                if (group.id === selectedGroupDatas.id) {
                    const updatedMembers = group.members?.some((member) => member.id === updatedMember.id)
                        ? group.members.map((member) => (member.id === updatedMember.id ? updatedMember : member))
                        : [...(group.members || []), updatedMember];
                    return { ...group, members: updatedMembers };
                }
                return group;
            });
    
            const updatedSubEvents = [...prev.subEvents];
            updatedSubEvents[golfSubEventIndex] = {
                ...golfSubEvent,
                groups: newGroups,
            };
    
            const updatedEvent = { ...prev, subEvents: updatedSubEvents };
            setEventList((prevList) => prevList.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
            return updatedEvent;
        });
    
        setMemberForm(null);
        setIsMemberEditOpen(false);
    };

    return {
        memberForm,
        setMemberForm,
        isMemberEditOpen,
        setIsMemberEditOpen,
        handleAddMember,
        handleEditMember,
        handleMemberSubmit,
    };
};