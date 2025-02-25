import React from 'react';
import { 
    FaUsers, 
    FaClock, 
    FaCalendarAlt 
} from 'react-icons/fa';
import { RiGolfBallLine, RiBusLine } from 'react-icons/ri';
import { getCount } from '../../utils/eventUtils';

// 평균 핸디캡 계산 함수
const averageHandicap = (members) => {
    const total = members.reduce((sum, m) => sum + m.handicap, 0);
    return (total / members.length).toFixed(1);
};

// 총 승객 수 계산 함수
const totalPassengers = (buses) => {
    return buses.reduce((sum, bus) => sum + bus.currentCount, 0);
};

// 이벤트 상태에 따른 색상 반환 함수
const getStatusColor = (status) => {
    const colors = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.pending;
};

// 날짜와 시간을 원하는 형식으로 변환하는 함수
const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('ko-KR', options);
};

const EventDetailSummary = ({ event }) => {
    const userCount = getCount(event.users);

    return (
        <div className="space-y-4">
            {/* 상태 배너 */}
            <div className={`w-full p-3 rounded-lg flex items-center justify-between ${getStatusColor(event.status)}`}>
                <span className="font-medium">이벤트 상태</span>
                <span className="font-bold">{event.status === 'active' ? '진행중' : '대기중'}</span>
            </div>

            {/* 기본 정보 요약 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2">
                        <FaUsers className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">참가자</p>
                            <p className="text-lg font-bold">{userCount || 0}명</p>
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

            {/* 이벤트 타입별 상세 정보 */}
            {event.subEvents?.find((sub) => sub.type === 'golf') && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2 mb-3">
                        <RiGolfBallLine className="text-green-500" />
                        <h4 className="font-semibold text-gray-900">골프 정보</h4>
                    </div>
                    <p className="text-sm text-gray-600">경기장: {event.subEvents.find((sub) => sub.type === 'golf').venue || event.subEvents.find((sub) => sub.type === 'golf').location}</p>
                    <p className="text-sm text-gray-600">
                        총 그룹: {event.subEvents.find((sub) => sub.type === 'golf').groups?.length || 0}팀
                    </p>
                    <div className="mt-2 space-y-2">
                        {event.subEvents.find((sub) => sub.type === 'golf').groups?.map((group) => (
                            <div key={group.id} className="border p-2 rounded-lg">
                                <h5 className="text-sm font-semibold">
                                    {group.name} - 티타임: {formatDateTime(group.teeTime.start)} (예상 시간: {group.teeTime.estimatedDuration})
                                </h5>
                                <p className="text-xs text-gray-500">
                                    인원: {group.members?.length || 0}명 (평균 핸디캡: {group.members ? averageHandicap(group.members) : 'N/A'})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {event.subEvents?.find((sub) => sub.type === 'tour') && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2 mb-3">
                        <RiBusLine className="text-blue-500" />
                        <h4 className="font-semibold text-gray-900">관광 정보</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                        총 인원: {totalPassengers(event.subEvents.find((sub) => sub.type === 'tour').busGroups)}명
                    </p>
                    <p className="text-sm text-gray-600">
                        운행 버스: {event.subEvents.find((sub) => sub.type === 'tour').busGroups?.length || 0}대
                    </p>
                    <div className="mt-2 space-y-2">
                        {event.subEvents.find((sub) => sub.type === 'tour').destinations?.map((dest) => (
                            <div key={dest.id} className="border p-2 rounded-lg">
                                <h5 className="text-sm font-semibold">{dest.name}</h5>
                                <p className="text-xs text-gray-500">
                                    방문 시간: {formatDateTime(dest.schedule.start)} ~ {formatDateTime(dest.schedule.end)} | 참여: {dest.currentCount} / {dest.maxCapacity}명
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 이벤트 설명 */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">이벤트 설명</h3>
                <p className="text-gray-600">
                    {event.description || "이벤트에 대한 상세 설명이 준비중입니다."}
                </p>
            </div>
        </div>
    );
};

export default EventDetailSummary;
