import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import EventHeader from '../../components/EventDetail/EventHeader';
import EventTabs from '../../components/EventDetail/EventTabs';
import EventDetailSummary from '../../components/EventDetail/EventDetailSummary';
import UserManagement from '../../components/UserManagement';
import GolfManagement from '../../components/EventDetail/GolfManagement';
import TourManagement from '../../components/EventDetail/TourManagement';
import AddGroupDrawer from '../../components/EventDetail/AddGroupDrawer';
import GolfMemberEditDrawer from '../../components/GolfMemberEditDrawer';
import { newEventData, dummyUsers } from '../../data/eventData';
import { useEventDetail } from '../../hooks/useEventDetail';
import { useGroupManagement } from '../../hooks/useGroupManagement';
import { useMemberManagement } from '../../hooks/useMemberManagement';
import EditEventDrawer from '../../components/EditEventDrawer';
import EditUserDrawer from '../../components/EditUserDrawer';
import { FiUserCheck, FiUsers } from 'react-icons/fi';
import useDrawerSize from '../../utils/useDrawerSize';

const EventDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [eventList, setEventList] = useState(newEventData);
    const [selectedGroupDatas, setSelectedGroupDatas] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditEventDrawer, setIsEditEventDrawer] = useState(false);

    // 사용자(이벤트 상세 페이지 전용) 상태 관리
    const [userList, setUserList] = useState([]);
    const [isEditUserDrawerOpen, setIsEditUserDrawerOpen] = useState(false);
    const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
    
    const drawerSize = useDrawerSize();

    useEffect(() => {
        document.body.style.overflow = isEditEventDrawer ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isEditEventDrawer]);
    
    // 이벤트 로딩 및 사용자 정보 변환 (ID 배열 → user 객체 배열)
    useEffect(() => {
        const event = eventList.find((ev) => ev.id === id);
        if (event) {
            let users = event.users;
            if (users && users.length && typeof users[0] === 'string') {
                users = users.map(userId => dummyUsers.find(user => user.id === userId));
            }
            setUserList(users);
            setSelectedEvent({ ...event, users });
        }
    }, [id, eventList]); 

    // userList 변경 시 selectedEvent의 users도 업데이트
    useEffect(() => {
        if (selectedEvent) {
            setSelectedEvent(prev => ({ ...prev, users: userList }));
        }
    }, [userList]);


    const { groupForm, setGroupForm, handleGroupSubmit, handleCloseDrawer, openAddGroupDrawer } = useGroupManagement(
        selectedEvent,
        setSelectedEvent,
        setSelectedGroupDatas,
        setIsDrawerOpen,
        setDrawerContent
    );

    const { memberForm, setMemberForm, isMemberEditOpen, setIsMemberEditOpen, handleAddMember, handleEditMember, handleMemberSubmit } = useMemberManagement(
        selectedEvent,
        setSelectedEvent,
        setEventList,
        selectedGroupDatas,
        setSelectedGroupDatas
    );

    const { onDropMember, handleDeleteGroup } = useEventDetail(selectedEvent, setSelectedEvent, eventList, setEventList);

    // 사용자 할당 업데이트: 개별 사용자에 대해 할당 상태 변경 (할당 해제는 null 전달)
    const onAssignUser = (user, categoryKey) => {
        const updatedUsers = userList.map(u => {
        if (u.id === user.id) {
            return { ...u, assignments: categoryKey ? [categoryKey] : [] };
        }
        return u;
        });
        setUserList(updatedUsers);
    };

    // 사용자 정보 업데이트 (예: 사용자 편집 후)
    const handleUpdateUser = (updatedUser) => {
        const updatedUsers = userList.map(u => (u.id === updatedUser.id ? updatedUser : u));
        setUserList(updatedUsers);
        setIsEditUserDrawerOpen(false);
    };

    // userList에서 해당 유저 제거
    const handleDeleteUser = (userId) => {
        setUserList(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    // 수정된 이벤트 데이터를 업데이트
    const handleUpdateEvent = (updatedEvent) => {
        setSelectedEvent(updatedEvent);
        setEventList(prevList =>
            prevList.map(ev => (ev.id === updatedEvent.id ? updatedEvent : ev))
        );
        setIsEditEventDrawer(false);
    };

    const assignmentCategories = [
        {
            key: 'staff',
            label: '스태프',
            style: 'bg-blue-500',
            hoverStyle: 'hover:bg-blue-600',
            icon: <FiUserCheck />,
        },
        {
            key: 'golf',
            label: '골프',
            style: 'bg-green-500',
            hoverStyle: 'hover:bg-green-600',
            icon: <FiUsers />,
        },
        {
            key: 'tour',
            label: '관광 ',
            style: 'bg-yellow-500',
            hoverStyle: 'hover:bg-yellow-600',
            icon: <FiUsers />,
        },
    ];
    
    if (!selectedEvent) {
        return <div>이벤트를 찾을 수 없습니다.</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}> 
            <div className="min-h-screen bg-gray-50">
                <EventHeader event={selectedEvent} onEdit={() => setIsEditEventDrawer(true)} />  
                <div className="container mx-auto px-4 py-6">
                    <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} eventTypes={selectedEvent.type} />
                    <div className="mt-6">
                        {activeTab === 'overview' && <EventDetailSummary event={selectedEvent} />}
                        {activeTab === 'user' && (
                            <UserManagement
                                users={userList}
                                assignmentCategories={assignmentCategories}
                                onAssignUser={onAssignUser}
                                onEditUser={(user) => {
                                    setSelectedUserForEdit(user);
                                    setIsEditUserDrawerOpen(true);
                                }}
                                onDeleteUser={handleDeleteUser}
                            />
                        )}
                        {activeTab === 'golf' && (
                            <GolfManagement
                                data={selectedEvent.subEvents?.find((sub) => sub.type === 'golf') || { groups: [] }}
                                users={selectedEvent.users}
                                onAddGroup={() => openAddGroupDrawer('golf')}
                                onEditGroup={(group) => openAddGroupDrawer('golf', group)}
                                onDeleteGroup={(groupId) => handleDeleteGroup(groupId)}
                                onAddMember={(group) => handleAddMember(group)}
                                onEditMember={handleEditMember}
                                onDropMember={onDropMember}
                            />
                        )}
                        {activeTab === 'tour' && (
                            <TourManagement
                                data={selectedEvent.subEvents?.find((sub) => sub.type === 'tour') || { busGroups: [], destinations: [] }}
                                onAddBusGroup={() => openAddGroupDrawer('bus')}
                                onAddDestination={() => openAddGroupDrawer('destination')}
                            />
                        )}
                    </div>
                </div>

                {/* {isDrawerOpen && ( */}
                    <Drawer open={isDrawerOpen} onClose={handleCloseDrawer} duration="300" direction="right" size={480} className="overflow-y-auto">
                        <AddGroupDrawer
                            type={drawerContent}
                            groupForm={groupForm}
                            setGroupForm={setGroupForm}
                            onSubmit={handleGroupSubmit}
                            onClose={handleCloseDrawer}
                        />
                    </Drawer>
                {/* )} */}

                {/* {isMemberEditOpen && ( */}
                    <Drawer
                        open={isMemberEditOpen}
                        onClose={() => {
                            setIsMemberEditOpen(false);
                            setMemberForm(null);
                        }}
                        direction="right"
                        size={drawerSize}
                        duration="300"
                        className="overflow-y-auto"
                    >
                        <GolfMemberEditDrawer
                            event={selectedEvent}
                            memberData={memberForm}
                            onClose={() => {
                                setIsMemberEditOpen(false);
                                setMemberForm(null);
                            }}
                            onSubmit={(updatedMember) => handleMemberSubmit(updatedMember)}
                        />
                    </Drawer>
                {/* )} */}

                <EditEventDrawer
                    isOpen={isEditEventDrawer}
                    event={selectedEvent}
                    onClose={() => setIsEditEventDrawer(false)}
                    onUpdate={handleUpdateEvent}
                />


                {/* 사용자 수정 드로어 */}
                {selectedUserForEdit && (
                    <EditUserDrawer
                        size={drawerSize}
                        isOpen={isEditUserDrawerOpen}
                        initialUser={selectedUserForEdit}
                        onClose={() => setIsEditUserDrawerOpen(false)}
                        onSubmit={handleUpdateUser}
                    />
                )}
            </div>
        </DndProvider>
    );
};

export default EventDetail;