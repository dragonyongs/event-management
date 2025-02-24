import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventHeader from '../../components/EventDetail/EventHeader';
import EventTabs from '../../components/EventDetail/EventTabs';
import EventDetailSummary from '../../components/EventDetail/EventDetailSummary';
import GolfManagement from '../../components/EventDetail/GolfManagement';
import TourManagement from '../../components/EventDetail/TourManagement';
import { sampleEventData } from '../../data/eventData';
import AddGroupDrawer from '../../components/EventDetail/AddGroupDrawer';
import MemberEditDrawer from '../../components/MemberEditDrawer';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const initialGroupForm = {
    id: '',
    name: '',
    teeTime: { start: '', estimatedDuration: '' },
    members: [],
};

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
        
        if (eventList) {
            setSelectedEvent((prev) => ({
                ...event, // 새로 찾은 event 정보를 기본값으로 유지
                golfDetails: {
                    ...event.golfDetails,
                    groups: prev?.golfDetails?.groups || event.golfDetails.groups, // 기존 그룹 정보 유지
                }
            }));
        }

    }, [id, eventList]); 
    

    // 멤버 편집 관련 상태를 최상위로 끌어올림
    const [memberForm, setMemberForm] = useState(null);
    const [isMemberEditOpen, setIsMemberEditOpen] = useState(false);
    
    // 드로우 내부 폼 상태를 최상위로 올림
    const [groupForm, setGroupForm] = useState(initialGroupForm);

    // 실제 구현시 API로 데이터 fetch
    // const eventData = eventList.find((event) => event.id === id);

    const openAddGroupDrawer = (type, group) => {
        setDrawerContent(type);

        if (group) {
            setSelectedGroupDatas(group);
            setGroupForm(group);
        } else {
            const newInitialGroupForm = {
                ...initialGroupForm,
                id: Date.now(),
            }

            setSelectedGroupDatas(newInitialGroupForm);
            setGroupForm(newInitialGroupForm);
        }
        setIsDrawerOpen(true);
    };

    // 새 그룹 데이터를 받아 해당 이벤트의 그룹 목록에 추가하는 함수
    const handleGroupSubmit = (newGroupData) => {
    
        if (!selectedEvent) return;
    
        // 기존 그룹 중에서 newGroupData와 ID가 일치하는 그룹 찾기
        const groupExists = selectedEvent.golfDetails.groups.some(group => group.id === newGroupData.id);
    
        // 그룹을 업데이트하거나 추가하는 로직
        const updatedGroups = groupExists
            ? selectedEvent.golfDetails.groups.map(group =>
                group.id === newGroupData.id ? newGroupData : group
            )
            : [...selectedEvent.golfDetails.groups, newGroupData]; // 기존 그룹에 추가
    
    
        setSelectedEvent(prev => ({
            ...prev,
            golfDetails: { ...prev.golfDetails, groups: updatedGroups }
        }));
    
        handleCloseDrawer(); // 드로어 닫기 및 상태 초기화
    };
    

    // 드로어 닫을 때 모든 관련 상태 초기화
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedGroupDatas(null);
        setGroupForm(initialGroupForm);
    };

    const handleAddMember = (group) => {
        setSelectedGroupDatas(group);
        
        const newMember = {
            id: Date.now(),
            name: '',
            status: 'pending',
            handicap: 0,
            reason: '',
            score: { total: '', holes: [] },
        };
        setMemberForm(newMember);
        setIsMemberEditOpen(true);
    };
    
    const handleEditMember = (group, member) => {
        setSelectedGroupDatas(group);
        setMemberForm(member);
        setIsMemberEditOpen(true);
    };

    const handleMemberSubmit = (updatedMember) => {       
        if (!selectedGroupDatas?.id) {
            console.error("groupForm ID가 없습니다.");
            return;
        }
    
        setSelectedEvent(prev => {
            if (!prev) return prev;
    
            const newGroups = prev.golfDetails.groups.map(group => {
                if (group.id === selectedGroupDatas.id) {
                    const updatedMembers = group.members?.some(member => member.id === updatedMember.id)
                        ? group.members.map(member => member.id === updatedMember.id ? updatedMember : member)
                        : [...(group.members || []), updatedMember];
    
                    return { 
                        ...group, 
                        members: updatedMembers // 새로운 배열 반환
                    };
                }
                return group;
            });
    
            // `selectedEvent` 업데이트 후 `setEventList`로 반영
            const updatedEvent = {
                ...prev,
                golfDetails: {
                    ...prev.golfDetails,
                    groups: newGroups // 새로운 그룹 배열
                }
            };
    
            setEventList(prevList => prevList.map(event => 
                event.id === selectedEvent.id ? updatedEvent : event
            ));
    
            return updatedEvent; // 리턴된 상태로 업데이트
        });
    
        // 멤버 폼 초기화
        setMemberForm(null);
        setIsMemberEditOpen(false);
    };
    
    if (!selectedEvent) {
        return <div>이벤트를 찾을 수 없습니다.</div>;
    }
    
    // onDeleteGroup에서 전달 받은 groupId를 이용해 해당 그룹을 삭제하는 함수
    const handleDeleteGroup = (groupId) => {
        const updatedEvent = {
            ...selectedEvent,
            golfDetails: {
                ...selectedEvent.golfDetails,
                groups: selectedEvent.golfDetails.groups.filter(
                    (group) => group.id !== groupId
                ),
            },
        };
        const updatedEventList = eventList.map((event) =>
            event.id === id ? updatedEvent : event
        );
        setEventList(updatedEventList);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <EventHeader event={selectedEvent} />
            <div className="container mx-auto px-4 py-6">
                <EventTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    eventTypes={selectedEvent.type}
                />
                <div className="mt-6">
                    {activeTab === 'overview' && (
                        <EventDetailSummary event={selectedEvent} />
                    )}
                    {activeTab === 'golf' && (
                        <GolfManagement
                            data={selectedEvent.golfDetails}
                            onAddGroup={() => openAddGroupDrawer('golf')}
                            onEditGroup={(group) => openAddGroupDrawer('golf', group)}
                            onDeleteGroup={(groupId) => handleDeleteGroup(groupId)}   
                            onAddMember={(group) =>handleAddMember(group)}
                            onEditMember={handleEditMember}
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

            {/* 조 추가 드로우 */}
            {isDrawerOpen && 
                <Drawer
                    open={isDrawerOpen}
                    onClose={handleCloseDrawer}
                    direction="right"
                    size={480}
                    className="overflow-y-auto"
                >
                    <AddGroupDrawer
                        type={drawerContent}
                        groupForm={groupForm}
                        setGroupForm={setGroupForm}
                        onSubmit={handleGroupSubmit}
                        onClose={handleCloseDrawer}

                    />
                </Drawer>
                
            }

            {/* 멤버 편집 드로어: 그룹 드로어와 독립적으로 렌더링 */}
            {isMemberEditOpen && 
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
                        onSubmit={(updatedMember) => handleMemberSubmit(updatedMember)} // 부모 컴포넌트에서 전달한 함수 호출
                        setSelectedEvent={setSelectedEvent}  // setSelectedEvent 전달
                        setEventList={setEventList}  // setEventList 전달
                    />

                </Drawer>
            }
        </div>
    );
};

export default EventDetail;