import { useState } from 'react';

export const useMemberManagement = (selectedEvent, dispatch) => {
  const [memberForm, setMemberForm] = useState(null);
  const [isMemberEditOpen, setIsMemberEditOpen] = useState(false);

  const handleAddMember = (group) => {
    // 새로운 멤버 생성
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
    // 멤버 수정 드로어 열기: 드로어에 멤버 폼과 선택된 그룹 정보를 전달
    dispatch({
      type: 'OPEN_DRAWER',
      drawer: 'isMemberEditDrawerOpen',
      payload: {
        memberForm: newMember,
        selectedGroup: group,
      },
    });
  };

  const handleEditMember = (group, member) => {
    setMemberForm(member);
    setIsMemberEditOpen(true);
    dispatch({
      type: 'OPEN_DRAWER',
      drawer: 'isMemberEditDrawerOpen',
      payload: {
        memberForm: member,
        selectedGroup: group,
      },
    });
  };

  const handleMemberSubmit = (updatedMember) => {
    if (!selectedEvent) return;
    const { selectedGroup } = dispatch.payload || {};
    if (!selectedGroup || !selectedGroup.id) {
      console.error('그룹 정보가 누락되었습니다.');
      return;
    }
    const golfSubEventIndex = selectedEvent.subEvents.findIndex(
      (sub) => sub.type === 'golf'
    );
    if (golfSubEventIndex === -1) return;
    const golfSubEvent = selectedEvent.subEvents[golfSubEventIndex];
    const newGroups = golfSubEvent.groups.map((group) => {
      if (group.id === selectedGroup.id) {
        const updatedMembers = group.members?.some(
          (member) => member.id === updatedMember.id
        )
          ? group.members.map((member) =>
              member.id === updatedMember.id ? updatedMember : member
            )
          : [...(group.members || []), updatedMember];
        return { ...group, members: updatedMembers };
      }
      return group;
    });
    const updatedSubEvents = [...selectedEvent.subEvents];
    updatedSubEvents[golfSubEventIndex] = {
      ...golfSubEvent,
      groups: newGroups,
    };
    const updatedEvent = { ...selectedEvent, subEvents: updatedSubEvents };
    // 이벤트 업데이트 액션 dispatch
    dispatch({ type: 'UPDATE_EVENT', event: updatedEvent });
    setMemberForm(null);
    setIsMemberEditOpen(false);
    dispatch({ type: 'CLOSE_DRAWER', drawer: 'isMemberEditDrawerOpen' });
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
