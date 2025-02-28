// useEventDetail.js
export const useEventDetail = (selectedEvent, dispatch) => {
  const onDropMember = (memberId, fromGroupId, toGroupId) => {
    if (fromGroupId === toGroupId) return;
    // 이벤트 id를 payload에 포함하여 reducer가 해당 이벤트를 업데이트하도록 함
    dispatch({
      type: 'DROP_MEMBER',
      payload: {
        eventId: selectedEvent.id,
        memberId,
        fromGroupId,
        toGroupId,
      },
    });
  };

  const handleDeleteGroup = (groupId) => {
    dispatch({
      type: 'DELETE_GROUP',
      payload: {
        eventId: selectedEvent.id,
        groupId,
      },
    });
  };

  return { onDropMember, handleDeleteGroup };
};
