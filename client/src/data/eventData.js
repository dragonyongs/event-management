export const events = [
  {
    id: 1,
    title: 'React 스터디 모임',
    date: '2025-02-20 ~ 2025-03-10',
    users: 150,
    steps: 5,
    status: 'ongoing',
    thumbnail:
      'https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'AI 해커톤',
    date: '2025-03-15 ~ 2025-03-20',
    users: 230,
    steps: 7,
    status: 'completed',
    thumbnail:
      'https://images.unsplash.com/photo-1733506312514-267f8134208a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: '웹개발 컨퍼런스',
    date: '2025-04-01 ~ 2025-04-03',
    users: 300,
    steps: 4,
    status: 'ongoing',
    thumbnail:
      'https://images.unsplash.com/photo-1738683987582-b52d371d2782?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: '블록체인 해커톤',
    date: '2025-01-10 ~ 2025-01-15',
    users: 180,
    steps: 6,
    status: 'completed',
    thumbnail:
      'https://images.unsplash.com/photo-1738807991630-260f842bdf49?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5NXx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: '프론트엔드 개발자 컨퍼런스',
    date: '2025-05-05 ~ 2025-05-07',
    users: 250,
    steps: 5,
    status: 'upcoming',
    thumbnail:
      'https://images.unsplash.com/photo-1734784548166-a1ffe07dd7cd?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    title: '데이터 사이언스 워크숍',
    date: '2025-06-10 ~ 2025-06-12',
    users: 120,
    steps: 3,
    status: 'upcoming',
    thumbnail:
      'https://images.unsplash.com/photo-1737914111975-b4d513d783e0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    title: '모바일 앱 개발 세미나',
    date: '2025-07-15 ~ 2025-07-16',
    users: 200,
    steps: 4,
    status: 'upcoming',
    thumbnail:
      'https://plus.unsplash.com/premium_photo-1738614647383-0435fcb26a55?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    title: '클라우드 컴퓨팅 컨퍼런스',
    date: '2025-08-20 ~ 2025-08-22',
    users: 400,
    steps: 6,
    status: 'upcoming',
    thumbnail:
      'https://images.unsplash.com/photo-1726064855857-4540ed3834db?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const sampleEventData = [
  {
    id: 'evt_001',
    title: '2024 제주 골프 & 관광 투어',
    startDate: '2024-06-15',
    endDate: '2024-06-18',
    status: 'upcoming',
    thumbnail: {
      icon: '⛳',
      bgColor: 'bg-emerald-100',
      url: 'https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: ['golf', 'tour'],
    users: 120,
    steps: 8,
    location: '제주도',
    description: '제주도의 아름다운 자연과 함께하는 골프 & 관광 투어입니다.',
    golfDetails: {
      venue: '제주 클럽하우스',
      groups: [
        {
          id: 'golf_group_1',
          name: 'A조',
          teeTime: '07:30',
          members: [
            { id: 'user_001', name: '김영희', handicap: 12 },
            { id: 'user_002', name: '이철수', handicap: 15 },
            { id: 'user_003', name: '박지성', handicap: 8 },
            { id: 'user_004', name: '최민수', handicap: 20 },
            { id: 'user_009', name: '김지훈', handicap: 10 },
          ],
        },
      ],
    },
    tourDetails: {
      busGroups: [
        {
          id: 'bus_1',
          name: '1호차',
          capacity: 45,
          currentCount: 42,
          checkInStatus: true,
          passengers: [
            { id: 'user_001', name: '김영희', seatNo: '1A', checkedIn: true },
            { id: 'user_010', name: '이정민', seatNo: '1B', checkedIn: true },
          ],
        },
        {
          id: 'bus_2',
          name: '2호차',
          capacity: 45,
          currentCount: 40,
          checkInStatus: false,
          passengers: [
            { id: 'user_005', name: '홍길동', seatNo: '2A', checkedIn: false },
            { id: 'user_006', name: '이순신', seatNo: '2B', checkedIn: false },
            { id: 'user_011', name: '박수현', seatNo: '2C', checkedIn: false },
          ],
        },
      ],
      destinations: [
        {
          id: 'dest_1',
          name: '성산일출봉',
          time: '09:00 ~ 11:00',
          maxCapacity: 50,
          currentCount: 45,
        },
        {
          id: 'dest_2',
          name: '우도',
          time: '13:00 ~ 15:00',
          maxCapacity: 40,
          currentCount: 30,
        },
      ],
    },
  },
  {
    id: 'evt_002',
    title: '2024 서울 해커톤',
    startDate: '2024-07-01',
    endDate: '2024-07-03',
    status: 'upcoming',
    thumbnail: {
      icon: '💻',
      bgColor: 'bg-purple-100',
      url: null,
    },
    type: ['hackathon'],
    users: 200,
    steps: 10,
    location: '서울',
    description: '서울에서 열리는 해커톤 대회입니다.',
  },
  {
    id: 'evt_003',
    title: '2024 부산 국제 마라톤',
    startDate: '2024-09-10',
    endDate: '2024-09-11',
    status: 'upcoming',
    thumbnail: {
      icon: '🏃',
      bgColor: 'bg-red-100',
      url: null,
    },
    type: ['sports'],
    users: 500,
    steps: 5,
    location: '부산',
    description: '부산에서 열리는 국제 마라톤 대회입니다.',
  },
  {
    id: 'evt_004',
    title: '2024 글로벌 스타트업 컨퍼런스',
    startDate: '2024-11-05',
    endDate: '2024-11-07',
    status: 'upcoming',
    thumbnail: { icon: '🎯', bgColor: 'bg-blue-100', url: null },
    type: ['conference'],
    users: 1000,
    steps: 12,
    location: '서울 코엑스',
    description:
      '세계 각국 스타트업이 모여 네트워킹하고 발표하는 컨퍼 런스입니다.',
  },
];

export const thumbnailOptions = [
  { id: 'conference', icon: '🎯', bgColor: 'bg-blue-100' },
  { id: 'workshop', icon: '💡', bgColor: 'bg-yellow-100' },
  { id: 'hackathon', icon: '💻', bgColor: 'bg-purple-100' },
  { id: 'seminar', icon: '📚', bgColor: 'bg-green-100' },
  { id: 'golf', icon: '⛳', bgColor: 'bg-emerald-100' },
  { id: 'tour', icon: '🏖️', bgColor: 'bg-orange-100' },
  { id: 'sports', icon: '🏃', bgColor: 'bg-red-100' },
];
