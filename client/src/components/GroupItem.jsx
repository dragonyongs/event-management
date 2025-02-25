import { useDrop } from 'react-dnd';
import { FiClock, FiUser, FiEdit2, FiTrash2 } from 'react-icons/fi';

const GroupItem = ({ group, onDropMember, onEditGroup, onDeleteGroup, onAddMember, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'member', // 드롭 가능한 타입
        drop: () => ({ groupId: group.id }), // 드롭 시 전달할 데이터
        collect: (monitor) => ({
        isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
        ref={drop}
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 ${isOver ? 'bg-blue-50' : ''}`}
        >
        <div className="flex justify-between items-start mb-4">
            <div>
            <h3 className="font-semibold text-gray-900 text-lg">{group.name}</h3>
            <div className="flex items-center mt-1 text-gray-500">
                <FiClock className="mr-1" />
                <span className="text-sm">
                {new Date(group.teeTime.start).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                {group.teeTime.estimatedDuration && (
                    <span className="ml-2">({group.teeTime.estimatedDuration}소요)</span>
                )}
                </span>
            </div>
            <div className="flex items-center mt-1 text-gray-500 text-sm">
                <FiUser className="mr-1" /> 참여확정: {group.members.filter((member) => member.status === 'confirmed').length}명
            </div>
            </div>
            <div className="flex space-x-2">
            <button onClick={() => onEditGroup(group)} className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                <FiEdit2 />
            </button>
            <button onClick={() => onDeleteGroup(group.id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                <FiTrash2 />
            </button>
            </div>
        </div>
        {children}
        </div>
    );
};

export default GroupItem;