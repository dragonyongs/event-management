import React from 'react';
import { FiX } from 'react-icons/fi';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const AddGroupDrawer = ({
  isOpen,
  size,
  isEdit,
  type,
  groupForm,
  setGroupForm,
  onSubmit,
  onClose,
}) => {
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
  <Drawer 
      open={isOpen} 
      onClose={onClose} 
      duration="300" 
      direction="right" 
      size={size} 
      className="overflow-y-auto"
                >
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {type === 'golf' ? '골프 조 추가' : type === 'bus' ? '버스 그룹 추가' : '관광지 추가'}
        </h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'golf' ? '조 이름' : type === 'bus' ? '버스 이름' : '관광지 이름'}
              </label>
              <input
                type="text"
                value={groupForm.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="이름을 입력하세요"
              />
            </div>

            {type === 'golf' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tee-off 시작 시간
                  </label>
                  <input
                    type="datetime-local"
                    value={groupForm.teeTime.start}
                    onChange={(e) => handleTeeTimeChange('start', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    예상 지속 시간
                  </label>
                  <input
                    type="text"
                    value={groupForm.teeTime.estimatedDuration}
                    onChange={(e) => handleTeeTimeChange('estimatedDuration', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t bg-white">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {isEdit ? '수정하기' : '저장하기'}
        </button>
      </div>
    </div>
                </Drawer>

  );
};

export default AddGroupDrawer;