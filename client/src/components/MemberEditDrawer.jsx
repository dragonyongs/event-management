import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const MemberEditDrawer = ({ memberData, onClose, onSubmit }) => {
  const getInitialData = (data) => ({
    id: data?.id || '',
    name: data?.name || '',
    handicap: data?.handicap ?? '',
    score: {
      total: data?.score?.total ?? '',
      holes: data?.score?.holes || [],
    },
    reason: data?.reason ?? '',
    status: data?.status || 'pending',
  });

  const [newMemberData, setNewMemberData] = useState(getInitialData(memberData));

  useEffect(() => {
    if (memberData) {
      setNewMemberData(getInitialData(memberData));
    }
  }, [memberData]);

  const addHole = () => {
    const newHole = {
      holeNumber: newMemberData.score.holes.length + 1,
      strokes: '',
      par: '',
      scoreType: 'normal',
      notes: ''
    };
    setNewMemberData(prev => ({
      ...prev,
      score: {
        ...prev.score,
        holes: [...prev.score.holes, newHole]
      }
    }));
  };

  const removeHole = (index) => {
    setNewMemberData(prev => ({
      ...prev,
      score: {
        ...prev.score,
        holes: prev.score.holes.filter((_, i) => i !== index)
      }
    }));
  };

  const updateHoleField = (index, field, value) => {
    setNewMemberData(prev => ({
      ...prev,
      score: {
        ...prev.score,
        holes: prev.score.holes.map((hole, i) =>
          i === index ? { ...hole, [field]: value } : hole
        )
      }
    }));
  };

  const handleSubmit = () => {  
    onSubmit(newMemberData);
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">참가자 정보 관리</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* 기본 정보 섹션 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
              <input
                type="text"
                value={newMemberData.name}
                onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">참가 상태</label>
              <select
                value={newMemberData.status}
                onChange={(e) => setNewMemberData({ ...newMemberData, status: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="confirmed">참석 확정</option>
                <option value="pending">대기중</option>
                <option value="cancelled">불참</option>
              </select>
            </div>

            {newMemberData.status === 'cancelled' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">불참 사유</label>
                <textarea
                  value={newMemberData.reason}
                  onChange={(e) => setNewMemberData({ ...newMemberData, reason: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="불참 사유를 입력해주세요"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">핸디캡</label>
              <input
                type="number"
                value={newMemberData.handicap}
                onChange={(e) => setNewMemberData({ ...newMemberData, handicap: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="72"
              />
            </div>
          </div>

          {/* 점수 관리 섹션 */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">점수 관리</h4>
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                총 {newMemberData.score.holes.length}홀
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">총 점수</label>
              <input
                type="number"
                value={newMemberData.score.total}
                onChange={(e) => setNewMemberData({
                  ...newMemberData,
                  score: { ...newMemberData.score, total: Number(e.target.value) }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="총 점수를 입력하세요"
              />
            </div>

            {/* 홀별 점수 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">홀별 점수</h5>
                <button
                  type="button"
                  onClick={addHole}
                  className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4 mr-1" />
                  홀 추가
                </button>
              </div>

              <div className="space-y-4">
                {newMemberData.score.holes.map((hole, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">홀 {hole.holeNumber}</span>
                        {hole.scoreType !== 'normal' && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                            {hole.scoreType}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeHole(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">타수</label>
                        <input
                          type="number"
                          value={hole.strokes}
                          onChange={(e) => updateHoleField(index, 'strokes', Number(e.target.value))}
                          className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">파</label>
                        <input
                          type="number"
                          value={hole.par}
                          onChange={(e) => updateHoleField(index, 'par', Number(e.target.value))}
                          className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">스코어 타입</label>
                        <select
                          value={hole.scoreType}
                          onChange={(e) => updateHoleField(index, 'scoreType', e.target.value)}
                          className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="normal">Normal</option>
                          <option value="birdie">Birdie</option>
                          <option value="eagle">Eagle</option>
                          <option value="bogey">Bogey</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">노트</label>
                        <input
                          type="text"
                          value={hole.notes}
                          onChange={(e) => updateHoleField(index, 'notes', e.target.value)}
                          className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t bg-white">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default MemberEditDrawer;