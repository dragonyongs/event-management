import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventHeader from '../../components/EventDetail/EventHeader';
import EventTabs from '../../components/EventDetail/EventTabs';
import EventDetailSummary from '../../components/EventDetail/EventDetailSummary';
import GolfManagement from '../../components/EventDetail/GolfManagement';
import TourManagement from '../../components/EventDetail/TourManagement';
import { sampleEventData } from '../../data/eventData';
import AddGroupDrawer from '../../components/EventDetail/AddGroupDrawer';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const EventDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [eventList, setEventList] = useState(sampleEventData);

    // 실제 구현시 API로 데이터 fetch
    const eventData = eventList.find((event) => event.id === id);

    const openAddGroupDrawer = (type) => {
        setDrawerContent(type);
        setIsDrawerOpen(true);
    };

    // 새 그룹 데이터를 받아 해당 이벤트의 그룹 목록에 추가하는 함수
    const handleGroupSubmit = (newGroupData) => {
        let updatedEvent;
        if (activeTab === 'golf') {
            // 기존 그룹 목록에서 groupData.id와 일치하는 그룹이 있는지 확인합니다.
            const groupExists = eventData.golfDetails.groups.some(
                (group) => group.id === newGroupData.id
            );
    
            if (groupExists) {
                // 존재한다면 해당 그룹을 업데이트합니다.
                    const updatedGroups = eventData.golfDetails.groups.map((group) =>
                    group.id === newGroupData.id ? newGroupData : group
                );
                updatedEvent = {
                    ...eventData,
                    golfDetails: {
                    ...eventData.golfDetails,
                    groups: updatedGroups,
                    },
                };
            } else {
            // 존재하지 않는다면 새 그룹으로 추가합니다.
                updatedEvent = {
                    ...eventData,
                    golfDetails: {
                    ...eventData.golfDetails,
                    groups: [...eventData.golfDetails.groups, newGroupData],
                    },
                };
            }
        } else if (activeTab === 'tour') {
            // 예시: bus 또는 destination 타입에 따라 업데이트
            if (drawerContent === 'bus') {
                updatedEvent = {
                    ...eventData,
                    tourDetails: {
                        ...eventData.tourDetails,
                        busGroups: [...(eventData.tourDetails.busGroups || []), newGroupData]
                    }
                };
            } else if (drawerContent === 'destination') {
                updatedEvent = {
                    ...eventData,
                    tourDetails: {
                        ...eventData.tourDetails,
                        destinations: [...(eventData.tourDetails.destinations || []), newGroupData]
                    }
                };
            }
        }
        // 업데이트된 이벤트를 eventList에 반영
        const updatedEventList = eventList.map((event) =>
            event.id === id ? updatedEvent : event
        );
        setEventList(updatedEventList);
        setIsDrawerOpen(false);
    };

    if (!eventData) {
        return <div>이벤트를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <EventHeader event={eventData} />
            <div className="container mx-auto px-4 py-6">
                <EventTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    eventTypes={eventData.type}
                />
                <div className="mt-6">
                    {activeTab === 'overview' && (
                        <EventDetailSummary event={eventData} />
                    )}
                    {activeTab === 'golf' && (
                        <GolfManagement
                            data={eventData.golfDetails}
                            groups={eventData.golfDetails.groups}
                            onAddGroup={() => openAddGroupDrawer('golf')}
                            onEditGroup={(group) => openAddGroupDrawer('golf', group)}
                        />
                    )}
                    {activeTab === 'tour' && (
                        <TourManagement
                            data={eventData.tourDetails}
                            onAddBusGroup={() => openAddGroupDrawer('bus')}
                            onAddDestination={() => openAddGroupDrawer('destination')}
                        />
                    )}
                </div>
            </div>
            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                direction="right"
                size={480}
                className="overflow-y-auto"
            >
                <AddGroupDrawer
                    type={drawerContent}
                    onSubmit={handleGroupSubmit}
                    onClose={() => setIsDrawerOpen(false)}
                />
            </Drawer>
        </div>
    );
};

export default EventDetail;