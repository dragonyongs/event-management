import React, { useState } from 'react';
import { FiX, FiClock, FiUsers } from 'react-icons/fi';

const GolfGroupDrawer = ({ 
  isEdit = false,
  groupData,
  onClose,
  onSubmit 
}) => {
  const [formData, setFormData] = useState(
    groupData || {
      name: '',
      teeTime: '',
      members: []
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-lg font-semibold">
          {isEdit ? '조 정보 수정' : '새로운 조 추가'}
        </h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              조 이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="예: A조"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              티오프 시간
            </label>
            <input
              type="time"
              value={formData.teeTime}
              onChange={(e) => setFormData({...formData, teeTime: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              참가자 목록
            </label>
            <div className="space-y-2">
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{member.name}</span>
                  <span>HC {member.handicap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      <div className="border-t p-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isEdit ? '수정하기' : '추가하기'}
        </button>
      </div>
    </div>
  );
};

export default GolfGroupDrawer;