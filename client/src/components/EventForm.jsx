import React, { useState } from 'react';
import ThumbnailSelector from './ThumbnailSelector';
import EventTypeSelector from './EventTypeSelector';
import UserSelector from './UserSelector';
import StaffSelector from './StaffSelector';
import { dummyStaffs, dummyUsers } from '../data/eventData';

const EventForm = ({ initialData, onSubmit, onDelete }) => {
    const processDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : '');

    const processedInitialData = {
        ...initialData,
        startDate: processDate(initialData.startDate),
        endDate: processDate(initialData.endDate),
        users: initialData.users || [],  // 초기값이 없으면 빈 배열
        staffs: initialData.staffs || [],
    };

    const [eventData, setEventData] = useState(processedInitialData);
    const [errors, setErrors] = useState({});

    const thumbnail = eventData.images?.find((img) => img.type === 'thumbnail') || null;

    const validateEventData = () => {
        const newErrors = {};
        if (!eventData.title.trim()) newErrors.title = '이벤트 제목을 입력해주세요';
        if (!eventData.startDate) newErrors.startDate = '시작일을 선택해주세요';
        if (!eventData.endDate) newErrors.endDate = '종료일을 선택해주세요';
        if (
            eventData.startDate &&
            eventData.endDate &&
            new Date(eventData.startDate) > new Date(eventData.endDate)
        ) {
            newErrors.dateRange = '종료일은 시작일 이후여야 합니다';
        }
        if (!thumbnail?.icon && !thumbnail?.bgColor && !thumbnail?.url) {
            newErrors.thumbnail = '썸네일을 선택해주세요';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setEventData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleChangeImages = (newThumbnail) => {
        const updatedImages = eventData.images?.filter((img) => img.type !== 'thumbnail') || [];
        if (newThumbnail) {
            updatedImages.push(newThumbnail);
        }
        handleChange('images', updatedImages);
    };

    const handleSubmit = () => {
        if (validateEventData()) {
            onSubmit(eventData);
        }
    };

    return (
        <>
            <div className="flex flex-col space-y-6 h-[calc(100vh-158px)] overflow-y-auto overflow-x-hidden p-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이벤트 제목</label>
                    <input
                        type="text"
                        value={eventData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="이벤트 제목을 입력하세요"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                        <input
                            type="date"
                            value={eventData.startDate}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                        <input
                            type="date"
                            value={eventData.endDate}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
                    </div>
                </div>
                {errors.dateRange && <p className="text-sm text-red-500">{errors.dateRange}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        이미지 URL 입력 (업로드 기능 미지원)
                    </label>
                    <input
                        type="text"
                        value={thumbnail?.url || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            const newThumbnail = { 
                                type: 'thumbnail', 
                                url: value, 
                                icon: value ? '' : thumbnail?.icon || '', 
                                bgColor: value ? '' : thumbnail?.bgColor || '', 
                                id: value ? undefined : thumbnail?.id 
                            };
                            handleChangeImages(newThumbnail);
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                        placeholder="이미지 URL을 입력하세요"
                    />
                </div>

                {/* URL 값이 없을 때만 썸네일 셀렉터를 노출 */}
                {!thumbnail?.url && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">썸네일</label>
                        <ThumbnailSelector
                            selected={thumbnail}
                            onSelect={(selectedThumbnail) => {
                                const newThumbnail = { ...selectedThumbnail, type: 'thumbnail', url: '' };
                                handleChangeImages(newThumbnail);
                            }}
                        />
                        {errors.thumbnail && <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>}
                    </div>
                )}

                {thumbnail && thumbnail.id && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                이모지 수정
                            </label>
                            <input
                                type="text"
                                value={thumbnail.icon || ''}
                                onChange={(e) => {
                                    const newThumbnail = { ...thumbnail, icon: e.target.value };
                                    handleChangeImages(newThumbnail);
                                }}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                                placeholder="이모지를 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                배경색 수정 (Tailwind 클래스)
                            </label>
                            <input
                                type="text"
                                value={thumbnail.bgColor || ''}
                                onChange={(e) => {
                                    const newThumbnail = { ...thumbnail, bgColor: e.target.value };
                                    handleChangeImages(newThumbnail);
                                }}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                                placeholder="예: bg-blue-500"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이벤트 타입</label>
                    <EventTypeSelector
                        selectedTypes={eventData.type}
                        onChange={(types) => handleChange('type', types)}
                    />
                </div>

                <UserSelector
                    availableUsers={dummyUsers}  // 전체 유저 풀
                    selectedUsers={eventData.users || []}  // 선택된 유저
                    onChange={(users) => handleChange('users', users)}
                />

                <StaffSelector
                    availableUsers={dummyStaffs}  // 전체 스태프 풀
                    selectedStaffs={eventData.staffs}
                    onChange={(staffs) => handleChange('staffs', staffs)}
                />
            </div>
            <div className="flex justify-between gap-x-3 px-6">
                <button 
                    onClick={onDelete} 
                    className="flex-initial py-2 px-4 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                >
                    삭제
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    저장
                </button>
            </div>
        </>
    );
};

export default EventForm;