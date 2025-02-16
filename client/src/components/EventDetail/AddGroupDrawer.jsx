import React, { useState } from 'react';

const AddGroupDrawer = ({ type, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    time: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직
    onClose();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'golf'
              ? '골프 조 추가'
              : type === 'bus'
                ? '버스 그룹 추가'
                : '관광지 추가'}
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

      <form
        onSubmit={handleSubmit}
        className="flex-1 p-4 space-y-4 overflow-y-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'golf'
              ? '조 이름'
              : type === 'bus'
                ? '버스 이름'
                : '관광지 이름'}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'golf'
              ? 'Tee-off 시간'
              : type === 'bus'
                ? '정원'
                : '수용 인원'}
          </label>
          <input
            type={type === 'golf' ? 'time' : 'number'}
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={type === 'golf' ? 'HH:MM' : '숫자만 입력'}
          />
        </div>

        {type === 'destination' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                관광 시간
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 09:00 ~ 11:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="관광지에 대한 간단한 설명을 입력하세요"
              />
            </div>
          </>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            추가하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroupDrawer;
