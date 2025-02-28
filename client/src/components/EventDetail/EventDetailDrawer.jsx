import React, { useState, useEffect } from 'react';
import EventDetailSummary from './EventDetailSummary';
import { getCount, mapUserIdsToUserObjects } from '../../utils/eventUtils';
import { useOutletContext } from 'react-router-dom';
import { dummyUsers } from '../../data/eventData';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const EventDetailDrawer = ({ size, isOpen, onEdit, selectedEvent, onClose, onViewFullScreen }) => {
    const { state } = useOutletContext();

    const currentEvent = state.events.find((event) => event.id === selectedEvent.id);
    const users = mapUserIdsToUserObjects(currentEvent.users, dummyUsers);

    const thumbnail = currentEvent.images?.find((img) => img.type === 'thumbnail') || null;
    const [imageError, setImageError] = useState(false);

    const findStaffs = users.filter(user => user.division === "스태프");
    const eventUserCount = getCount(currentEvent.users);
    const eventStaffCount = getCount(findStaffs);

    return (
        <Drawer open={isOpen} onClose={onClose} direction="right" size={size} className="overflow-y-auto">
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
                        {thumbnail?.url && !imageError ? (
                        <img
                            src={thumbnail.url}
                            alt={state.selectedEvent.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={() => setImageError(true)}
                        />
                        ) : (
                        <div
                            className={`w-full h-full flex items-center justify-center text-3xl ${thumbnail?.bgColor}`}
                        >
                            {thumbnail?.icon}
                        </div>
                        )}
                    </div>

                    {/* 이벤트 정보 */}
                    <div className="space-y-4">
                        <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {state.selectedEvent.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{state.selectedEvent.date}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                            {state.selectedEvent.status === 'ongoing'
                            ? '진행 중'
                            : state.selectedEvent.status === 'completed'
                            ? '완료됨'
                            : '예정됨'}
                        </span>
                        <span className="text-sm text-gray-500">
                            참가자 {eventUserCount}명 · 스텝 {eventStaffCount}명
                        </span>
                        </div>

                        {/* 이벤트 유형별 정보 */}
                        {state.selectedEvent?.type && <EventDetailSummary event={state.selectedEvent} />}
                    </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="flex justify-between gap-x-3 p-4 border-t">
                    <button
                    onClick={onEdit}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                    수정하기
                    </button>
                    <button
                    onClick={onViewFullScreen}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                    전체 화면으로 보기
                    </button>
                </div>
            </div>
        </Drawer>
    );
};

export default EventDetailDrawer;
