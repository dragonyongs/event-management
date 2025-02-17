import { RiGolfBallLine, RiBusLine } from "react-icons/ri";

const GolfInfo = ({ golfDetails }) => {
  console.log("golfDetails", golfDetails);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-3">
        <RiGolfBallLine className="text-green-500" />
        <h4 className="font-semibold text-gray-900">골프 정보</h4>
      </div>
      <p className="text-sm text-gray-600">경기장: {golfDetails.venue}</p>
      <p className="text-sm text-gray-600">
        총 그룹: {golfDetails.groups.length}팀
      </p>

      <div className="mt-2 space-y-2">
        {golfDetails.groups.map((group) => (
          <div key={group.id} className="border p-2 rounded-lg">
            <h5 className="text-sm font-semibold">
              {group.name} - 티타임: {group.teeTime.start} (예상 시간: {group.teeTime.estimatedDuration})
            </h5>
            <p className="text-xs text-gray-500">
              인원: {group.members.length}명 (평균 핸디캡: {averageHandicap(group.members)})
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

const TourInfo = ({ tourDetails }) => {
  console.log("tourDetails", tourDetails);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-3">
        <RiBusLine className="text-blue-500" />
        <h4 className="font-semibold text-gray-900">관광 정보</h4>
      </div>
      <p className="text-sm text-gray-600">
        총 인원: {totalPassengers(tourDetails.busGroups)}명
      </p>
      <p className="text-sm text-gray-600">
        운행 버스: {tourDetails.busGroups.length}대
      </p>

      <div className="mt-2 space-y-2">
        {tourDetails.destinations.map((dest) => (
          <div key={dest.id} className="border p-2 rounded-lg">
            <h5 className="text-sm font-semibold">{dest.name}</h5>
            <p className="text-xs text-gray-500">
              방문 시간: {dest.schedule.start} ~ {dest.schedule.end} | 참여: {dest.currentCount} / {dest.maxCapacity}명
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 평균 핸디캡 계산 함수
const averageHandicap = (members) => {
  const total = members.reduce((sum, m) => sum + m.handicap, 0);
  return (total / members.length).toFixed(1);
};

// 총 승객 수 계산 함수
const totalPassengers = (buses) => {
  return buses.reduce((sum, bus) => sum + bus.currentCount, 0);
};

export { GolfInfo, TourInfo };
