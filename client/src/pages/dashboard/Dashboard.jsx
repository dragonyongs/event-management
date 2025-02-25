import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import Tabs from '../../components/Tabs';
import SearchBar from '../../components/SearchBar';
import EventCard from '../../components/EventCard';
import { newEventData, sampleEventData } from '../../data/eventData';
import EventDetailDrawer from '../../components/EventDetail/EventDetailDrawer';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import EditEventDrawer from '../../components/EditEventDrawer';

const Dashboard = () => {
    const [events, setEvents] = useState(newEventData);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditEventDrawer, setIsEditEventDrawer] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen || isCreateDrawerOpen || isEditEventDrawer ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isDrawerOpen, isCreateDrawerOpen, isEditEventDrawer]);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleEventClick = (event) => {
        console.log("handleEventClick", event);
        setSelectedEvent(event);
        setIsDrawerOpen(true);
    };

    const handleViewFullScreen = () => {
        if (selectedEvent) {
        navigate(`/event/${selectedEvent.id}`);
        setIsDrawerOpen(false);
        }
    };

    const filteredEvents = events
        .filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
        if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
        if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
        return 0;
        });

    const eventCategories = {
        ongoing: filteredEvents.filter((event) => event.status === 'ongoing'),
        completed: filteredEvents.filter((event) => event.status === 'completed'),
        upcoming: filteredEvents.filter((event) => event.status === 'upcoming'),
    };

    const currentEvents =
        activeTab === 'all' ? filteredEvents : eventCategories[activeTab] || [];

        const handleCreateEvent = (newEventData) => {
            const newEvent = {
                id: `evt_${Date.now()}`, // 유니크한 ID 생성
                title: newEventData.title,
                startDate: newEventData.startDate,
                endDate: newEventData.endDate,
                status: 'upcoming',
                images: newEventData.images || [], // images 배열로 초기화
                type: newEventData.type,
                users: newEventData.users || [], // 유저 배열로 초기화
                staffs: newEventData.staffs || [],
                description: newEventData.description,
                subEvents: newEventData.type.map((t) => ({
                    type: t,
                    schedule: [],
                    ...(t === 'golf' ? { venue: '', groups: [] } : {}),
                    ...(t === 'tour' ? { busGroups: [], destinations: [] } : {}),
                })),
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            setIsCreateDrawerOpen(false);
        };

    // 수정된 이벤트 데이터를 업데이트
    const handleUpdateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
        );
        setIsEditEventDrawer(false);
        setIsDrawerOpen(true);
    };

    // 상세 드로어에서 수정 버튼 클릭 시 호출되는 함수
    const handleEditFromDetail = () => {
        console.log("handleEditFromDetail", selectedEvent);

        setIsDrawerOpen(false);
        setIsEditEventDrawer(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div
            className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-sm'
                : 'bg-transparent'
            }`}
        >
            <Title
            isCreateDrawerOpen={isCreateDrawerOpen}
            setIsCreateDrawerOpen={setIsCreateDrawerOpen}
            handleCreateEvent={handleCreateEvent}
            />
            <SearchBar onSearch={setSearchQuery} />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <main className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentEvents.map((event) => (
                <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="cursor-pointer"
                >
                <EventCard event={event} />
                </div>
            ))}
            </div>
            {currentEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
                <p className="text-gray-400 text-sm mt-2">
                다른 검색어로 시도해보세요
                </p>
            </div>
            )}
        </main>
        {selectedEvent && (
            <>
                <Drawer
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    direction="right"
                    size={480}
                    duration="300"
                    className="overflow-hidden"
                >
                    <EventDetailDrawer
                        onEdit={handleEditFromDetail}
                        event={selectedEvent}
                        onClose={() => setIsDrawerOpen(false)}
                        onViewFullScreen={handleViewFullScreen}
                    />
                </Drawer>

                <EditEventDrawer
                    key={selectedEvent.id} 
                    isOpen={isEditEventDrawer}
                    event={selectedEvent}
                    onClose={() => setIsEditEventDrawer(false)}
                    onUpdate={handleUpdateEvent}
                />
            </>
        )}

        </div>
    );
};

export default Dashboard;
