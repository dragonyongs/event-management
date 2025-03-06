import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EventHeader from '../../components/EventDetail/EventHeader';
import EventTabs from '../../components/EventDetail/EventTabs';
import EventDetailSummary from '../../components/EventDetail/EventDetailSummary';
import UserManagement from '../../components/UserManagement';
import GolfManagement from '../../components/EventDetail/GolfManagement';
import TourManagement from '../../components/EventDetail/TourManagement';
import AddGroupDrawer from '../../components/EventDetail/AddGroupDrawer';
import GolfMemberEditDrawer from '../../components/GolfMemberEditDrawer';
import EditEventDrawer from '../../components/EditEventDrawer';
import EditUserDrawer from '../../components/EditUserDrawer';
import { FiUserCheck, FiUsers } from 'react-icons/fi';
import { useGroupManagement } from '../../hooks/useGroupManagement';
import { useMemberManagement } from '../../hooks/useMemberManagement';
// import { useEventDetail } from '../../hooks/useEventDetail';
import { EventContext } from '../../context/EventContext';
import useDrawerSize from '../../utils/useDrawerSize';

const EventDetail = () => {
  const { state, dispatch } = useContext(EventContext);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const drawerSize = useDrawerSize();

  // 이벤트 ID가 변경될 때 해당 이벤트를 선택하여 글로벌 상태에 업데이트
  useEffect(() => {
    const event = state.events.find((ev) => ev.id === id);
    if (event) {
      let users = event.users;
      if (users && users.length && typeof users[0] === 'string') {
        users = users.map((userId) =>
          state.users.find((user) => user.id === userId)
        );
      }
      dispatch({ type: 'SET_SELECTED_EVENT', event: { ...event, users } });
    }
  }, [id, state.events, state.users, dispatch]);

  // 그룹/멤버 관리 훅도 글로벌 상태와 dispatch를 사용하도록 변경
  const { groupForm, setGroupForm, handleGroupSubmit, openAddGroupDrawer } =
    useGroupManagement(
      state.selectedEvent,
      dispatch
      // (추가로 groupDatas, drawerContent 등 필요 시 글로벌 상태에 추가하거나 로컬 상태로 유지)
    );

  const { memberForm, handleAddMember, handleEditMember, handleMemberSubmit } =
    useMemberManagement(state.selectedEvent, dispatch);

  // const { onDropMember, handleDeleteGroup } = useEventDetail(
  //     state.selectedEvent,
  //     dispatch,
  //     state.events
  // );

  // 사용자 할당 업데이트: 특정 사용자의 할당 상태를 변경
  const onAssignUser = (user, categoryKey) => {
    const updatedUser = {
      ...user,
      assignments: categoryKey ? [categoryKey] : [],
    };
    dispatch({ type: 'UPDATE_USER', selectedUserForEdit: updatedUser });
  };

  // 사용자 수정 후 업데이트
  const handleUpdateUser = (updatedUser) => {
    dispatch({ type: 'UPDATE_USER', selectedUserForEdit: updatedUser });
  };

  // 사용자 삭제: 사용자와 해당 사용자가 포함된 이벤트 업데이트
  const handleEventDeleteUser = (deleteEventUserId) => {
    dispatch({
      type: 'DELETE_EVENT_USER',
      payload: { userId: deleteEventUserId },
    });
  };

  // 이벤트 업데이트: 수정된 이벤트 데이터를 글로벌 상태에 반영
  const handleUpdateEvent = (updatedEvent) => {
    dispatch({ type: 'UPDATE_EVENT', event: updatedEvent });
  };

  const assignmentCategories = [
    {
      key: 'staff',
      label: '스태프',
      bgStyle: 'bg-blue-50',
      textStyle: 'text-blue-600',
      hoverStyle: 'hover:bg-blue-100',
      borderStyle: 'border-blue-200',
      icon: <FiUserCheck />,
    },
    {
      key: 'golf',
      label: '골프',
      bgStyle: 'bg-green-50',
      textStyle: 'text-green-600',
      hoverStyle: 'hover:bg-green-100',
      borderStyle: 'border-green-200',
      icon: <FiUsers />,
    },
    {
      key: 'tour',
      label: '관광',
      bgStyle: 'bg-amber-50',
      textStyle: 'text-amber-600',
      hoverStyle: 'hover:bg-amber-100',
      borderStyle: 'border-amber-200',
      icon: <FiUsers />,
    },
  ];

  if (!state.selectedEvent) {
    return <div>이벤트를 찾을 수 없습니다.</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <EventHeader
          event={state.selectedEvent}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          eventTypes={state.selectedEvent.type}
          onEdit={() =>
            dispatch({ type: 'OPEN_DRAWER', drawer: 'isEditEventDrawer' })
          }
        />
        <div className="container mx-auto px-4 py-6">
            {activeTab === 'overview' && (
              <EventDetailSummary event={state.selectedEvent} />
            )}
            {activeTab === 'user' && (
              <UserManagement
                users={state.selectedEvent.users}
                assignmentCategories={assignmentCategories}
                onAssignUser={onAssignUser}
                onEditUser={(user) => {
                  dispatch({
                    type: 'SET_SELECTED_USER',
                    selectedUserForEdit: user,
                  });
                  dispatch({ type: 'OPEN_DRAWER', drawer: 'isEditUserDrawer' });
                }}
                onEventDeleteUser={handleEventDeleteUser}
              />
            )}
            {activeTab === 'golf' && (
              <GolfManagement
              // data={state.selectedEvent.subEvents?.find((sub) => sub.type === 'golf') || { groups: [] }}
              // users={state.selectedEvent.users}
              // onAddGroup={() => openAddGroupDrawer('golf')}
              // onEditGroup={(group) => openAddGroupDrawer('golf', group)}
              // onDeleteGroup={(groupId) => handleDeleteGroup(groupId)}
              // onAddMember={(group) => handleAddMember(group)}
              // onEditMember={handleEditMember}
              // onDropMember={onDropMember}
              />
            )}
            {activeTab === 'tour' && (
              <TourManagement
                data={
                  state.selectedEvent.subEvents?.find(
                    (sub) => sub.type === 'tour'
                  ) || { busGroups: [], destinations: [] }
                }
                onAddBusGroup={() => openAddGroupDrawer('bus')}
                onAddDestination={() => openAddGroupDrawer('destination')}
              />
            )}
        </div>

        {/* 그룹 추가 드로어 */}

        <AddGroupDrawer
          isOpen={state.drawers.isGroupDrawerOpen}
          size={drawerSize}
          type={'golf'} // 필요에 따라 드로어 콘텐츠를 글로벌 상태에서 관리 가능
          groupForm={groupForm}
          setGroupForm={setGroupForm}
          onSubmit={handleGroupSubmit}
          onClose={() =>
            dispatch({ type: 'CLOSE_DRAWER', drawer: 'isGroupDrawerOpen' })
          }
        />

        {/* 멤버 수정 드로어 (예시로 글로벌 드로어 상태에 isMemberEditDrawer를 추가했다고 가정) */}

        <GolfMemberEditDrawer
          isOpen={state.drawers.isMemberEditDrawer}
          size={drawerSize}
          event={state.selectedEvent}
          memberData={memberForm}
          onClose={() =>
            dispatch({ type: 'CLOSE_DRAWER', drawer: 'isMemberEditDrawer' })
          }
          onSubmit={(updatedMember) => handleMemberSubmit(updatedMember)}
        />

        <EditEventDrawer
          isOpen={state.drawers.isEditEventDrawer}
          size={drawerSize}
          event={state.selectedEvent}
          onClose={() =>
            dispatch({ type: 'CLOSE_DRAWER', drawer: 'isEditEventDrawer' })
          }
          onUpdate={handleUpdateEvent}
        />

        {state.selectedUserForEdit && (
          <EditUserDrawer
            size={drawerSize}
            isOpen={state.drawers.isEditUserDrawer}
            initialUser={state.selectedUserForEdit}
            onClose={() =>
              dispatch({ type: 'CLOSE_DRAWER', drawer: 'isEditUserDrawer' })
            }
            onSubmit={handleUpdateUser}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default EventDetail;
