import React, { useState, useEffect } from 'react';
import MemberEditDrawer from '../MemberEditDrawer'; // MemberEditDrawer 임포트 추가

const AddGroupDrawer = ({ type, initialData = {}, onSubmit, onClose }) => {
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    capacity: '',
    time: '',
    description: '',
    teeTime: { start: '', estimatedDuration: '' },
    members: [], // 사용자 필드 추가
  });

  const [isMemberEditOpen, setIsMemberEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      newGroupData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit(newGroupData);
  };

  const handleAddMember = () => {
    const newMember = { id: Date.now(), name: '', status: 'pending', handicap: 0, reason: '' };
    setSelectedMember(newMember);
    setIsMemberEditOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsMemberEditOpen(true);
  };

  const handleMemberSubmit = (member) => {
    setNewGroupData((prevData) => ({
      ...prevData,
      members: [...prevData.members.filter((m) => m.id !== member.id), member],
    }));
    setIsMemberEditOpen(false);
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
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
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
            value={newGroupData.name}
            onChange={(e) =>
              setNewGroupData({ ...newGroupData, name: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="이름을 입력하세요"
          />
        </div>

        {type === 'golf' && (
          <>
            {/* TeeTime 시작 시간 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tee-off 시작 시간</label>
              <input
                type="datetime-local"
                value={newGroupData.teeTime.start}
                onChange={(e) =>
                  setNewGroupData({
                    ...newGroupData,
                    teeTime: { ...newGroupData.teeTime, start: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* 예상 지속 시간 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">예상 지속 시간</label>
              <input
                type="text"
                value={newGroupData.teeTime.estimatedDuration}
                onChange={(e) =>
                  setNewGroupData({
                    ...newGroupData,
                    teeTime: { ...newGroupData.teeTime, estimatedDuration: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 4시간"
              />
            </div>
          </>
        )}

        {type === 'bus' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              정원
            </label>
            <input
              type="number"
              value={newGroupData.capacity}
              onChange={(e) =>
                setNewGroupData({ ...newGroupData, capacity: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="숫자만 입력"
            />
          </div>
        )}

        {type === 'destination' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                관광 시간
              </label>
              <input
                type="text"
                value={newGroupData.time}
                onChange={(e) =>
                  setNewGroupData({ ...newGroupData, time: e.target.value })
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
                value={newGroupData.description}
                onChange={(e) =>
                  setNewGroupData({ ...newGroupData, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="관광지에 대한 간단한 설명을 입력하세요"
              />
            </div>
          </>
        )}

        {type === 'golf' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              참가자
            </label>
            <button
              type="button"
              onClick={handleAddMember}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              참가자 추가
            </button>
            <ul className="mt-4 space-y-2">
              {newGroupData.members.map((member) => (
                <li
                  key={member.id}
                  className="flex justify-between items-center p-2 border rounded-lg"
                >
                  <span>{member.name}</span>
                  <button
                    type="button"
                    onClick={() => handleEditMember(member)}
                    className="text-blue-500 hover:underline"
                  >
                    수정
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {initialData && Object.keys(initialData).length > 0 ? '수정하기' : '추가하기'}
          </button>
        </div>
      </div>

      {isMemberEditOpen && (
        <div className='bg-black bg-opacity-50 h-screen'>
          <MemberEditDrawer
            memberData={selectedMember}
            onClose={() => setIsMemberEditOpen(false)}
            onSubmit={handleMemberSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default AddGroupDrawer;