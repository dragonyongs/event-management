import React, { useState, useEffect } from 'react';
import GolfScoreSection from "../components/GolfScoreSection";
import { FiX } from 'react-icons/fi';

const GolfMemberEditDrawer = ({ event, memberData, onClose, onSubmit}) => {
  const getInitialData = (data) => ({
    id: data?.id || '',
    name: data?.name || '',
    handicap: data?.handicap ?? '',
    score: {
      total: data?.score?.total ?? 0,
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

  // 새로운 홀을 추가할 때 기본값이 포함된 객체 생성
  const addHole = () => {
    const newHole = {
      holeNumber: newMemberData.score.holes.length + 1,
      strokes: 0,
      par: 0,
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

  const handleHolesChange = (holes) => {
    setNewMemberData(prev => ({
      ...prev,
      score: {
        ...prev.score,
        holes: [...holes]
      }
    }));
  };

  useEffect(() => {
    const computedTotal = newMemberData.score.holes.reduce((total, hole) => {
      return total + (hole.strokes - hole.par);
    }, 0);
  
    if (computedTotal !== newMemberData.score.total) {
      setNewMemberData(prev => ({
        ...prev,
        score: {
          ...prev.score,
          total: computedTotal
        }
      }));
    }
  }, [newMemberData.score.holes]);

  const handleSubmit = () => {
    onSubmit(newMemberData);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">골프 참가자 정보 관리</h3>
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
              <h4 className="text-lg font-medium text-gray-900">점수 현황</h4>
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                총 {newMemberData.score.holes.length}홀
              </div>
            </div>

            <div className="mb-6 flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-4">총 점수:</label>
              <div className="text-sm font-medium text-gray-900">{newMemberData.score.total}</div>
            </div>

            {/* 홀별 점수 섹션 */}
            <GolfScoreSection 
              holes={newMemberData?.score?.holes} 
              addHole={addHole} 
              removeHole={removeHole} 
              updateHoleField={updateHoleField}
              onHolesChange={handleHolesChange} 
            />

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

export default GolfMemberEditDrawer;
