import React, { useReducer, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
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
    },
    selectedUserForEdit: null,
    selectedEvent: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return {
                ...state,
                drawers: { ...state.drawers, [action.drawer]: true },
            };
        case 'CLOSE_DRAWER':
            return {
                ...state,
                drawers: { ...state.drawers, [action.drawer]: false },
            };
        case 'RESET_EVENT_FORM':
            return {
                ...state, eventForm: {} }
            ;
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
                drawers: { ...state.drawers, isEditEventDrawer: false },
            };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map((u) =>
                    u.id === action.selectedUserForEdit.id ? action.selectedUserForEdit : u
                ),
                drawers: { ...state.drawers, isEditUserDrawer: false },
            };
        default:
        return state;
    }
}

const MainLayout = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { drawers } = state;

    // body overflow 처리 (드로어가 열리면 스크롤 방지)
    useEffect(() => {
        const { isDrawerOpen, isCreateEventDrawer, isEditEventDrawer, isCreateUserDrawer } = drawers;
        document.body.style.overflow =
            isDrawerOpen || isCreateEventDrawer || isEditEventDrawer || isCreateUserDrawer
                ? 'hidden'
                : 'auto';
            return () => {
                document.body.style.overflow = 'auto';
            };
    }, [drawers]);

    return (
        <div className='h-layout'>
            <Header state={state} dispatch={dispatch} />
            <main className='h-full bg-gray-50'>
                <Outlet context={{ state, dispatch }} />
            </main>
        </div>
    );
};

export default MainLayout;
