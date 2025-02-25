import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd'; // DndProvider 임포트
import { HTML5Backend } from 'react-dnd-html5-backend'; // HTML5Backend 임포트
import EventHeader from '../../components/EventDetail/EventHeader';
import EventTabs from '../../components/EventDetail/EventTabs';
import EventDetailSummary from '../../components/EventDetail/EventDetailSummary';
import GolfManagement from '../../components/EventDetail/GolfManagement';
import TourManagement from '../../components/EventDetail/TourManagement';
import AddGroupDrawer from '../../components/EventDetail/AddGroupDrawer';
import MemberEditDrawer from '../../components/MemberEditDrawer';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { sampleEventData } from '../../data/eventData';
import { useEventDetail } from '../../hooks/useEventDetail';
import { useGroupManagement } from '../../hooks/useGroupManagement';
import { useMemberManagement } from '../../hooks/useMemberManagement';

const EventDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [eventList, setEventList] = useState(sampleEventData);
    const [selectedGroupDatas, setSelectedGroupDatas] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const event = eventList.find((event) => event.id === id);
        if (event) {
            setSelectedEvent((prev) => ({
                ...event,
                golfDetails: {
                    ...event.golfDetails,
                    groups: prev?.golfDetails?.groups || event.golfDetails.groups,
                },
            }));
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

    if (!selectedEvent) {
        return <div>이벤트를 찾을 수 없습니다.</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}> {/* DndProvider로 감싸기 */}
            <div className="min-h-screen bg-gray-50">
                <EventHeader event={selectedEvent} />
                <div className="container mx-auto px-4 py-6">
                    <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} eventTypes={selectedEvent.type} />
                    <div className="mt-6">
                        {activeTab === 'overview' && <EventDetailSummary event={selectedEvent} />}
                        {activeTab === 'golf' && (
                            <GolfManagement
                                data={selectedEvent.golfDetails}
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
                                data={selectedEvent.tourDetails}
                                onAddBusGroup={() => openAddGroupDrawer('bus')}
                                onAddDestination={() => openAddGroupDrawer('destination')}
                            />
                        )}
                    </div>
                </div>

                {isDrawerOpen && (
                    <Drawer open={isDrawerOpen} onClose={handleCloseDrawer} direction="right" size={480} className="overflow-y-auto">
                        <AddGroupDrawer
                            type={drawerContent}
                            groupForm={groupForm}
                            setGroupForm={setGroupForm}
                            onSubmit={handleGroupSubmit}
                            onClose={handleCloseDrawer}
                        />
                    </Drawer>
                )}

                {isMemberEditOpen && (
                    <Drawer
                        open={isMemberEditOpen}
                        onClose={() => {
                            setIsMemberEditOpen(false);
                            setMemberForm(null);
                        }}
                        direction="right"
                        size={480}
                        className="overflow-y-auto"
                    >
                        <MemberEditDrawer
                            memberData={memberForm}
                            onClose={() => {
                                setIsMemberEditOpen(false);
                                setMemberForm(null);
                            }}
                            onSubmit={(updatedMember) => handleMemberSubmit(updatedMember)}
                        />
                    </Drawer>
                )}
            </div>
        </DndProvider>
    );
};

export default EventDetail;