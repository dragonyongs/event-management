export const getCount = (dataArray) => {
  return Array.isArray(dataArray) ? dataArray.length : 0;
};

// 골프 스코어 합산
export const calculateTotalScore = (holes) => {
  return holes.reduce((total, hole) => total + hole.strokes, 0);
}
