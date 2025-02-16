import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import ThumbnailSelector from './ThumbnailSelector';

const CreateEventDrawer = ({ isOpen, onClose, handleCreateEvent }) => {
  const [eventData, setEventData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    steps: '',
    thumbnail: null,
    type: [],
    location: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const validateEventData = () => {
    const newErrors = {};

    if (!eventData.title.trim()) {
      newErrors.title = '이벤트 제목을 입력해주세요';
    }

    if (!eventData.startDate) {
      newErrors.startDate = '시작일을 선택해주세요';
    }

    if (!eventData.endDate) {
      newErrors.endDate = '종료일을 선택해주세요';
    }

    if (
      eventData.startDate &&
      eventData.endDate &&
      new Date(eventData.startDate) > new Date(eventData.endDate)
    ) {
      newErrors.dateRange = '종료일은 시작일 이후여야 합니다';
    }

    if (!eventData.steps || eventData.steps < 1) {
      newErrors.steps = '스텝 수를 입력해주세요';
    }

    if (!eventData.thumbnail) {
      newErrors.thumbnail = '썸네일을 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClick = () => {
    if (validateEventData()) {
      const newEvent = {
        id: `evt_${Date.now()}`,
        title: eventData.title,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        status: 'upcoming',
        users: 0,
        steps: eventData.steps ? Number(eventData.steps) : 0, // 숫자로 변환
        thumbnail: eventData.thumbnail
          ? {
              id: eventData.thumbnail.id || null,
              icon: eventData.thumbnail.icon || null,
              bgColor: eventData.thumbnail.bgColor || null,
              url: eventData.thumbnail.url || null, // 이미지가 있으면 저장
            }
          : null,
        type: [eventData.thumbnail.id],
        location: eventData.location || '',
        description: eventData.description || '',
        golfDetails: eventData.type.includes('golf')
          ? { venue: '', groups: [] }
          : null,
        tourDetails: eventData.type.includes('tour')
          ? { busGroups: [], destinations: [] }
          : null,
      };

      handleCreateEvent(newEvent);
      onClose();

      // 폼 초기화
      setEventData({
        title: '',
        startDate: '',
        endDate: '',
        steps: '',
        thumbnail: null,
        type: [],
        location: '',
        description: '',
      });
      setErrors({});
    }
  };

  const handleChange = (field, value) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
    // 해당 필드의 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size={480}
      className="overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">새 이벤트 생성</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이벤트 제목
            </label>
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="이벤트 제목을 입력하세요"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시작일
              </label>
              <input
                type="date"
                value={eventData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                종료일
              </label>
              <input
                type="date"
                value={eventData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>
          {errors.dateRange && (
            <p className="text-sm text-red-500">{errors.dateRange}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              필요 스텝 수
            </label>
            <input
              type="number"
              value={eventData.steps}
              onChange={(e) => handleChange('steps', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="필요한 스텝 수를 입력하세요"
              min="1"
            />
            {errors.steps && (
              <p className="mt-1 text-sm text-red-500">{errors.steps}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              썸네일 선택
            </label>
            <ThumbnailSelector
              selected={eventData.thumbnail}
              onSelect={(thumbnail) => handleChange('thumbnail', thumbnail)}
            />
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
            )}
          </div>

          <button
            onClick={handleCreateClick}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={Object.keys(errors).length > 0}
          >
            이벤트 생성
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default CreateEventDrawer;
