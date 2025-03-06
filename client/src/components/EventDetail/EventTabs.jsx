const EventTabs = ({ activeTab, setActiveTab, eventTypes }) => {
  const tabs = [
    // 사용자 관리 추가
    { id: 'overview', label: '개요' },
    { id: 'user', label: '사용자 관리' },
    ...(eventTypes.includes('golf') ? [{ id: 'golf', label: '골프 관리' }] : []),
    ...(eventTypes.includes('tour') ? [{ id: 'tour', label: '관광 관리' }] : []),
  ];

  return (
    // <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    // </div>
  );
};

export default EventTabs;
