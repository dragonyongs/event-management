import { useState } from "react";
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import SearchBar from "../../components/SearchBar";
import EventCard from "../../components/EventCard";
import { events } from "../../data/eventData";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const eventCategories = {
        ongoing: filteredEvents.filter((event) => event.status === "ongoing"),
        completed: filteredEvents.filter((event) => event.status === "completed"),
        upcoming: filteredEvents.filter((event) => event.status === "upcoming"),
    };

    const currentEvents = activeTab === "all" ? Object.values(eventCategories).flat() : eventCategories[activeTab] || [];
    const itemsInLastRow = currentEvents.length % 4;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            <Title />
            <SearchBar onSearch={setSearchQuery} />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Tailwind 반응형 적용 */}
            <main className="p-4 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
                {currentEvents.map((event) => {
                    return (
                        <div
                            key={event.id}
                            className="col-span-1"
                        >
                            <EventCard event={event} />
                        </div>
                    );
                })}
                {filteredEvents.length === 0 && <p className="text-gray-500 col-span-full">검색 결과가 없습니다.</p>}
            </main>
        </div>
    );
};

export default Dashboard;
