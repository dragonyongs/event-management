import React from 'react';
import GroupItem from '../GroupItem';
import MemberItem from '../MemberItem';
import { FiPlus, FiClock, FiUser, FiEdit2, FiTrash2 } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error Boundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

const GolfManagement = ({ 
    data,
    onAddGroup, 
    onEditGroup, 
    onDeleteGroup, 
    onAddMember,
    onEditMember,
    onDropMember,
}) => {

    const getStatusStyles = (status, score) => {
        if (status === 'confirmed') {
            if (score?.holes?.length > 0) {
                return 'bg-green-50 border-l-4 border-green-500 border border-green-200 hover:bg-green-100';
            } else {
                return 'bg-blue-50 border-l-4 border-blue-500 border border-blue-200 hover:bg-blue-100';
            }
        }
        if (status === 'pending') {
            return 'bg-yellow-50 border-l-4 border-yellow-500 border border-yellow-200 hover:bg-yellow-100';
        }

        return 'bg-red-50 border-l-4 border-red-500 border border-red-200 hover:bg-red-100';
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
                <ErrorBoundary key={group.id}>
                    <GroupItem
                            key={group.id}
                            group={group}
                            onDropMember={onDropMember}
                            onEditGroup={onEditGroup}
                            onDeleteGroup={onDeleteGroup}
                            onAddMember={onAddMember}
                    >
                        <ul className="space-y-3">
                            {[...group.members]
                                .sort((a, b) => {

                                const getPriority = (member) => {
                                    if (member?.score?.holes?.length > 0) {
                                    return 1; // 진행중
                                    } else if (member.status === 'confirmed') {
                                    return 2; // 참여확정
                                    } else if (member.status === 'pending') {
                                    return 3; // 대기중
                                    } else {
                                    return 4; // 불참
                                    }
                                };

                                const priorityA = getPriority(a);
                                const priorityB = getPriority(b);

                                if (priorityA !== priorityB) {
                                    return priorityA - priorityB;
                                }

                                if (priorityA === 1) {
                                    const aLastHole = a?.score?.holes[a.score.holes.length - 1]?.holeNumber || 0;
                                    const bLastHole = b?.score?.holes[b.score.holes.length - 1]?.holeNumber || 0;
                                    return bLastHole - aLastHole;
                                }

                                return 0;
                                })
                                .map((member) => (
                                <MemberItem
                                    key={member.id}
                                    member={member}
                                    groupId={group.id}
                                    onDropMember={onDropMember}
                                    onEditMember={onEditMember}
                                    getStatusStyles={getStatusStyles}
                                />
                            ))} 
                        </ul>

                        <div className='mt-4'>
                        <button
                                type="button"
                                onClick={() => onAddMember(group)}
                                className="w-full p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-gray-600"
                            >
                                <FiUser className="w-5 h-5" />
                                <span>참가자 추가</span>
                            </button>
                        </div>
                    </GroupItem>
            </ErrorBoundary>
            ))}
            </div>
            )}
        </div>
    );
};

export default GolfManagement;