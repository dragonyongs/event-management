import React, { useEffect } from 'react';
// import MemberEditDrawer from '../MemberEditDrawer';

const AddGroupDrawer = ({
  isEdit,
  type,
  groupForm,
  setGroupForm,
  onSubmit,
  onClose,
  onAddMember,     // 전달받은 handleAddMember
  onEditMember,    // 전달받은 handleEditMember (필요시)
}) => {

  // 드로우 내 폼 입력 변경 핸들러 예시
  const handleChange = (field, value) => {
    setGroupForm({
      ...groupForm,
      [field]: value,
    });
  };

  const handleTeeTimeChange = (field, value) => {
    setGroupForm({
      ...groupForm,
      teeTime: {
        ...groupForm.teeTime,
        [field]: value,
      },
    });
  };

  const handleSubmit = () => {
    onSubmit(groupForm);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {type === 'golf'
            ? '골프 조 추가'
            : type === 'bus'
            ? '버스 그룹 추가'
            : '관광지 추가'}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          {/* 닫기 버튼 SVG */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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
            value={groupForm.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="이름을 입력하세요"
          />
        </div>

        {type === 'golf' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tee-off 시작 시간</label>
              <input
                type="datetime-local"
                value={groupForm.teeTime.start}
                onChange={(e) => handleTeeTimeChange('start', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">예상 지속 시간</label>
              <input
                type="text"
                value={groupForm.teeTime.estimatedDuration}
                onChange={(e) => handleTeeTimeChange('estimatedDuration', e.target.value)}
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
              value={groupForm.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
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
                value={groupForm.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 09:00 ~ 11:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                value={groupForm.description}
                onChange={(e) => handleChange('description', e.target.value)}
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
              onClick={onAddMember}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              참가자 추가
            </button>
            <ul className="mt-4 space-y-2">
              {groupForm.members.map((member) => (
                <li
                  key={member.id}
                  className="flex justify-between items-center p-2 border rounded-lg"
                >
                  <span>{member.name}</span>
                  <button
                    type="button"
                    onClick={() => onEditMember(null, member)}
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
            {isEdit ? '수정하기' : '추가하기'}
          </button>
        </div>
      </div>

      {/* 멤버 편집 드로우: 최상위에서 관리한 memberForm 상태를 이용 */}
      {/* {memberForm && (
        <div className='bg-black bg-opacity-50 h-screen'>
          <MemberEditDrawer
            memberData={memberForm}
            onClose={() => setMemberForm(null)}
            onSubmit={(updatedMember) => {
              // 그룹의 멤버 리스트 갱신
              setGroupForm((prev) => ({
                ...prev,
                members: [...prev.members.filter(m => m.id !== updatedMember.id), updatedMember],
              }));
              setMemberForm(null);
            }}
          />
        </div>
      )} */}
    </div>
  );
};

export default AddGroupDrawer;
