import React from 'react';

const TourManagement = ({ data, onAddBusGroup, onAddDestination }) => {
  return (
    <div className="space-y-8">
      {/* 버스 그룹 섹션 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">버스 그룹</h2>
          <button
            onClick={onAddBusGroup}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            버스 추가하기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.busGroups.map((bus) => (
            <div key={bus.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">{bus.name}</h3>
                {/* 현재 탑승 인원이 좌석 수와 일치하면 탑승 완료로 표시 */}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    bus.currentCount === bus.capacity ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {bus.currentCount === bus.capacity ? '탑승 완료' : '탑승 대기'}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>총 {bus.capacity}석</span>
                <span>{bus.currentCount}명 탑승</span>
              </div>
              <div className="mb-2 text-sm text-gray-600">
                출발: {new Date(bus.schedule.departure).toLocaleTimeString()}<br />
                도착: {new Date(bus.schedule.arrival).toLocaleTimeString()}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(bus.currentCount / bus.capacity) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 관광지 섹션 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">관광지 현황</h2>
          <button
            onClick={onAddDestination}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            관광지 추가하기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-gray-900 mb-2">{dest.name}</h3>
              <p className="text-sm text-gray-600 mb-4">
                방문 시간: {new Date(dest.schedule.start).toLocaleTimeString()} ~ {new Date(dest.schedule.end).toLocaleTimeString()}
              </p>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>정원 {dest.maxCapacity}명</span>
                <span>{dest.currentCount}명 예약</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(dest.currentCount / dest.maxCapacity) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourManagement;
