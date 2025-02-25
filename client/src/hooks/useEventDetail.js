export const useEventDetail = (selectedEvent, setSelectedEvent, eventList, setEventList) => {
    const onDropMember = (memberId, fromGroupId, toGroupId) => {
        if (fromGroupId === toGroupId) return;

            const fromGroup = selectedEvent.golfDetails.groups.find((g) => g.id === fromGroupId);
            const toGroup = selectedEvent.golfDetails.groups.find((g) => g.id === toGroupId);
            const member = fromGroup.members.find((m) => m.id === memberId);

            const updatedFromGroup = {
                ...fromGroup,
                members: fromGroup.members.filter((m) => m.id !== memberId),
            };
            const updatedToGroup = {
                ...toGroup,
                members: [...toGroup.members, member],
            };
            const updatedGroups = selectedEvent.golfDetails.groups.map((g) =>
                g.id === fromGroupId ? updatedFromGroup : g.id === toGroupId ? updatedToGroup : g
            );

            setSelectedEvent((prev) => ({
                ...prev,
                golfDetails: { ...prev.golfDetails, groups: updatedGroups },
            }));

            // API 호출 예시 (주석 처리)
            // const moveMemberToGroup = async (eventId, memberId, fromGroupId, toGroupId) => {
            //   try {
            //     await axios.patch(`/events/${eventId}/groups/${toGroupId}/members/${memberId}`, {
            //       fromGroupId,
            //     });
            //   } catch (error) {
            //     console.error('멤버 이동 실패:', error);
            //     throw error;
            //   }
            // };
            // try {
            //   await moveMemberToGroup(selectedEvent.id, memberId, fromGroupId, toGroupId);
            // } catch (error) {
            //   setSelectedEvent((prev) => ({
            //     ...prev,
            //     golfDetails: { ...prev.golfDetails, groups: selectedEvent.golfDetails.groups },
            //   }));
            //   alert('멤버 이동에 실패했습니다. 다시 시도해주세요.');
            // }
        };

        const handleDeleteGroup = (groupId) => {
        const updatedEvent = {
            ...selectedEvent,
            golfDetails: {
            ...selectedEvent.golfDetails,
            groups: selectedEvent.golfDetails.groups.filter((group) => group.id !== groupId),
            },
        };
        const updatedEventList = eventList.map((event) => (event.id === selectedEvent.id ? updatedEvent : event));
        setEventList(updatedEventList);
        setSelectedEvent(updatedEvent);

        // API 호출 예시 (주석 처리)
        // const deleteGroup = async (eventId, groupId) => {
        //   try {
        //     await axios.delete(`/events/${eventId}/groups/${groupId}`);
        //   } catch (error) {
        //     console.error('그룹 삭제 실패:', error);
        //     throw error;
        //   }
        // };
        // try {
        //   await deleteGroup(selectedEvent.id, groupId);
        // } catch (error) {
        //   alert('그룹 삭제에 실패했습니다.');
        // }
    };

    return { onDropMember, handleDeleteGroup };
};