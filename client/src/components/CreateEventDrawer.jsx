import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import ThumbnailSelector from './ThumbnailSelector';
import EventTypeSelector from './EventTypeSelector';
import { dummyUsers, dummyStaffs } from '../data/eventData';

const CreateEventDrawer = ({ isOpen, onClose, handleCreateEvent }) => {
  const [eventData, setEventData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    steps: '',
    thumbnail: { url: '', icon: '', bgColor: '' }, // 초기화된 썸네일 객체
    type: [], // 이벤트 타입 배열 (예: ['tour', 'golf'])
    location: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  // 사용자 추가 관련 상태
  const [userSearch, setUserSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // 스태프 추가 관련 상태
  const [staffSearch, setStaffSearch] = useState('');
  const [selectedStaffs, setSelectedStaffs] = useState([]);

  // 필터링된 사용자 목록 (이미 선택된 사용자는 제외)
  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.includes(userSearch) &&
      !selectedUsers.find((sel) => sel.id === user.id)
  );

  // 필터링된 스태프 목록 (이미 선택된 스태프는 제외)
  const filteredStaffs = dummyStaffs.filter(
    (staff) =>
      staff.name.includes(staffSearch) &&
      !selectedStaffs.find((sel) => sel.id === staff.id)
  );

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

    if (!eventData.thumbnail) {
      newErrors.thumbnail = '썸네일을 선택하거나 URL을 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClick = () => {
    const newEventData = {
      ...eventData,
      users: selectedUsers,
      staffs: selectedStaffs,
    };

    if (validateEventData()) {
      const newEvent = {
        id: `evt_${Date.now()}`,
        title: newEventData.title,
        startDate: newEventData.startDate,
        endDate: newEventData.endDate,
        status: 'upcoming',
        thumbnail: newEventData.thumbnail
          ? {
              id: newEventData.thumbnail.id || null,
              icon: newEventData.thumbnail.icon || null,
              bgColor: newEventData.thumbnail.bgColor || null,
              url: newEventData.thumbnail.url || null,
            }
          : null,
        type: newEventData.type,
        location: newEventData.location || '',
        description: newEventData.description || '',
        users: newEventData.users,
        staffs: newEventData.staffs,
        steps: newEventData.steps,
        golfDetails: newEventData.type.includes('golf')
          ? { venue: '', groups: [] }
          : null,
        tourDetails: newEventData.type.includes('tour')
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
        thumbnail: { url: '', icon: '', bgColor: '' },
        type: [],
        location: '',
        description: '',
        users: [],
        staffs: [],
        steps: [],
      });
      setSelectedUsers([]);
      setUserSearch('');
      setSelectedStaffs([]);
      setStaffSearch('');
      setErrors({});
    }
  };

  const handleChange = (field, value) => {
    // setEventData((prev) => {
    //   if (field === 'thumbnail') {
    //     console.log(field, value);
    //     return { ...prev, thumbnail: { ...prev.thumbnail, ...value } };
    //   }
    //   return { ...prev, [field]: value };
    // });
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

  // 사용자 선택/제거 핸들러
  const handleSelectUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    setUserSearch('');
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // 스태프 선택/제거 핸들러
  const handleSelectStep = (staff) => {
    setSelectedStaffs((prev) => [...prev, staff]);
    setStaffSearch('');
  };

  const handleRemoveStep = (staffId) => {
    setSelectedStaffs((prev) => prev.filter((staff) => staff.id !== staffId));
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size={480}
      className="overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">새 이벤트 생성</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 이벤트 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이벤트 제목
          </label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="이벤트 제목을 입력하세요"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* 시작일과 종료일 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작일
            </label>
            <input
              type="date"
              value={eventData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.endDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
            )}
          </div>
        </div>
        {errors.dateRange && (
          <p className="text-sm text-red-500">{errors.dateRange}</p>
        )}

        {/* 썸네일 이미지 URL 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지 URL 입력 (업로드 기능 미지원)
          </label>
          <input
            type="text"
            value={eventData.thumbnail?.url || ''}
            onChange={(e) =>
              console.log('e.target.value', e.target.value) ||
              handleChange('thumbnail', {
                ...eventData.thumbnail,
                url: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
            placeholder="이미지 URL을 입력하세요"
          />
        </div>
        {/* 사용자 추가 UI */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              사용자 추가
            </label>
            {/* 엑셀 파일 업로드 기능 추가 */}
            <div>
              <label
                htmlFor="user-upload"
                className="text-sm text-blue-600 rounded-lg cursor-pointer hover:underline "
              >
                엑셀 업로드
              </label>
              <input
                type="file"
                id="user-upload"
                className="hidden"
                accept=".xlsx, .xls"
              />
              </div>
          </div>
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="사용자 검색 (예: 홍길동)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
          />
          {userSearch.trim() !== '' && filteredUsers.length > 0 && (
            <ul className="border border-gray-200 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <span
                key={user.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
              >
                {user.name}
                <button
                  className="ml-1 text-blue-500 hover:text-blue-700"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 스태프 추가 UI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스태프 추가
          </label>
          <input
            type="text"
            value={staffSearch}
            onChange={(e) => setStaffSearch(e.target.value)}
            placeholder="스태프 추가(예: 홍길동)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
          />
          {staffSearch.trim() !== '' && filteredStaffs.length > 0 && (
            <ul className="border border-gray-200 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredStaffs.map((staff) => (
                <li
                  key={staff.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectStep(staff)}
                >
                  {staff.name}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedStaffs.map((staff) => (
              <span
                key={staff.id}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
              >
                {staff.name}
                <button
                  className="ml-1 text-green-500 hover:text-green-700"
                  onClick={() => handleRemoveStep(staff.id)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 썸네일 프리셋 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            썸네일 선택 (프리셋)
          </label>
          <ThumbnailSelector
            selected={eventData.thumbnail}
            onSelect={(thumbnail) => handleChange('thumbnail', thumbnail)}
          />
          {errors.thumbnail && (
            <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
          )}
        </div>

        {/* 프리셋 선택 시 추가 옵션 */}
        {eventData.thumbnail && eventData.thumbnail.id && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이모지 수정
              </label>
              <input
                type="text"
                value={eventData.thumbnail.icon || ''}
                onChange={(e) =>
                  handleChange('thumbnail', {
                    ...eventData.thumbnail,
                    icon: e.target.value,
                  })
                }
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
                value={eventData.thumbnail.bgColor || ''}
                onChange={(e) =>
                  handleChange('thumbnail', {
                    ...eventData.thumbnail,
                    bgColor: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="예: bg-blue-500"
              />
            </div>
          </div>
        )}

        {/* 이벤트 타입 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이벤트 타입 선택
          </label>
          <EventTypeSelector
            selectedTypes={eventData.type}
            onChange={(types) => handleChange('type', types)}
          />
          {errors.type && (
            <p className="mt-1 text-sm text-red-500">{errors.type}</p>
          )}
        </div>

        {/* 이벤트 생성 버튼 */}
        <button
          onClick={handleCreateClick}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={Object.keys(errors).length > 0}
        >
          이벤트 생성
        </button>
      </div>
    </Drawer>
  );
};

export default CreateEventDrawer;
