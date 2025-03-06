import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import SearchBar from '../../components/SearchBar';
import EventCard from '../../components/EventCard';
import EventDetailDrawer from '../../components/EventDetail/EventDetailDrawer';
import EditEventDrawer from '../../components/EditEventDrawer';
import useDrawerSize from '../../utils/useDrawerSize';
import { EventContext } from '../../context/EventContext';

const Dashboard = () => {
    const { state, dispatch } = useContext(EventContext);
    const { events, drawers, selectedEvent } = state;
    const navigate = useNavigate();
    const drawerSize = useDrawerSize();

    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleEventClick = (event) => {
        dispatch({ type: 'SET_SELECTED_EVENT', event });
        dispatch({ type: 'OPEN_DRAWER', drawer: 'isDrawerOpen' });
    };

    const handleViewFullScreen = () => {
        if (selectedEvent) {
            navigate(`/event/${selectedEvent.id}`);
            dispatch({ type: 'CLOSE_DRAWER', drawer: 'isDrawerOpen' });
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

    const currentEvents = activeTab === 'all' ? filteredEvents : eventCategories[activeTab] || [];

    const handleUpdateEvent = (updatedEvent) => {
        dispatch({ type: 'UPDATE_EVENT', event: updatedEvent });
        dispatch({ type: 'OPEN_DRAWER', drawer: 'isDrawerOpen' });
    };

    const handleEditFromDetail = () => {
        dispatch({ type: 'CLOSE_DRAWER', drawer: 'isDrawerOpen' });
        dispatch({ type: 'OPEN_DRAWER', drawer: 'isEditEventDrawer' });
    };

    return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div
        className={`sticky z-50 top-0 left-0 transition-all duration-300 ${
            isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
        >
            <SearchBar onSearch={setSearchQuery} isScrolled={isScrolled} />
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
            <EventDetailDrawer
                isOpen={drawers.isDrawerOpen}
                onEdit={handleEditFromDetail}
                selectedEvent={selectedEvent}
                onClose={() => dispatch({ type: 'CLOSE_DRAWER', drawer: 'isDrawerOpen' })}
                onViewFullScreen={handleViewFullScreen}
                size={drawerSize}
            />

            <EditEventDrawer
                key={selectedEvent.id} 
                isOpen={drawers.isEditEventDrawer}
                event={selectedEvent}
                searchUsers={state.users}
                onClose={() => { 
                    dispatch({ type: 'CLOSE_DRAWER', drawer: 'isEditEventDrawer' });
                    dispatch({ type: 'RESET_EVENT_FORM' });
                }}
                onUpdate={handleUpdateEvent}
                size={drawerSize}
            />
        </>
        )}
    </div>
    );
};

export default Dashboard;
