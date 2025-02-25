import { useDrag } from 'react-dnd';
import { FiUser } from 'react-icons/fi';

const MemberItem = ({ member, groupId, onDropMember, onEditMember, getStatusStyles }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'member', // 드래그 타입
        item: { memberId: member.id, fromGroupId: groupId }, // 드래그 시작 시 전달할 데이터
        end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            onDropMember(item.memberId, item.fromGroupId, dropResult.groupId);
        }
        },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <li
        ref={drag}
        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${getStatusStyles(member.status, member.score)} ${isDragging ? 'opacity-50' : ''}`}
        onClick={() => onEditMember(groupId, member)}
        >
        <div className="flex items-center">
            <FiUser
            className={`mr-2 ${
                member.status === 'confirmed'
                ? member?.score?.holes?.length > 0
                    ? 'text-green-600'
                    : 'text-blue-600'
                : member.status === 'pending'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
            />
            <div>
            <p className="font-medium text-gray-900">{member.name}</p>
            <p
                className={`text-sm ${
                member.status === 'confirmed'
                    ? member?.score?.holes?.length > 0
                    ? 'text-green-600'
                    : 'text-blue-600'
                    : member.status === 'pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
            >
                {member.status === 'confirmed'
                ? member?.score?.holes?.length > 0
                    ? `홀 ${member.score.holes[member.score.holes.length - 1].holeNumber} 진행 중`
                    : '참석 확정'
                : member.status === 'pending'
                ? '대기중'
                : '불참' + (member.reason ? ' - ' + member.reason : '')}
            </p>
            </div>
        </div>
        <span className="text-sm font-medium text-gray-600">HC {member.handicap}</span>
        </li>
    );
};

export default MemberItem;