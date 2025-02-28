import { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';

const initialGroupForm = {
    id: '',
    name: '',
    teeTime: { start: '', estimatedDuration: '' },
    members: [],
};

export const useGroupManagement = () => {
    const { state, dispatch } = useContext(EventContext);
    const [groupForm, setGroupForm] = useState(initialGroupForm);

    // 그룹 추가/수정 드로어 열기
    const openAddGroupDrawer = (group = null) => {
        dispatch({
            type: 'OPEN_DRAWER',
            drawer: 'isGroupDrawerOpen',
        });

        if (group) {
            dispatch({
                type: 'SET_SELECTED_GROUP',
                selectedGroup: group,
            });
            setGroupForm(group);
        } else {
            const newGroup = { ...initialGroupForm, id: Date.now() };
            dispatch({
                type: 'SET_SELECTED_GROUP',
                selectedGroup: newGroup,
            });
            setGroupForm(newGroup);
        }
    };

    // 그룹 저장 (추가 또는 수정)
    const handleGroupSubmit = (newGroupData) => {
        if (!state.selectedEvent) return;

        dispatch({
            type: 'UPDATE_GOLF_GROUP',
            eventId: state.selectedEvent.id,
            group: newGroupData,
        });

        handleCloseDrawer();
    };

    // 드로어 닫기
    const handleCloseDrawer = () => {
        dispatch({
            type: 'CLOSE_DRAWER',
            drawer: 'isGroupDrawerOpen',
        });
        dispatch({
            type: 'SET_SELECTED_GROUP',
            selectedGroup: null,
        });
        setGroupForm(initialGroupForm);
    };

    return { groupForm, setGroupForm, handleGroupSubmit, handleCloseDrawer, openAddGroupDrawer };
};
