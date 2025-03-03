import React, { useEffect, useState, useMemo, useCallback } from 'react';
import SearchAndFilter from './SearchAndFilter';
import UserTable from './UserTable';
import Pagination from './Pagination';
import { LuUsers } from 'react-icons/lu';

const UserManagement = ({
  dispatch,
  users,
  assignmentCategories = [],
  onAssignUser,
  onEditUser,
  onEventDeleteUser,
  enableAssignment = true,
  pageSize = 10,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDivision, setFilterDivision] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // 검색 & 필터 로직
  const filteredUsers = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const searched = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        (user.company || '').toLowerCase().includes(lowerQuery) ||
        (user.position || '').toLowerCase().includes(lowerQuery) ||
        (user.role || '').toLowerCase().includes(lowerQuery)
    );
    return filterDivision === 'ALL'
      ? searched
      : searched.filter((user) => user.division === filterDivision);
  }, [users, searchQuery, filterDivision]);

  // 페이지네이션
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'prev'
        ? Math.max(prev - 1, 1)
        : Math.min(prev + 1, totalPages)
    );
  };

  const toggleSelectUser = useCallback((userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const toggleSelectAllOnPage = () => {
    const currentPageIds = currentPageData.map((u) => u.id);
    const allSelected = currentPageIds.every((id) =>
      selectedUserIds.includes(id)
    );
    setSelectedUserIds((prev) =>
      allSelected
        ? prev.filter((id) => !currentPageIds.includes(id))
        : Array.from(new Set([...prev, ...currentPageIds]))
    );
  };

  // 개별 배정 (이미 배정된 경우 제거, 아니라면 배정) → 부모 onAssignUser 호출
  const handleAssignUser = (user, categoryKey) => {
    onAssignUser(user, categoryKey);
  };

  // 통합 일괄 배정 (선택된 사용자가 있으면 해당 사용자, 없으면 필터 구분에 해당하는 사용자)
  const handleBulkAssignUnified = (categoryKey) => {
    let targetUsers;

    if (selectedUserIds.length > 0) {
      targetUsers = users.filter((user) => selectedUserIds.includes(user.id));
    } else if (filterDivision !== 'ALL') {
      targetUsers = users.filter((user) => user.division === filterDivision);
    } else {
      return; // 적용 대상이 없으면 처리하지 않음
    }

    targetUsers.forEach((user) => {
      const isAssigned =
        user.assignments && user.assignments.includes(categoryKey);
      onAssignUser(user, isAssigned ? null : categoryKey);
    });
    setSelectedUserIds([]);
  };

  // bulk 삭제 기능 추가
  const handleBulkDelete = () => {
    selectedUserIds.forEach((id) => onEventDeleteUser(id));
    setSelectedUserIds([]);
  };

  const handleUserInfo = (user) => {
    onEditUser(user);
  };

  return (
    <div className="p-5 space-y-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row md:justify-between gap-4">
        {/* 검색 & 필터 */}
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          border-b
          border-gray-200
          filterDivision={filterDivision}
          setFilterDivision={setFilterDivision}
        />

        {/* 통합 배정 버튼 */}
        {enableAssignment && assignmentCategories.length > 0 && (
          <div className="flex flex-wrap space-x-3">
            {assignmentCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleBulkAssignUnified(cat.key)}
                disabled={
                  selectedUserIds.length === 0 && filterDivision === 'ALL'
                }
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md transition font-medium focus:outline-none border ${
                  selectedUserIds.length === 0 && filterDivision === 'ALL'
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : `${cat.bgStyle} ${cat.hoverStyle} ${cat.textStyle} ${cat.borderStyle}`
                }`}
              >
                {cat.icon && <span className="mr-2">{cat.icon}</span>}
                {cat.label}{' '}
                {selectedUserIds.length > 0
                  ? ``
                  : filterDivision !== 'ALL'
                    ? '적용'
                    : ''}
              </button>
            ))}
          </div>
        )}

        {!enableAssignment && (
          <button
            onClick={() =>
              dispatch({ type: 'OPEN_DRAWER', drawer: 'isCreateUserDrawer' })
            }
            className="inline-flex items-center px-4 py-2.5 bg-white text-blue-600 rounded-lg border border-blue-500
                                hover:text-blue-700 hover:bg-blue-50 active:bg-blue-300 
                                shadow-sm hover:shadow-md transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <LuUsers className="w-5 h-5 mr-2" />
            사용자 등록
          </button>
        )}
      </div>
      {selectedUserIds.length > 0 && enableAssignment && (
        <div className="flex justify-between">
          <div className="flex items-center gap-x-4">
            {`${selectedUserIds.length}명 선택`}
          </div>
          <div>
            <button
              onClick={handleBulkDelete}
              className={`flex items-center px-4 py-2 rounded-md transition font-medium focus:outline-none bg-red-500 text-white`}
            >
              선택 제외
            </button>
          </div>
        </div>
      )}
      {/* 사용자 테이블 */}
      <UserTable
        users={currentPageData}
        assignmentCategories={assignmentCategories}
        onAssignUser={handleAssignUser}
        selectedUserIds={selectedUserIds}
        toggleSelectUser={toggleSelectUser}
        toggleSelectAllOnPage={toggleSelectAllOnPage}
        handleUserInfo={handleUserInfo}
        onEventDeleteUser={onEventDeleteUser}
        enableAssignment={enableAssignment}
      />

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserManagement;
