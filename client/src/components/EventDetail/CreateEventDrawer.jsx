import { useState } from 'react';
import { thumbnailOptions } from '../data/eventData';

const CreateEventDrawer = ({ onClose, onCreateEvent }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState(1);
  const [createEventData, setCreateEventData] = useState({
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    status: '',
    thumbnail: null,
    type: [],
    users: 0,
    steps: 0,
    location: '',
    description: '',
  });

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setStep(2);
    setCreateEventData({ ...createEventData, type: [type] });
  };

  const handleSubmit = () => {
    onCreateEvent(createEventData);
    onClose();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {step === 1 ? '이벤트 유형 선택' : '이벤트 정보 입력'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {step === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {thumbnailOptions.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="p-6 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
              >
                <span className="text-4xl mb-2 block">{type.icon}</span>
                <span className="text-gray-900 font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이벤트 제목
              </label>
              <input
                type="text"
                value={createEventData.title}
                onChange={(e) =>
                  setCreateEventData({
                    ...createEventData,
                    title: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="이벤트 제목을 입력하세요"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  시작일
                </label>
                <input
                  type="date"
                  value={createEventData.startDate}
                  onChange={(e) =>
                    setCreateEventData({
                      ...createEventData,
                      startDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종료일
                </label>
                <input
                  type="date"
                  value={createEventData.endDate}
                  onChange={(e) =>
                    setCreateEventData({
                      ...createEventData,
                      endDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                장소
              </label>
              <input
                type="text"
                value={createEventData.location}
                onChange={(e) =>
                  setCreateEventData({
                    ...createEventData,
                    location: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="장소를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                value={createEventData.description}
                onChange={(e) =>
                  setCreateEventData({
                    ...createEventData,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="이벤트에 대한 설명을 입력하세요"
              />
            </div>

            <div className="pt-4 flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                생성하기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateEventDrawer;
