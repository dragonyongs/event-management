export const getCount = (dataArray) => {
  return Array.isArray(dataArray) ? dataArray.length : 0;
};

// 골프 스코어 합산
export const calculateTotalScore = (holes) => {
  return holes.reduce((total, hole) => total + hole.strokes, 0);
}


export function mapUserIdsToUserObjects(users, dummyUsers) {
  if (!Array.isArray(users) || users.length === 0) return users;

  // 배열의 첫 요소가 문자열이면 ID 배열로 판단하여 변환
  if (typeof users[0] === 'string') {
    return users.map(userId => dummyUsers.find(user => user.id === userId));
  }
  // 이미 객체 배열이면 그대로 반환
  return users;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};
