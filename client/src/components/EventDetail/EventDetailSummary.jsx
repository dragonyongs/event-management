import React, { useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import { FiUser, FiMapPin } from "react-icons/fi";
import { RiNotificationLine } from "react-icons/ri";
import { LuClock4, LuBusFront } from "react-icons/lu";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { getCount, mapUserIdsToUserObjects } from '../../utils/eventUtils';

// 평균 핸디캡 계산 함수
const averageHandicap = (members) => {
    if (!members || members.length === 0) {
        return 0;
    }
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
        active: 'from-green-50 to-lime-50 border-green-100',
        pending: 'from-amber-50 to-yellow-50 border-yellow-100',
        completed: 'from-slate-50 to-gray-50 border-gray-100'
    };
    return colors[status] || colors.pending;
};

// 날짜와 시간을 원하는 형식으로 변환하는 함수
const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('ko-KR', options);
};

const EventDetailSummary = ({ event }) => {
    const { state, dispatch } = useContext(EventContext);
    
    const eventUsers = mapUserIdsToUserObjects(event.users, state.users);
    const findStaffs = eventUsers.filter(user => user.division === "스태프");
    const eventStaffCount = getCount(findStaffs);
    // const eventUserCount = getCount(event.users) - eventStaffCount;

    const userCount = getCount(event.users);

    return (
        <div className="space-y-4">
            {/* 상태 배너 */}
            <div className={`bg-gradient-to-r rounded-lg p-4 mb-6 border ${getStatusColor(event.status)}`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <IoMdInformationCircleOutline className="text-amber-500 w-5 h-5 mr-2" />
                        <h2 className="text-lg font-medium text-gray-900">이벤트 상태</h2>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        {event.status === 'active' ? '진행중' : '대기중'}
                    </span>
                </div>
            </div>

            {/* 기본 정보 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                {/* Stat 1 */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FiUser className="w-4 h-4 mr-2 text-blue-500" />
                        <span>참가자</span>
                    </div>
                    <div className="flex flex-col gap-x-2">
                        <span className="text-2xl md:text-3xl font-bold text-gray-900">{userCount || 0}명</span>
                        <span className="text-sm text-gray-400">(스탭{eventStaffCount}명 포함)</span>
                    </div>
                </div>
                
                {/* Stat 2 */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <LuClock4 className="w-4 h-4 mr-2 text-green-500" />
                        <span>소요 시간</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl md:text-3xl font-bold text-gray-900">{event.duration || '0'}시간</span>
                    </div>
                </div>
                
                {/* Stat 3 */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <RiNotificationLine className="w-4 h-4 mr-2 text-purple-500" />
                        <span>알림</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl md:text-3xl font-bold text-gray-900">{event.date || '없음'}</span>
                    </div>
                </div>
            </div>


            {/* 이벤트 타입별 상세 정보 */}
            {event.subEvents?.find((sub) => sub.type === 'golf') && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <h2 className="text-lg font-medium text-gray-900">골프 정보</h2>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="mb-4">
                            <div className="flex items-center gap-x-3 text-gray-800">
                                <div className="flex items-center min-w-10">
                                    <AiOutlineTeam className="w-4 h-4 mr-1 text-gray-400" />
                                    <div className="text-sm text-gray-500">장소</div>
                                </div>
                                <span>{event.subEvents.find((sub) => sub.type === 'golf').venue || event.subEvents.find((sub) => sub.type === 'golf').location}</span>
                            </div>

                            <div className="flex items-center gap-x-3 text-gray-800">
                                <div className="flex items-center min-w-10">
                                    <FiMapPin className="w-4 h-4 mr-1 text-gray-400" />
                                    <div className="text-sm text-gray-500">그룹</div>
                                </div>
                                <span>{event.subEvents.find((sub) => sub.type === 'golf').groups?.length || 0}팀</span>
                            </div>

                            <div className="mt-3 border-t border-gray-100 pt-4 space-y-4">
                                {event.subEvents.find((sub) => sub.type === 'golf').groups?.map((group) => (
                                    <div key={group.id} className="bg-gray-50 rounded p-4">
                                        <div className="flex flex-col items-start md:flex-row md:items-center text-sm font-medium text-gray-700 mb-2">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs mb-2 md:mb-0 md:mr-2">{group.name}</span>
                                            <span>티타임: {formatDateTime(group.teeTime.start)} (예상 시간: {group.teeTime.estimatedDuration})</span>
                                        </div>
                                        <div className="text-xs text-gray-500 md:pl-12 space-y-1">
                                            <p>
                                                인원: {group.members.length}명 {group.members.length !== 0 && (`(
                                                ${group.members
                                                    .map((member) => {
                                                        const userObj = state.users.find((user) => user.id === member.userId);
                                                        return userObj ? userObj.name : '알 수 없음';
                                                    })
                                                    .join(', ')}
                                                )`)}
                                            </p>
                                            <p>평균 핸디캡: {averageHandicap(group.members)}점</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tourism Information */}
            {event.subEvents?.find((sub) => sub.type === 'tour') && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                <h2 className="text-lg font-medium text-gray-900">관광 정보</h2>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-4">
                                <div className="flex items-center gap-x-3 text-gray-800">
                                    <div className="flex items-center min-w-20">
                                        <FiUser className="w-4 h-4 mr-1 text-gray-400" />
                                        <div className="text-sm text-gray-500">총 인원</div>
                                    </div>
                                    <span>{totalPassengers(event.subEvents.find((sub) => sub.type === 'tour').busGroups)}명</span>
                                </div>
                                <div className="flex items-center gap-x-3 text-gray-800">
                                    <div className="flex items-center min-w-20">
                                        <LuBusFront className="w-4 h-4 mr-1 text-gray-400" />
                                        <div className="text-sm text-gray-500">운행 버스</div>
                                    </div>
                                    <span>{event.subEvents.find((sub) => sub.type === 'tour').busGroups?.length || 0}대</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-4 space-y-4">
                            {event.subEvents.find((sub) => sub.type === 'tour').destinations?.map((dest) => (
                                <div key={dest.id} className="bg-gray-50 rounded p-4">
                                    <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs mr-2">{dest.name}</span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        일정 시간: {formatDateTime(dest.schedule.start)} ~ {formatDateTime(dest.schedule.end)}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">참여: {dest.currentCount} / {dest.maxCapacity}명</div>
                                </div>
                            ))}
    
                            </div>
                        </div>
                </div>
            )}

            {/* 이벤트 설명 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                    <h2 className="text-lg font-medium text-gray-900">이벤트 설명</h2>
                    </div>
                </div>
                
                <div className="p-6">
                    <p className="text-gray-700">
                        {event.description || "이벤트에 대한 상세 설명이 준비중입니다."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventDetailSummary;
