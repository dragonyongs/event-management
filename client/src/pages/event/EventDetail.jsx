import { useEffect, useState } from 'react';
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
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { newEventData, sampleEventData } from '../../data/eventData';
import { dummyUsers } from '../../data/eventData';
import { useEventDetail } from '../../hooks/useEventDetail';
import { useGroupManagement } from '../../hooks/useGroupManagement';
import { useMemberManagement } from '../../hooks/useMemberManagement';
import EditEventDrawer from '../../components/EditEventDrawer';
import { FiUserCheck, FiUsers } from 'react-icons/fi';

const EventDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [eventList, setEventList] = useState(newEventData);
    const [selectedGroupDatas, setSelectedGroupDatas] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditEventDrawer, setIsEditEventDrawer] = useState(false);
    const [assignments, setAssignments] = useState({});

    // 전체 등록된 사용자 > 이벤트 생성 > 

    useEffect(() => {
        document.body.style.overflow = isEditEventDrawer ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isEditEventDrawer]);
    
    // useEffect(() => {
    //     const event = eventList.find((event) => event.id === id);
    //     if (event) {
    //         const golfSubEvent = event.subEvents?.find((sub) => sub.type === 'golf');
    //         setSelectedEvent((prev) => ({
    //             ...event,
    //             golfDetails: golfSubEvent
    //                 ? {
    //                     venue: golfSubEvent.venue,
    //                     groups: prev?.golfDetails?.groups || golfSubEvent.groups || [],
    //                 }
    //                 : null,
    //         }));
    //     }
    // }, [id, eventList]);

    useEffect(() => {
        const event = eventList.find((event) => event.id === id);
        if (event) {
            setSelectedEvent(event);  // subEvents를 그대로 유지
        }
    }, [id, eventList]);

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

    const onAssignUser = (user, categoryKey) => {
        setAssignments(prev => ({ ...prev, [user.id]: categoryKey }));
    };
    
    if (!selectedEvent) {
        return <div>이벤트를 찾을 수 없습니다.</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}> {/* DndProvider로 감싸기 */}
            <div className="min-h-screen bg-gray-50">
                <EventHeader event={selectedEvent} onEdit={() => setIsEditEventDrawer(true)} />  
                <div className="container mx-auto px-4 py-6">
                    <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} eventTypes={selectedEvent.type} />
                    <div className="mt-6">
                        {activeTab === 'overview' && <EventDetailSummary event={selectedEvent} />}
                        {activeTab === 'user' && (<UserManagement initialUsers={dummyUsers} assignmentCategories={assignmentCategories} onAssignUser={onAssignUser} />)}
                        {activeTab === 'golf' && (
                            // <GolfManagement
                            //     data={selectedEvent.golfDetails}
                            //     onAddGroup={() => openAddGroupDrawer('golf')}
                            //     onEditGroup={(group) => openAddGroupDrawer('golf', group)}
                            //     onDeleteGroup={(groupId) => handleDeleteGroup(groupId)}
                            //     onAddMember={(group) => handleAddMember(group)}
                            //     onEditMember={handleEditMember}
                            //     onDropMember={onDropMember}
                            // />
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
                            // <TourManagement
                            //     data={selectedEvent.tourDetails}
                            //     onAddBusGroup={() => openAddGroupDrawer('bus')}
                            //     onAddDestination={() => openAddGroupDrawer('destination')}
                            // />
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
                        size={480}
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
            </div>
        </DndProvider>
    );
};

export default EventDetail;