import React from 'react';
import { FiPlus, FiClock, FiUser, FiEdit2, FiTrash2 } from 'react-icons/fi';

const GolfManagement = ({ 
  data,
  onAddGroup, 
  onEditGroup, 
  onDeleteGroup, 
  onAddMember,
  onEditMember,
}) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 border-l-4 border-green-500 border border-green-200 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-50 border-l-4 border-yellow-500 border border-yellow-200 hover:bg-yellow-100';
      default: // 불참
        return 'bg-red-50 border-l-4 border-red-500 border border-red-200 hover:bg-red-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">골프 조 편성</h2>
        <button
          onClick={onAddGroup} // 부모 콜백 호출
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiPlus className="mr-2" />
          조 추가하기
        </button>
      </div>
      {data.groups.length === 0 ? (
          <div className="flex items-center justify-center h-96 rounded-2xl bg-white text-gray-500 text-center">추가된 조가 없습니다.</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.groups.map((group) => (
            <div 
              key={group.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{group.name}</h3>
                  <div className="flex items-center mt-1 text-gray-500">
                    <FiClock className="mr-1" />
                    <span className="text-sm">
                      {new Date(group.teeTime.start).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {group.teeTime.estimatedDuration && (
                        <span className="ml-2">
                          ({group.teeTime.estimatedDuration}소요)
                        </span>
                      )}
                    </span>
                  </div>
                  <div className='flex items-center mt-1 text-gray-500 text-sm'>
                    <FiUser className="mr-1" /> 참여확정: {group.members.filter((member) => member.status === 'confirmed').length}명
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditGroup(group)}
                    className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => onDeleteGroup(group.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              
              <ul className="space-y-3">
                { group?.members.length === 0 ? 
                  (
                    <button
                    type="button"
                    onClick={onAddMember}
                    className="w-full p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-gray-600"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>참가자 추가</span>
                    </button>
                  ) : group.members.map((member) => (
                    <li 
                      key={member.id} 
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${getStatusStyles(member.status)}`}
                      onClick={() => onEditMember(group.id, member)}
                    >
                      <div className="flex items-center">
                        <FiUser className={`mr-2 ${
                          member.status === 'confirmed' ? 'text-green-600' :
                          member.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className={`text-sm ${
                            member.status === 'confirmed' ? 'text-green-600' :
                            member.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {member.status === 'confirmed' 
                              ? '참석 확정' 
                              : member.status === 'pending' 
                              ? '대기중' 
                              : '불참' + (member.reason ? ' - ' + member.reason : '')
                            }
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        HC {member.handicap}
                      </span>
                    </li>
                )) 
              }
              </ul>
            </div>
          ))}
        </div>
        )}
    </div>
  );
};

export default GolfManagement;
