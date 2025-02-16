const tabs = [
  { id: 'all', label: '전체' },
  { id: 'ongoing', label: '진행 중' },
  { id: 'completed', label: '완료' },
  { id: 'upcoming', label: '예정' },
];

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200
                                      relative ${
                                        activeTab === tab.id
                                          ? 'text-blue-600'
                                          : 'text-gray-500 hover:text-gray-700'
                                      }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
