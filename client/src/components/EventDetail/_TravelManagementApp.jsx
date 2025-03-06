import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { FaBus, FaMapMarkerAlt, FaTimes, FaClock, FaUser, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const TravelManagementApp = () => {
  const [isBusDrawerOpen, setBusDrawerOpen] = useState(false);
  const [isTourismDrawerOpen, setTourismDrawerOpen] = useState(false);
  
  // Sample data for buses
  const busGroups = [
    {
      id: 'bus-001',
      name: '버스 그룹 A',
      status: '탑승 완료',
      statusColor: 'bg-green-100 text-green-800',
      departure: '오전 09:00',
      arrival: '오후 06:00',
      currentPassengers: 45,
      totalSeats: 45,
      fullness: 100,
      fullnessColor: 'bg-green-500',
      fullnessText: '만석',
      fullnessTextColor: 'text-green-600'
    },
    {
      id: 'bus-002',
      name: '버스 그룹 B',
      status: '거의 찼음',
      statusColor: 'bg-yellow-100 text-yellow-800',
      departure: '오전 09:30',
      arrival: '오후 06:30',
      currentPassengers: 38,
      totalSeats: 45,
      fullness: 84,
      fullnessColor: 'bg-yellow-500',
      seatsLeft: 7,
      fullnessText: '7석 남음',
      fullnessTextColor: 'text-blue-600'
    },
    {
      id: 'bus-003',
      name: '버스 그룹 C',
      status: '탑승 대기',
      statusColor: 'bg-blue-100 text-blue-800',
      departure: '오전 10:00',
      arrival: '오후 07:00',
      currentPassengers: 18,
      totalSeats: 30,
      fullness: 60,
      fullnessColor: 'bg-blue-500',
      seatsLeft: 12,
      fullnessText: '12석 남음',
      fullnessTextColor: 'text-blue-600'
    }
  ];
  
  // Sample data for tourism destinations
  const tourismDestinations = [
    {
      id: 'dest-001',
      name: '경복궁',
      visitHours: '오전 10:00 ~ 오후 12:00',
      hourStatus: '종료됨',
      hourStatusColor: 'text-blue-600',
      currentVisitors: 85,
      maxVisitors: 100,
      fullness: 85,
      fullnessColor: 'bg-yellow-500',
      visitorsLeft: 15,
      visitorsLeftText: '15명 여유',
      avgStayTime: '1시간 30분',
      popularity: '높음'
    }
  ];
  
  const toggleBusDrawer = () => {
    setBusDrawerOpen(!isBusDrawerOpen);
    if (isTourismDrawerOpen) setTourismDrawerOpen(false);
  };
  
  const toggleTourismDrawer = () => {
    setTourismDrawerOpen(!isTourismDrawerOpen);
    if (isBusDrawerOpen) setBusDrawerOpen(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={toggleBusDrawer}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <FaBus className="text-lg" />
          <span className="font-medium">버스 관리</span>
        </button>
        
        <button
          onClick={toggleTourismDrawer}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <FaMapMarkerAlt className="text-lg" />
          <span className="font-medium">관광지 관리</span>
        </button>
      </div>
      
      {/* Bus Drawer */}
      <Drawer
        open={isBusDrawerOpen}
        onClose={toggleBusDrawer}
        size={480}
        direction="right"
        className="drawer"
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">버스 그룹</h2>
            <button onClick={toggleBusDrawer} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-500">총 3개의 버스 그룹이 있습니다</p>
          </div>
          
          <div className="mb-6">
            <div className="flex space-x-2 border-b">
              <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-600 font-medium">
                전체
              </button>
              <button className="py-2 px-4 text-gray-500">
                탑승 완료
              </button>
              <button className="py-2 px-4 text-gray-500">
                탑승 대기
              </button>
            </div>
          </div>
          
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 mb-6">
            <span className="text-xl font-bold">+</span>
            <span className="font-medium">버스 추가하기</span>
          </button>
          
          {busGroups.map((bus) => (
            <div key={bus.id} className="bg-white rounded-lg shadow-sm border p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{bus.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${bus.statusColor}`}>
                  {bus.status}
                </span>
              </div>
              
              <div className="text-gray-500 mb-1">ID: {bus.id}</div>
              
              <div className="flex items-center text-gray-600 mb-1">
                <FaCalendarAlt className="mr-2" />
                <span>출발: {bus.departure}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-3">
                <FaClock className="mr-2" />
                <span>도착: {bus.arrival}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-700">
                  {bus.currentPassengers}명 / {bus.totalSeats}석
                </div>
                <div className={bus.fullnessTextColor}>
                  {bus.fullnessText}
                </div>
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${bus.fullnessColor}`} 
                  style={{ width: `${bus.fullness}%` }}
                ></div>
              </div>
              
              {bus.id !== 'bus-001' && (
                <div className="flex mt-4 space-x-2">
                  <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded">
                    승객 목록
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded">
                    일정 수정
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Drawer>
      
      {/* Tourism Drawer */}
      <Drawer
        open={isTourismDrawerOpen}
        onClose={toggleTourismDrawer}
        direction="right"
        size={480}
        className="drawer"
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">관광지 현황</h2>
            <button onClick={toggleTourismDrawer} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-500">총 3개의 관광지가 있습니다</p>
          </div>
          
          <div className="relative mb-6">
            <div className="flex items-center border rounded-lg bg-gray-100 px-3 py-2">
              <FaMapMarkerAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="관광지 검색..."
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>
          
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 mb-6">
            <span className="text-xl font-bold">+</span>
            <span className="font-medium">관광지 추가하기</span>
          </button>
          
          {tourismDestinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-lg shadow-sm border p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{dest.name}</h3>
                <div className="text-gray-500">ID: {dest.id}</div>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg mb-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <FaClock className="text-gray-500 mr-2" />
                    <span>방문 시간:</span>
                  </div>
                  <span className={dest.hourStatusColor}>{dest.hourStatus}</span>
                </div>
                <div className="ml-6">{dest.visitHours}</div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-700">
                  {dest.currentVisitors}명 / {dest.maxVisitors}명
                </div>
                <div className="text-blue-600">
                  {dest.visitorsLeftText}
                </div>
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div 
                  className={dest.fullnessColor} 
                  style={{ width: `${dest.fullness}%` }}
                ></div>
              </div>
              
              <div className="flex text-sm text-gray-600 justify-between">
                <div className="bg-blue-50 px-3 py-1 rounded">
                  <span>평균 체류 시간: {dest.avgStayTime}</span>
                </div>
                <div className="bg-red-50 px-3 py-1 rounded text-red-600">
                  <span>인기도: {dest.popularity}</span>
                </div>
              </div>
              
              <div className="flex mt-4 space-x-2">
                <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded">
                  방문객 목록
                </button>
                <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded">
                  일정 수정
                </button>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
      
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <p className="text-center text-gray-700">
          버스 또는 관광지 버튼을 클릭하여 관리 드로어를 열어주세요
        </p>
      </div>
    </div>
  );
};

export default TravelManagementApp;

// import React, { useState, useEffect } from 'react';
// import { X, ChevronLeft, Clock, Calendar, MapPin, Search, Plus, Edit, User } from 'lucide-react';

// // 메인 드로우어 컴포넌트
// const ResponsiveDrawer = ({ isOpen, onClose, title, children }) => {
//   // 화면 크기에 따른 드로우어 너비 조절
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//     };
//   }, []);

//   return (
//     <>
//       {/* 오버레이 배경 */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//           onClick={onClose}
//         />
//       )}
      
//       {/* 드로우어 패널 */}
//       <div 
//         className={`fixed top-0 bottom-0 right-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         } ${isMobile ? 'w-full' : 'w-96'}`}
//       >
//         {/* 드로우어 헤더 */}
//         <div className="flex items-center justify-between border-b border-gray-200 p-4">
//           <div className="flex items-center">
//             <button 
//               onClick={onClose}
//               className="p-2 mr-2 rounded-full hover:bg-gray-100"
//             >
//               <ChevronLeft className="h-5 w-5 text-gray-500" />
//             </button>
//             <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//           </div>
//           <button 
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100"
//           >
//             <X className="h-5 w-5 text-gray-500" />
//           </button>
//         </div>
        
//         {/* 드로우어 내용 */}
//         <div className="overflow-y-auto h-full pb-20">
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// // 버스 관리 드로우어 컨텐츠
// const BusDrawerContent = ({ busData, onSave }) => {
//   const [formData, setFormData] = useState(busData || {
//     id: '',
//     departureTime: '',
//     arrivalTime: '',
//     capacity: 0,
//     currentPassengers: 0
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">버스 ID</label>
//           <input
//             type="text"
//             name="id"
//             value={formData.id}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             placeholder="bus-000"
//             disabled={busData?.id}
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">출발 시간</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Clock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="time"
//               name="departureTime"
//               value={formData.departureTime}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">도착 시간</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Clock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="time"
//               name="arrivalTime"
//               value={formData.arrivalTime}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">총 좌석</label>
//           <input
//             type="number"
//             name="capacity"
//             value={formData.capacity}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             min="1"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">현재 탑승 인원</label>
//           <input
//             type="number"
//             name="currentPassengers"
//             value={formData.currentPassengers}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             min="0"
//             max={formData.capacity}
//           />
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mt-8">
//           <button
//             type="button"
//             onClick={onSave}
//             className="p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             {busData?.id ? '수정하기' : '추가하기'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // 관광지 관리 드로우어 컨텐츠
// const TourDrawerContent = ({ tourData, onSave }) => {
//   const [formData, setFormData] = useState(tourData || {
//     id: '',
//     name: '',
//     visitHours: '',
//     capacity: 0,
//     currentVisitors: 0,
//     averageStayTime: '',
//     popularity: '보통'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">관광지 이름</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             placeholder="관광지 이름"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">관광지 ID</label>
//           <input
//             type="text"
//             name="id"
//             value={formData.id}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             placeholder="dest-000"
//             disabled={tourData?.id}
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">방문 시간</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Clock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="visitHours"
//               value={formData.visitHours}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="오전 10:00 ~ 오후 12:00"
//             />
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">수용 인원</label>
//           <input
//             type="number"
//             name="capacity"
//             value={formData.capacity}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             min="1"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">현재 방문객 수</label>
//           <input
//             type="number"
//             name="currentVisitors"
//             value={formData.currentVisitors}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             min="0"
//             max={formData.capacity}
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">평균 체류 시간</label>
//           <input
//             type="text"
//             name="averageStayTime"
//             value={formData.averageStayTime}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             placeholder="1시간 30분"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">인기도</label>
//           <select
//             name="popularity"
//             value={formData.popularity}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="낮음">낮음</option>
//             <option value="보통">보통</option>
//             <option value="높음">높음</option>
//           </select>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mt-8">
//           <button
//             type="button"
//             onClick={onSave}
//             className="p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             {tourData?.id ? '수정하기' : '추가하기'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // 사용 예시 컴포넌트
// const AppExample = () => {
//   const [busList, setBusList] = useState([
//     { id: 'bus-001', departureTime: '09:00', arrivalTime: '18:00', capacity: 45, currentPassengers: 45 },
//     { id: 'bus-002', departureTime: '09:30', arrivalTime: '18:30', capacity: 45, currentPassengers: 38 },
//     { id: 'bus-003', departureTime: '10:00', arrivalTime: '19:00', capacity: 30, currentPassengers: 18 }
//   ]);
  
//   const [tourList, setTourList] = useState([
//     { 
//       id: 'dest-001', 
//       name: '경복궁', 
//       visitHours: '오전 10:00 ~ 오후 12:00', 
//       capacity: 100, 
//       currentVisitors: 85,
//       averageStayTime: '1시간 30분',
//       popularity: '높음'
//     }
//   ]);

//   const [busDrawerOpen, setBusDrawerOpen] = useState(false);
//   const [tourDrawerOpen, setTourDrawerOpen] = useState(false);
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [selectedTour, setSelectedTour] = useState(null);

//   const handleOpenBusDrawer = (bus = null) => {
//     setSelectedBus(bus);
//     setBusDrawerOpen(true);
//   };

//   const handleOpenTourDrawer = (tour = null) => {
//     setSelectedTour(tour);
//     setTourDrawerOpen(true);
//   };

//   const handleSaveBus = (data) => {
//     if (selectedBus) {
//       setBusList(busList.map(bus => bus.id === data.id ? data : bus));
//     } else {
//       setBusList([...busList, data]);
//     }
//     setBusDrawerOpen(false);
//   };

//   const handleSaveTour = (data) => {
//     if (selectedTour) {
//       setTourList(tourList.map(tour => tour.id === data.id ? data : tour));
//     } else {
//       setTourList([...tourList, data]);
//     }
//     setTourDrawerOpen(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* 버스 그룹 관리 섹션 */}
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//         <h1 className="text-2xl font-bold mb-2">관광 일정 관리</h1>
//         <p className="text-gray-600 mb-6">버스 그룹 및 관광지 현황을 관리하세요</p>
        
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">버스 그룹</h2>
//             <p className="text-gray-500">총 {busList.length}개의 버스 그룹이 있습니다</p>
//           </div>
          
//           <div className="flex space-x-4 mb-4 border-b">
//             <button className="py-3 px-4 border-b-2 border-blue-500 text-blue-600 font-medium">전체</button>
//             <button className="py-3 px-4 text-gray-500 hover:text-gray-700">탑승 완료</button>
//             <button className="py-3 px-4 text-gray-500 hover:text-gray-700">탑승 대기</button>
//           </div>
          
//           <button 
//             onClick={() => handleOpenBusDrawer()}
//             className="w-full bg-blue-600 text-white rounded-lg p-4 flex items-center justify-center mb-6 hover:bg-blue-700"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             버스 추가하기
//           </button>
          
//           <div className="space-y-4">
//             {busList.map(bus => (
//               <div key={bus.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h3 className="text-lg font-medium">버스 그룹 {bus.id.split('-')[1]}</h3>
//                     <p className="text-gray-500">ID: {bus.id}</p>
//                   </div>
//                   <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                     {bus.currentPassengers === bus.capacity ? '만석' : '탑승 완료'}
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <div className="flex items-center text-gray-600 mb-2">
//                     <Clock className="h-4 w-4 mr-2" />
//                     출발: 오전 {bus.departureTime}
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Clock className="h-4 w-4 mr-2" />
//                     도착: 오후 {bus.arrivalTime}
//                   </div>
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <div className="text-gray-700">{bus.currentPassengers}명 / {bus.capacity}석</div>
//                   <button
//                     onClick={() => handleOpenBusDrawer(bus)}
//                     className="text-blue-600 font-medium hover:text-blue-800"
//                   >
//                     일정 수정
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* 관광지 관리 섹션 */}
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">관광지 현황</h2>
//             <p className="text-gray-500">총 {tourList.length}개의 관광지가 있습니다</p>
//           </div>
          
//           <div className="relative mb-4">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="관광지 검색..."
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
          
//           <button 
//             onClick={() => handleOpenTourDrawer()}
//             className="w-full bg-blue-600 text-white rounded-lg p-4 flex items-center justify-center mb-6 hover:bg-blue-700"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             관광지 추가하기
//           </button>
          
//           <div className="space-y-4">
//             {tourList.map(tour => (
//               <div key={tour.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h3 className="text-lg font-medium">{tour.name}</h3>
//                     <p className="text-gray-500">ID: {tour.id}</p>
//                   </div>
//                   <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                     종료됨
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <div className="flex items-center text-gray-600 mb-2">
//                     <Clock className="h-4 w-4 mr-2" />
//                     방문 시간: {tour.visitHours}
//                   </div>
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <div className="text-gray-700">{tour.currentVisitors}명 / {tour.capacity}명</div>
//                   <div className="text-blue-600">{tour.capacity - tour.currentVisitors}명 여유</div>
//                 </div>
                
//                 <div className="mt-3 flex justify-between items-center bg-gray-50 p-2 rounded">
//                   <span className="text-gray-600">평균 체류 시간: {tour.averageStayTime}</span>
//                   <span className="text-gray-600">인기도: {tour.popularity}</span>
//                 </div>
                
//                 <div className="mt-4 grid grid-cols-2 gap-2">
//                   <button
//                     onClick={() => {}}
//                     className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   >
//                     방문객 목록
//                   </button>
//                   <button
//                     onClick={() => handleOpenTourDrawer(tour)}
//                     className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     일정 수정
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* 버스 드로우어 */}
//       <ResponsiveDrawer 
//         isOpen={busDrawerOpen} 
//         onClose={() => setBusDrawerOpen(false)}
//         title={selectedBus ? "버스 일정 수정" : "버스 추가하기"}
//       >
//         <BusDrawerContent 
//           busData={selectedBus} 
//           onSave={handleSaveBus}
//         />
//       </ResponsiveDrawer>
      
//       {/* 관광지 드로우어 */}
//       <ResponsiveDrawer 
//         isOpen={tourDrawerOpen} 
//         onClose={() => setTourDrawerOpen(false)}
//         title={selectedTour ? "관광지 정보 수정" : "관광지 추가하기"}
//       >
//         <TourDrawerContent 
//           tourData={selectedTour} 
//           onSave={handleSaveTour}
//         />
//       </ResponsiveDrawer>
//     </div>
//   );
// };

// export default AppExample;