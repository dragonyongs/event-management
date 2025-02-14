import { useState } from "react";

const tabs = [
    { id: "all", label: "전체" },
    { id: "ongoing", label: "진행 중인 이벤트" },
    { id: "completed", label: "완료된 이벤트" },
    { id: "upcoming", label: "진행 예정 이벤트" },
];

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-full bg-white border-b border-b-slate-100">
            <div className="flex space-x-4 px-4 py-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {tab.label}
                </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
