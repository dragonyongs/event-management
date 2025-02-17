import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const MemberEditDrawer = ({ memberData, onClose, onSubmit }) => {
  const [newMemberData, setNewMemberData] = useState({
    ...memberData,
    score: memberData?.score || { total: '', holes: [] }
  });

  useEffect(() => {
    setNewMemberData({
      ...memberData,
      score: memberData?.score || { total: '', holes: [] }
    });
  }, [memberData]);

  const handleSubmit = () => {
    onSubmit(newMemberData);
  };

  const addHole = () => {
    const newHole = {
      holeNumber: newMemberData.score.holes.length + 1,
      strokes: '',
      par: '',
      scoreType: 'normal',
      notes: ''
    };
    setNewMemberData((prev) => ({
      ...prev,
      score: {
        ...prev.score,
        holes: [...prev.score.holes, newHole]
      }
    }));
  };

  const removeHole = (index) => {
    setNewMemberData((prev) => ({
      ...prev,
      score: {
        ...prev.score,
        holes: prev.score.holes.filter((_, i) => i !== index)
      }
    }));
  };

  const updateHoleField = (index, field, value) => {
    const updatedHoles = newMemberData.score.holes.map((hole, i) =>
      i === index ? { ...hole, [field]: value } : hole
    );
    setNewMemberData((prev) => ({
      ...prev,
      score: {
        ...prev.score,
        holes: updatedHoles
      }
    }));
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-lg font-semibold">참가자 정보 관리</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiX />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
          <input
            type="text"
            value={newMemberData.name}
            onChange={(e) =>
              setNewMemberData({ ...newMemberData, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">참가 상태</label>
          <select
            value={newMemberData.status}
            onChange={(e) =>
              setNewMemberData({ ...newMemberData, status: e.target.value })
            }
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
              value={newMemberData.reason || ''}
              onChange={(e) =>
                setNewMemberData({ ...newMemberData, reason: e.target.value })
              }
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
            onChange={(e) =>
              setNewMemberData({ ...newMemberData, handicap: Number(e.target.value) })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="72"
          />
        </div>
        <div className="border-t pt-4">
          <h4 className="text-md font-semibold mb-2">점수 관리</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">총 점수</label>
            <input
              type="number"
              value={newMemberData.score.total || ''}
              onChange={(e) =>
                setNewMemberData({
                  ...newMemberData,
                  score: {
                    ...newMemberData.score,
                    total: Number(e.target.value)
                  }
                })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="총 점수를 입력하세요"
            />
          </div>
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">홀별 점수</h5>
            {newMemberData.score.holes.map((hole, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>홀 {hole.holeNumber}</span>
                  <button type="button" onClick={() => removeHole(index)} className="text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">타수</label>
                    <input
                      type="number"
                      value={hole.strokes}
                      onChange={(e) => updateHoleField(index, 'strokes', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">파</label>
                    <input
                      type="number"
                      value={hole.par}
                      onChange={(e) => updateHoleField(index, 'par', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">스코어 타입</label>
                    <select
                      value={hole.scoreType}
                      onChange={(e) => updateHoleField(index, 'scoreType', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="birdie">Birdie</option>
                      <option value="eagle">Eagle</option>
                      <option value="bogey">Bogey</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">노트</label>
                    <input
                      type="text"
                      value={hole.notes}
                      onChange={(e) => updateHoleField(index, 'notes', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addHole} className="flex items-center text-blue-500 hover:underline mt-2">
              <FiPlus className="mr-1" /> 홀 추가
            </button>
          </div>
        </div>
      </div>

      <div className="border-t p-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default MemberEditDrawer;
