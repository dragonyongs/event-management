import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { thumbnailOptions } from '../data/eventData';

const StatusBadge = ({ status, dDay }) => {
  const statusStyles = {
    ongoing: 'bg-blue-50 text-blue-600 border-blue-200',
    completed: 'bg-gray-50 text-gray-600 border-gray-200',
    upcoming: 'bg-green-50 text-green-600 border-green-200',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      {status === 'ongoing' && dDay >= 0
        ? `D-${dDay}`
        : status === 'ongoing'
          ? '진행 중'
          : status === 'completed'
            ? '완료됨'
            : '예정됨'}
    </span>
  );
};

const EventCard = ({ event }) => {
  const { title, startDate, endDate, users, steps, status, thumbnail, type } =
    event;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const dDay = differenceInDays(end, new Date());

  const defaultThumbnail =
    type.length > 0
      ? thumbnailOptions.find((option) => option.id === type[0])
      : null;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-video overflow-hidden bg-gray-100">
          {thumbnail?.url && !imageError ? (
            <img
              src={thumbnail.url}
              alt={title}
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
        <div className="absolute top-3 right-3">
          <StatusBadge status={status} dDay={dDay} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {title}
        </h3>

        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            {format(start, 'yyyy.MM.dd')} ~ {format(end, 'yyyy.MM.dd')}
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <span className="inline-block w-5 h-5 mr-1.5">👥</span>
              <span className="text-sm">{users.toLocaleString()}명</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="inline-block w-5 h-5 mr-1.5">👤</span>
              <span className="text-sm">스텝 {steps}명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
