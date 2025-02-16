import React from 'react';

const eventTypeOptions = [
  { id: 'tour', name: '관광', icon: '🏞️' },
  { id: 'golf', name: '골프', icon: '⛳' },
  { id: 'etc', name: '기타', icon: '🎉' },
];

const EventTypeSelector = ({ selectedTypes, onChange }) => {
  const toggleType = (typeId) => {
    let newSelected;
    if (selectedTypes.includes(typeId)) {
      newSelected = selectedTypes.filter((id) => id !== typeId);
    } else {
      if (selectedTypes.length >= 2) return; // 최대 2개까지 선택
      newSelected = [...selectedTypes, typeId];
    }
    onChange(newSelected);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {eventTypeOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => toggleType(option.id)}
          className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedTypes.includes(option.id)
              ? 'border-blue-500 bg-blue-100'
              : 'border-gray-300'
          }`}
        >
          <span className="text-2xl">{option.icon}</span>
          <span className="mt-2 text-sm font-medium">{option.name}</span>
        </button>
      ))}
    </div>
  );
};

export default EventTypeSelector;
