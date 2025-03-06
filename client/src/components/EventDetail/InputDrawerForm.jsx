import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { FaBus, FaMapMarkerAlt, FaTimes, FaClock, FaUser, FaCalendarAlt, FaArrowRight, FaPlus, FaSave, FaIdCard } from 'react-icons/fa';

const InputDrawerForm = () => {
  const [isBusDrawerOpen, setBusDrawerOpen] = useState(false);
  const [isTourismDrawerOpen, setTourismDrawerOpen] = useState(false);
  
  // 버스 입력 폼 상태
  const [busForm, setBusForm] = useState({
    id: '',
    name: '',
    departure: '',
    arrival: '',
    totalSeats: 45
  });
  
  // 관광지 입력 폼 상태
  const [tourismForm, setTourismForm] = useState({
    id: '',
    name: '',
    visitStartTime: '',
    visitEndTime: '',
    maxVisitors: 100,
    avgStayTime: '',
    popularity: '보통'
  });
  
  const toggleBusDrawer = () => {
    setBusDrawerOpen(!isBusDrawerOpen);
  };
  
  const toggleTourismDrawer = () => {
    setTourismDrawerOpen(!isTourismDrawerOpen);
  };
  
  const handleBusFormChange = (e) => {
    const { name, value } = e.target;
    setBusForm({
      ...busForm,
      [name]: value
    });
  };
  
  const handleTourismFormChange = (e) => {
    const { name, value } = e.target;
    setTourismForm({
      ...tourismForm,
      [name]: value
    });
  };
  
  const handleBusSubmit = (e) => {
    e.preventDefault();
    // 여기서 데이터 저장 로직을 구현하면 됩니다
    console.log('버스 데이터 저장:', busForm);
    // 성공 시 드로어 닫기
    setBusDrawerOpen(false);
  };
  
  const handleTourismSubmit = (e) => {
    e.preventDefault();
    // 여기서 데이터 저장 로직을 구현하면 됩니다
    console.log('관광지 데이터 저장:', tourismForm);
    // 성공 시 드로어 닫기
    setTourismDrawerOpen(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={toggleBusDrawer}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <FaBus className="text-lg" />
          <span className="font-medium">버스 추가하기</span>
        </button>
        
        <button
          onClick={toggleTourismDrawer}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <FaMapMarkerAlt className="text-lg" />
          <span className="font-medium">관광지 추가하기</span>
        </button>
      </div>
      
      {/* 버스 추가 드로어 */}
      <Drawer
        open={isBusDrawerOpen}
        onClose={toggleBusDrawer}
        direction="right"
        size={480}
        className="drawer"
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">새 버스 그룹 추가</h2>
            <button onClick={toggleBusDrawer} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          
          <form onSubmit={handleBusSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">버스 그룹 ID</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaIdCard />
                  </span>
                  <input
                    type="text"
                    name="id"
                    value={busForm.id}
                    onChange={handleBusFormChange}
                    placeholder="예: bus-004"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">버스 그룹명</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaBus />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={busForm.name}
                    onChange={handleBusFormChange}
                    placeholder="예: 버스 그룹 D"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">출발 시간</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="text"
                    name="departure"
                    value={busForm.departure}
                    onChange={handleBusFormChange}
                    placeholder="예: 오전 09:00"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">도착 시간</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaClock />
                  </span>
                  <input
                    type="text"
                    name="arrival"
                    value={busForm.arrival}
                    onChange={handleBusFormChange}
                    placeholder="예: 오후 06:00"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">총 좌석 수</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    type="number"
                    name="totalSeats"
                    value={busForm.totalSeats}
                    onChange={handleBusFormChange}
                    min="1"
                    max="100"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center bg-blue-50 p-3 rounded-lg mt-6">
                <div className="text-blue-600 mr-2">
                  <FaUser />
                </div>
                <div className="text-sm text-blue-800">
                  현재 탑승 인원은 버스 그룹이 생성된 후 별도로 관리됩니다.
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={toggleBusDrawer}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <FaSave className="mr-2" />
                저장하기
              </button>
            </div>
          </form>
        </div>
      </Drawer>
      
      {/* 관광지 추가 드로어 */}
      <Drawer
        open={isTourismDrawerOpen}
        onClose={toggleTourismDrawer}
        direction="right"
        size={480}
        className="drawer"
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">새 관광지 추가</h2>
            <button onClick={toggleTourismDrawer} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          
          <form onSubmit={handleTourismSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">관광지 ID</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaIdCard />
                  </span>
                  <input
                    type="text"
                    name="id"
                    value={tourismForm.id}
                    onChange={handleTourismFormChange}
                    placeholder="예: dest-002"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">관광지명</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaMapMarkerAlt />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={tourismForm.name}
                    onChange={handleTourismFormChange}
                    placeholder="예: 창덕궁"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="mb-3">
                  <label className="block text-gray-700 font-medium mb-1">방문 시작 시간</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <FaCalendarAlt />
                    </span>
                    <input
                      type="text"
                      name="visitStartTime"
                      value={tourismForm.visitStartTime}
                      onChange={handleTourismFormChange}
                      placeholder="예: 오전 10:00"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">방문 종료 시간</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <FaClock />
                    </span>
                    <input
                      type="text"
                      name="visitEndTime"
                      value={tourismForm.visitEndTime}
                      onChange={handleTourismFormChange}
                      placeholder="예: 오후 12:00"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">최대 수용 인원</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    type="number"
                    name="maxVisitors"
                    value={tourismForm.maxVisitors}
                    onChange={handleTourismFormChange}
                    min="1"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">평균 체류 시간</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaClock />
                  </span>
                  <input
                    type="text"
                    name="avgStayTime"
                    value={tourismForm.avgStayTime}
                    onChange={handleTourismFormChange}
                    placeholder="예: 1시간 30분"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">인기도</label>
                <select
                  name="popularity"
                  value={tourismForm.popularity}
                  onChange={handleTourismFormChange}
                  className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="낮음">낮음</option>
                  <option value="보통">보통</option>
                  <option value="높음">높음</option>
                </select>
              </div>
              
              <div className="flex items-center bg-blue-50 p-3 rounded-lg mt-6">
                <div className="text-blue-600 mr-2">
                  <FaUser />
                </div>
                <div className="text-sm text-blue-800">
                  현재 방문객 수는 관광지가 생성된 후 별도로 관리됩니다.
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={toggleTourismDrawer}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <FaSave className="mr-2" />
                저장하기
              </button>
            </div>
          </form>
        </div>
      </Drawer>
      
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <p className="text-center text-gray-700">
          퍼블리싱 테스트: 버스 또는 관광지 추가하기 버튼 추후 관광탭에서 적용 예정
        </p>
      </div>
    </div>
  );
};

export default InputDrawerForm;