import React from 'react';
import { 
  FaUsers, 
  FaClock, 
  FaCalendarAlt, 
  FaGolfBall, 
  FaMapMarkerAlt, 
  FaCompass 
} from 'react-icons/fa';
import { getCount } from '../../utils/eventUtils';

const EventOverview = ({ event }) => {
    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-gray-100 text-gray-800'
        };
        return colors[status] || colors.pending;
    };

    const userCount = getCount(event.users);
    
    return (
        <div className="space-y-4">
            {/* Status Banner */}
            <div className={`w-full p-3 rounded-lg flex items-center justify-between ${getStatusColor(event.status)}`}>
                <span className="font-medium">이벤트 상태</span>
                <span className="font-bold">{event.status === 'active' ? '진행중' : '대기중'}</span>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2">
                        <FaUsers className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">참가자</p>
                            <p className="text-lg font-bold">{userCount|| 0}명</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2">
                        <FaClock className="h-5 w-5 text-green-500" />
                        <div>
                            <p className="text-sm text-gray-500">소요 시간</p>
                            <p className="text-lg font-bold">{event.duration || '3'}시간</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="h-5 w-5 text-purple-500" />
                        <div>
                            <p className="text-sm text-gray-500">일정</p>
                            <p className="text-lg font-bold">{event.date || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Type Specific Info */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">이벤트 세부사항</h3>
                <div className='space-y-3'>
                    {event.type?.includes('golf') && (
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <FaGolfBall className="h-5 w-5 text-blue-500" />
                                <span>골프 라운드 {event.golfDetails?.rounds || 1}회</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="h-5 w-5 text-red-500" />
                                <span>{event.golfDetails?.location || '미정'}</span>
                            </div>
                        </div>
                    )}
                    {event.type?.includes('tour') && (
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <FaCompass className="h-5 w-5 text-green-500" />
                                <span>투어 코스 {event.tourDetails?.spots || 0}개</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="h-5 w-5 text-red-500" />
                                <span>{event.tourDetails?.location || '미정'}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">이벤트 설명</h3>
                <p className="text-gray-600">
                    {event.description || "이벤트에 대한 상세 설명이 준비중입니다."}
                </p>
            </div>
        </div>
    );
};

export default EventOverview;