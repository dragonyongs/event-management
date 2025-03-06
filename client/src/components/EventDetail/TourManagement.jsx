import React, { useState } from 'react'; // (추가) 상태 관리를 위한 useState 추가

const TourManagement = ({ data, onAddBusGroup, onAddDestination }) => {
  // (추가) 버스 필터링을 위한 상태
  const [busFilter, setBusFilter] = useState('all');
  // (추가) 관광지 검색을 위한 상태
  const [searchTerm, setSearchTerm] = useState('');
  
  // (추가) 필터링된 버스 데이터
  const filteredBuses = data.busGroups.filter(bus => {
    console.log(bus)
    if (busFilter === 'all') return true;
    if (busFilter === 'completed') return bus.currentCount === bus.capacity;
    if (busFilter === 'waiting') return bus.currentCount < bus.capacity;
    return true;
  });
  
  // (추가) 검색된 관광지 데이터
  const filteredDestinations = data.destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // (추가) 남은 시간 표시 함수
  const getRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return '종료됨';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours > 0 ? `${hours}시간 ` : ''}${minutes}분 남음`;
  };

  return (
    <div className="space-y-8"> {/* (수정) 배경 및 여백 추가 */}
      <h2 className="text-xl font-semibold text-gray-900">관광 일정 관리</h2>
      
      {/* 버스 그룹 섹션 */}
      <section className="bg-white rounded-xl shadow-md p-6"> {/* (수정) 섹션 스타일 개선 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">버스 그룹</h2>
            <p className="text-sm text-gray-500">총 {data.busGroups.length}개의 버스 그룹이 있습니다</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* (추가) 필터 버튼 */}
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setBusFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                  busFilter === 'all' 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setBusFilter('completed')}
                className={`px-4 py-2 text-sm font-medium border-t border-b ${
                  busFilter === 'completed' 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                탑승 완료
              </button>
              <button
                onClick={() => setBusFilter('waiting')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                  busFilter === 'waiting' 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                탑승 대기
              </button>
            </div>
            
            <button
              onClick={onAddBusGroup}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              버스 추가하기
            </button>
          </div>
        </div>

        {filteredBuses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            표시할 버스 그룹이 없습니다
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuses.map((bus) => (
              <div key={bus.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{bus.name}</h3>
                    <p className="text-sm text-gray-500">ID: {bus.id}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      bus.currentCount === bus.capacity 
                        ? 'bg-green-100 text-green-800' 
                        : bus.currentCount >= bus.capacity * 0.8 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {bus.currentCount === bus.capacity 
                      ? '탑승 완료' 
                      : bus.currentCount >= bus.capacity * 0.8 
                        ? '거의 찼음'
                        : '탑승 대기'}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span className="text-sm">출발: {new Date(bus.schedule.departure).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l4 4m0 0l-4 4m4-4H7m6-4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span className="text-sm">도착: {new Date(bus.schedule.arrival).toLocaleTimeString()}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">{bus.currentCount}명 / {bus.capacity}석</span>
                    <span className={bus.currentCount === bus.capacity ? 'text-green-600 font-medium' : 'text-blue-600'}>
                      {bus.currentCount === bus.capacity ? '만석' : `${bus.capacity - bus.currentCount}석 남음`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${
                        bus.currentCount === bus.capacity 
                          ? 'bg-green-500' 
                          : bus.currentCount >= bus.capacity * 0.8 
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${(bus.currentCount / bus.capacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                
                {/* (추가) 버튼 */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    승객 목록
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    일정 수정
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 관광지 섹션 */}
      <section className="bg-white rounded-xl shadow-md p-6"> {/* (수정) 섹션 스타일 개선 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">관광지 현황</h2>
            <p className="text-sm text-gray-500">총 {data.destinations.length}개의 관광지가 있습니다</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* (추가) 검색 필드 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="관광지 검색..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            
            <button
              onClick={onAddDestination}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              관광지 추가하기
            </button>
          </div>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            표시할 관광지가 없습니다
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{dest.name}</h3>
                  <span className="text-sm text-gray-500">ID: {dest.id}</span>
                </div>
                
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm font-medium">방문 시간:</span>
                  </div>
                  <div className="flex justify-between text-sm ml-7">
                    <span>
                      {new Date(dest.schedule.start).toLocaleTimeString()} ~ {new Date(dest.schedule.end).toLocaleTimeString()}
                    </span>
                    <span className="text-blue-600 font-medium">
                      {getRemainingTime(dest.schedule.end)}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">{dest.currentCount}명 / {dest.maxCapacity}명</span>
                    <span className={dest.currentCount >= dest.maxCapacity ? 'text-red-600 font-medium' : 'text-blue-600'}>
                      {dest.currentCount >= dest.maxCapacity ? '만원' : `${dest.maxCapacity - dest.currentCount}명 여유`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${
                        dest.currentCount >= dest.maxCapacity 
                          ? 'bg-red-500' 
                          : dest.currentCount >= dest.maxCapacity * 0.8 
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${(dest.currentCount / dest.maxCapacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                
                {/* (추가) 태그와 버튼 */}
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                      평균 체류 시간: 1시간 30분
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded">
                      인기도: 높음
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      방문객 목록
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                      일정 수정
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TourManagement;