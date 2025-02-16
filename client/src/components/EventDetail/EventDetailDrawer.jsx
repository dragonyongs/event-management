import React, { useState } from 'react';
import { thumbnailOptions } from '../../data/eventData';
import { GolfInfo, TourInfo } from './EventDetailSections';

const EventDetailDrawer = ({ event, onClose, onViewFullScreen }) => {
  const defaultThumbnail =
    event.type.length > 0
      ? thumbnailOptions.find((option) => option.id === event.type[0])
      : null;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">이벤트 상세</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
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

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* 이벤트 이미지 */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            {event.thumbnail?.url && !imageError ? (
              <img
                src={event.thumbnail.url}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center text-3xl ${defaultThumbnail?.bgColor}`}
              >
                {defaultThumbnail?.icon}
              </div>
            )}
          </div>

          {/* 이벤트 정보 */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{event.date}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                {event.status === 'ongoing'
                  ? '진행 중'
                  : event.status === 'completed'
                    ? '완료됨'
                    : '예정됨'}
              </span>
              <span className="text-sm text-gray-500">
                참가자 {event.users}명 · 스텝 {event.steps}명
              </span>
            </div>

            {/* 이벤트 유형별 정보 */}
            {event.type?.includes('golf') && (
              <GolfInfo golfDetails={event.golfDetails} />
            )}

            {event.type?.includes('tour') && (
              <TourInfo tourDetails={event.tourDetails} />
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 border-t">
        <button
          onClick={onViewFullScreen}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          전체 화면으로 보기
        </button>
      </div>
    </div>
  );
};

export default EventDetailDrawer;
