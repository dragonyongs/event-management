import React, { createContext, useReducer } from 'react';
import { newEventData, dummyUsers } from '../data/eventData';

const initialState = {
  events: newEventData,
  users: dummyUsers,
  drawers: {
    isDrawerOpen: false,
    isEditEventDrawer: false,
    isCreateEventDrawer: false,
    isCreateUserDrawer: false,
    isEditUserDrawer: false,
    isGroupDrawerOpen: false,
    isMemberEditDrawer: false,
    isUserSelectorOpen: false,
    drawerContent: null,
    selectedGroup: null,
    memberForm: null,
  },
  selectedUserForEdit: null,
  selectedEvent: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        ...state,
        drawers: {
          ...state.drawers,
          [action.drawer]: true,
          // ...(action.payload || {}),
        },
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        drawers: { ...state.drawers, [action.drawer]: false },
      };
    case 'SET_SELECTED_EVENT':
      return {
        ...state,
        selectedEvent: action.event,
      };
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUserForEdit: action.selectedUserForEdit,
      };
    case 'CREATE_EVENT':
      return {
        ...state,
        events: [...state.events, action.event],
        drawers: { ...state.drawers, isCreateEventDrawer: false },
      };
    case 'CREATE_USER':
      return {
        ...state,
        users: [...state.users, action.user],
        drawers: { ...state.drawers, isCreateUserDrawer: false },
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((ev) =>
          ev.id === action.event.id ? action.event : ev
        ),
        selectedEvent:
          state.selectedEvent?.id === action.event.id
            ? action.event
            : state.selectedEvent,
        drawers: { ...state.drawers, isEditEventDrawer: false },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.selectedUserForEdit.id
            ? action.selectedUserForEdit
            : u
        ),
        drawers: { ...state.drawers, isEditUserDrawer: false },
      };
    case 'SET_SELECTED_GROUP':
      return {
        ...state,
        selectedGroup: action.selectedGroup,
      };
    case 'UPDATE_GOLF_GROUP':
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id !== action.eventId) return event;

          const golfSubEventIndex = event.subEvents.findIndex(
            (sub) => sub.type === 'golf'
          );
          if (golfSubEventIndex === -1) return event;

          const golfSubEvent = event.subEvents[golfSubEventIndex];
          const groupExists = golfSubEvent.groups.some(
            (g) => g.id === action.group.id
          );

          const updatedGroups = groupExists
            ? golfSubEvent.groups.map((g) =>
                g.id === action.group.id ? action.group : g
              )
            : [...golfSubEvent.groups, action.group];

          const updatedSubEvents = [...event.subEvents];
          updatedSubEvents[golfSubEventIndex] = {
            ...golfSubEvent,
            groups: updatedGroups,
          };

          return { ...event, subEvents: updatedSubEvents };
        }),
      };
    case 'SET_SELECTED_EVENT_USERS':
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          users: action.users,
        },
      };
    case 'DROP_MEMBER': {
      const { memberId, fromGroupId, toGroupId } = action.payload;

      // 골프 서브 이벤트 찾기
      const golfSubEventIndex = state.selectedEvent.subEvents.findIndex(
        (sub) => sub.type === 'golf'
      );
      if (golfSubEventIndex === -1) return state;

      const golfSubEvent = state.selectedEvent.subEvents[golfSubEventIndex];

      // fromGroup, toGroup 찾기
      const fromGroup = golfSubEvent.groups.find(
        (group) => group.id === fromGroupId
      );
      const toGroup = golfSubEvent.groups.find(
        (group) => group.id === toGroupId
      );
      if (!fromGroup || !toGroup) return state;

      // 이동할 멤버 찾기
      const member = fromGroup.members.find((m) => m.userId === memberId);
      if (!member) return state;

      // fromGroup에서 멤버 제거
      const updatedFromGroup = {
        ...fromGroup,
        members: fromGroup.members.filter((m) => m.userId !== memberId),
      };

      // toGroup에 멤버 추가
      const updatedToGroup = {
        ...toGroup,
        members: [...toGroup.members, member],
      };

      // 그룹 업데이트
      const updatedGroups = golfSubEvent.groups.map((group) => {
        if (group.id === fromGroupId) return updatedFromGroup;
        if (group.id === toGroupId) return updatedToGroup;
        return group;
      });

      // 골프 서브 이벤트 업데이트
      const updatedGolfSubEvent = {
        ...golfSubEvent,
        groups: updatedGroups,
      };

      // 서브 이벤트 전체 업데이트
      const updatedSubEvents = state.selectedEvent.subEvents.map(
        (sub, index) =>
          index === golfSubEventIndex ? updatedGolfSubEvent : sub
      );

      // 선택된 이벤트 업데이트
      const updatedEvent = {
        ...state.selectedEvent,
        subEvents: updatedSubEvents,
      };

      return {
        ...state,
        selectedEvent: updatedEvent,
      };
    }
    case 'DELETE_USER': {
      const { userId } = action;

      // 1. 전역 사용자 목록에서 해당 사용자를 제거합니다.
      const updatedUsers = state.users.filter((user) => user.id !== userId);

      // 2. 각 이벤트의 사용자 목록에서 해당 사용자를 제거합니다.
      const updatedEvents = state.events.map((event) => ({
        ...event,
        users: event.users
          ? event.users.filter((user) => user.id !== userId)
          : [],
      }));

      // 3. 선택된 이벤트가 있다면, 그 이벤트의 사용자 목록에서도 제거합니다.
      const updatedSelectedEvent = state.selectedEvent && {
        ...state.selectedEvent,
        users: state.selectedEvent.users
          ? state.selectedEvent.users.filter((user) => user.id !== userId)
          : [],
      };

      return {
        ...state,
        users: updatedUsers,
        events: updatedEvents,
        selectedEvent: updatedSelectedEvent,
      };
    }

    case 'DELETE_EVENT_USER': {
      const { userId } = action.payload;
      // 선택된 이벤트가 없는 경우 그대로 반환
      if (!state.selectedEvent) return state;

      // selectedEvent의 users에서 해당 userId 제거
      const updatedUsers = state.selectedEvent.users.filter(
        (user) => user.id !== userId
      );

      const updatedSelectedEvent = {
        ...state.selectedEvent,
        users: updatedUsers,
      };

      // 이벤트 리스트에도 선택된 이벤트가 포함되어 있다면 업데이트
      const updatedEvents = state.events.map((event) =>
        event.id === state.selectedEvent.id ? updatedSelectedEvent : event
      );

      return {
        ...state,
        selectedEvent: updatedSelectedEvent,
        events: updatedEvents,
      };
    }
    default:
      return state;
  }
}

// Context 생성
export const EventContext = createContext();

// Provider 컴포넌트
export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
