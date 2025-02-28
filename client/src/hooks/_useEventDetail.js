export const useEventDetail = (selectedEvent, setSelectedEvent, eventList, setEventList) => {
    const onDropMember = (memberId, fromGroupId, toGroupId) => {
        if (fromGroupId === toGroupId) return;

        setSelectedEvent((prev) => {
            const golfSubEventIndex = prev.subEvents.findIndex((sub) => sub.type === 'golf');
            if (golfSubEventIndex === -1) return prev;

            const golfSubEvent = prev.subEvents[golfSubEventIndex];
            const fromGroup = golfSubEvent.groups.find((g) => g.id === fromGroupId);
            const toGroup = golfSubEvent.groups.find((g) => g.id === toGroupId);
            const member = fromGroup.members.find((m) => m.userId === memberId);

            const updatedFromGroup = {
                ...fromGroup,
                members: fromGroup.members.filter((m) => m.userId !== memberId),
            };
            const updatedToGroup = {
                ...toGroup,
                members: [...toGroup.members, member],
            };
            const updatedGroups = golfSubEvent.groups.map((g) =>
                g.id === fromGroupId ? updatedFromGroup : g.id === toGroupId ? updatedToGroup : g
            );

            const updatedSubEvents = [...prev.subEvents];
            updatedSubEvents[golfSubEventIndex] = {
                ...golfSubEvent,
                groups: updatedGroups,
            };

            return { ...prev, subEvents: updatedSubEvents };
        });
    };

    const handleDeleteGroup = (groupId) => {
        setSelectedEvent((prev) => {
            const golfSubEventIndex = prev.subEvents.findIndex((sub) => sub.type === 'golf');
            if (golfSubEventIndex === -1) return prev;

            const golfSubEvent = prev.subEvents[golfSubEventIndex];
            const updatedGroups = golfSubEvent.groups.filter((group) => group.id !== groupId);

            const updatedSubEvents = [...prev.subEvents];
            updatedSubEvents[golfSubEventIndex] = {
                ...golfSubEvent,
                groups: updatedGroups,
            };

            const updatedEvent = { ...prev, subEvents: updatedSubEvents };
            setEventList((prevList) => prevList.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
            return updatedEvent;
        });
    };

    return { onDropMember, handleDeleteGroup };
};