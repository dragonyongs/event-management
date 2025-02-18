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
    name: '',
    capacity: '',
    time: '',
    description: '',
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

    // 멤버 편집 관련 상태를 최상위로 끌어올림
    const [memberForm, setMemberForm] = useState(null);
    const [isMemberEditOpen, setIsMemberEditOpen] = useState(false);
    
    // 드로우 내부 폼 상태를 최상위로 올림
    const [groupForm, setGroupForm] = useState(initialGroupForm);

    // 실제 구현시 API로 데이터 fetch
    const eventData = eventList.find((event) => event.id === id);

    const openAddGroupDrawer = (type, group) => {
        setDrawerContent(type);
        if (group) {
            setSelectedGroupDatas(group);
            setGroupForm(group);
        } else {
            setSelectedGroupDatas(null);
            setGroupForm(initialGroupForm);
        }
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
        handleCloseDrawer(); // 닫으면서 상태 초기화
    };

    // 드로어 닫을 때 모든 관련 상태 초기화
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedGroupDatas(null);
        setGroupForm(initialGroupForm);
    };

    // 멤버 추가 함수 (최상위로 리프팅)
    const handleAddMember = (member) => {
        const newMember = {
            id: Date.now(),
            name: member?.name || '',
            status: 'pending',
            handicap: 0,
            reason: '',
            score: { total: '', holes: [] },
        };
        setMemberForm(newMember);
        setIsMemberEditOpen(true);
    };

    // 상위에서 멤버 편집 드로어를 제어하는 함수
    const handleEditMember = (groupId, member) => {
        // 필요하다면 groupId를 이용해 어떤 그룹의 멤버인지 구분
        setMemberForm(member);
        setIsMemberEditOpen(true);
    };

    // 멤버 정보 수정 완료 후 처리
    const handleMemberSubmit = (updatedMember) => {
        // groupForm의 members 배열 업데이트
        setGroupForm(prevGroup => {
            // 이미 존재하는 멤버인지 확인
            const memberExists = prevGroup.members.some(m => m.id === updatedMember.id);
            
            // members 배열 업데이트
            const updatedMembers = memberExists
                ? prevGroup.members.map(m => m.id === updatedMember.id ? updatedMember : m)
                : [...prevGroup.members, updatedMember];
    
            const updatedGroup = {
                ...prevGroup,
                members: updatedMembers
            };
    
            // eventList 상태 업데이트
            setEventList(prevEventList => {
                return prevEventList.map(event => {
                    if (event.id === id) {
                        // 현재 활성화된 탭이 golf인 경우
                        if (activeTab === 'golf') {
                            const updatedGroups = event.golfDetails.groups.map(group => {
                                // 현재 수정 중인 그룹인 경우
                                if (group.id === updatedGroup.id) {
                                    return updatedGroup;
                                }
                                return group;
                            });
    
                            return {
                                ...event,
                                golfDetails: {
                                    ...event.golfDetails,
                                    groups: updatedGroups
                                }
                            };
                        }
                        // 추후 tour 탭에 대한 처리도 추가 가능
                    }
                    return event;
                });
            });
    
            return updatedGroup;
        });
    
        // 멤버 편집 드로어 닫기
        setMemberForm(null);
        setIsMemberEditOpen(false);
    };
    
    if (!eventData) {
        return <div>이벤트를 찾을 수 없습니다.</div>;
    }
    
    // onDeleteGroup에서 전달 받은 groupId를 이용해 해당 그룹을 삭제하는 함수
    const handleDeleteGroup = (groupId) => {
        const updatedEvent = {
            ...eventData,
            golfDetails: {
                ...eventData.golfDetails,
                groups: eventData.golfDetails.groups.filter(
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
                            onAddGroup={() => openAddGroupDrawer('golf')}
                            onEditGroup={(group) => openAddGroupDrawer('golf', group)}
                            onDeleteGroup={(groupId) => handleDeleteGroup(groupId)}   
                            onAddMember={handleAddMember}
                            onEditMember={handleEditMember}
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
                    onAddMember={handleAddMember}
                    onEditMember={handleEditMember}
                />
            </Drawer>


            {/* 멤버 편집 드로어: 그룹 드로어와 독립적으로 렌더링 */}
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
                onSubmit={handleMemberSubmit}
                />
            </Drawer>
        </div>
    );
};

export default EventDetail;