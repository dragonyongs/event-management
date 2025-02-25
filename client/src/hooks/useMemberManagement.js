
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
        const newGroups = prev.golfDetails.groups.map((group) => {
            if (group.id === selectedGroupDatas.id) {
            const updatedMembers = group.members?.some((member) => member.id === updatedMember.id)
                ? group.members.map((member) => (member.id === updatedMember.id ? updatedMember : member))
                : [...(group.members || []), updatedMember];
            return { ...group, members: updatedMembers };
            }
            return group;
        });

        const updatedEvent = {
            ...prev,
            golfDetails: { ...prev.golfDetails, groups: newGroups },
        };
        setEventList((prevList) => prevList.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
        return updatedEvent;
        });

        setMemberForm(null);
        setIsMemberEditOpen(false);

        // API 호출 예시 (주석 처리)
        // const saveMember = async (eventId, groupId, memberData) => {
        //   try {
        //     await axios.post(`/events/${eventId}/groups/${groupId}/members`, memberData);
        //   } catch (error) {
        //     console.error('멤버 저장 실패:', error);
        //     throw error;
        //   }
        // };
        // try {
        //   await saveMember(selectedEvent.id, selectedGroupDatas.id, updatedMember);
        // } catch (error) {
        //   alert('멤버 저장에 실패했습니다.');
        // }
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