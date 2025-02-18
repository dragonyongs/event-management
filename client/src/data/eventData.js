// 주어진 개수만큼 가상 사용자 정보를 생성하는 헬퍼 함수
const generateDummyUsers = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `user_${index + 1}`,
    name: `User ${index + 1}`,
    role: 'participant',
  }));
};

// 주어진 개수만큼 가상 스텝 정보를 생성하는 헬퍼 함수
const generateDummySteps = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `step_${index + 1}`,
    title: `Step ${index + 1}`,
    startTime: '09:00', // 필요시 적절한 시간으로 변경 가능
    endTime: '10:00', // 필요시 적절한 시간으로 변경 가능
  }));
};

export const sampleEventData = [
  {
    id: "evt_001",
    title: "2024 제주 골프 & 관광 투어",
    status: "upcoming",
    // 이벤트 전체 기간: ISO 8601 형식으로 지정하여 시간 기반 계산 및 타임존 고려에 용이
    startDate: "2024-06-15T00:00:00",
    endDate: "2024-06-18T23:59:59",
    thumbnail: {
      icon: "⛳",
      bgColor: "bg-emerald-100",
      url: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    type: ["golf", "tour"],
    // 참가자 정보
    users: [
      { id: "user_001", name: "김영희", company: "", position: "", role: "participant", contact: "", inviter: "", notes: [] },
      { id: "user_002", name: "이철수", company: "", position: "", role: "participant", contact: "", inviter: "", notes: [] },
      { id: "user_003", name: "박지성", company: "", position: "", role: "participant", contact: "", inviter: "", notes: []},
    ],
    staffs: [],
    description: "제주도의 아름다운 자연과 함께하는 골프 & 관광 투어입니다.",
    // 각 일자별로 세분화된 일정 등록 (일자별로 활동(activity) 목록 포함)
    schedule: [
      {
        day: "2024-06-15",
        activities: [
          {
            id: "act_001",
            title: "예약 확인",
            startTime: "2024-06-15T09:00:00",
            endTime: "2024-06-15T10:00:00",
            description: "예약 내용을 확인합니다."
          },
          {
            id: "act_002",
            title: "출발 준비",
            startTime: "2024-06-15T10:00:00",
            endTime: "2024-06-15T11:00:00",
            description: "짐을 챙기고 출발 준비를 합니다."
          }
        ]
      },
      {
        day: "2024-06-16",
        activities: [
          {
            id: "act_003",
            title: "골프 경기 시작",
            startTime: "2024-06-16T07:30:00",
            endTime: "2024-06-16T11:30:00",
            description: "골프 경기를 진행합니다."
          }
        ]
      },
      {
        day: "2024-06-17",
        activities: [
          {
            id: "act_004",
            title: "관광: 성산일출봉 방문",
            startTime: "2024-06-17T09:00:00",
            endTime: "2024-06-17T11:00:00",
            description: "성산일출봉을 방문하여 주변 경관을 감상합니다."
          },
          {
            id: "act_005",
            title: "관광: 우도 방문",
            startTime: "2024-06-17T13:00:00",
            endTime: "2024-06-17T15:00:00",
            description: "우도를 방문하여 해양 레포츠 및 지역 음식을 체험합니다."
          }
        ]
      },
      {
        day: "2024-06-18",
        activities: [
          {
            id: "act_006",
            title: "귀가 준비 및 체크아웃",
            startTime: "2024-06-18T10:00:00",
            endTime: "2024-06-18T11:00:00",
            description: "모든 준비를 마치고 체크아웃합니다."
          }
        ]
      }
    ],
    // 골프 관련 상세 정보: 그룹별 티타임, 참가자 점수 등 추가 데이터 포함
    golfDetails: {
      venue: "제주 클럽하우스",
      location: "나인브릿지 골프클럽",
      groups: [
        {
          id: "golf_group_1",
          name: "A조",
          teeTime: {
            start: "2024-06-16T07:30:00",
            estimatedDuration: "4시간"
          },
          members: [
            { id: "user_001", name: "김영희", handicap: 12, score: { total: null, holes: [] }, reason: "갑작스런 개인 일정으로 불참", status: "cancelled"},
            { id: "user_002", name: "이철수", handicap: 15, score: { total: null, holes: [
              {
                holeNumber: 1, // 홀 번호
                strokes: 4, // 해당 홀에서 기록한 타수
                par: 3, // 해당 홀의 파 수
                scoreType: "normal", // 스코어 타입 (예: "normal", "birdie", "eagle", "bogey" 등)
                notes: "좋은 퍼팅", // 추가 메모 (선택 사항)
              },
              {
                holeNumber: 2,
                strokes: 5,
                par: 4,
                scoreType: "bogey",
                notes: "",
              },
              // 추가 홀 기록...
            ] }, reason: null, status: "confirmed" },
            { id: "user_003", name: "박지성", handicap: 8, score: { total: null, holes: [] }, reason: null, status: "confirmed" },
            { id: "user_004", name: "최민수", handicap: 20, score: { total: null, holes: [] }, reason: null, status: "confirmed" },
            { id: "user_009", name: "김지훈", handicap: 10, score: { total: null, holes: [] }, reason: null, status: "confirmed" }
          ]
        },
        {
          id: "golf_group_2",
          name: "B조",
          teeTime: {
            start: "2024-06-16T08:00:00",
            estimatedDuration: "4시간"
          },
          members: [
            { id: "user_005", name: "홍길동", handicap: 18, score: { total: null, holes: [] }, reason: null, status: "confirmed" },
            { id: "user_006", name: "이순신", handicap: 14, score: { total: null, holes: [] }, reason: null, status: "pending" },
            { id: "user_007", name: "강감찬", handicap: 16, score: { total: null, holes: [] }, reason: null, status: "pending" },
            { id: "user_008", name: "유관순", handicap: 22, score: { total: null, holes: [] }, reason: null, status: "pending" }
          ]
        }
      ]
    },
    // 투어 관련 상세 정보: 버스 그룹, 목적지 방문 일정 및 세부 일정 포함
    tourDetails: {
      busGroups: [
        {
          id: "bus_1",
          name: "1호차",
          capacity: 45,
          currentCount: 42,
          schedule: {
            departure: "2024-06-17T07:50:00",
            arrival: "2024-06-17T10:00:00"
          },
          passengers: [
            { id: "user_001", name: "김영희", seatNo: "1A", checkInTime: "2024-06-17T07:45:00" },
            { id: "user_010", name: "이정민", seatNo: "1B", checkInTime: "2024-06-17T07:48:00" }
          ]
        },
        {
          id: "bus_2",
          name: "2호차",
          capacity: 45,
          currentCount: 40,
          schedule: {
            departure: "2024-06-17T08:00:00",
            arrival: "2024-06-17T10:00:00"
          },
          passengers: [
            { id: "user_005", name: "홍길동", seatNo: "2A", checkInTime: null },
            { id: "user_006", name: "이순신", seatNo: "2B", checkInTime: null },
            { id: "user_011", name: "박수현", seatNo: "2C", checkInTime: null }
          ]
        }
      ],
      destinations: [
        {
          id: "dest_1",
          name: "성산일출봉",
          schedule: {
            start: "2024-06-17T09:00:00",
            end: "2024-06-17T11:00:00"
          },
          maxCapacity: 50,
          currentCount: 45,
          estimatedDuration: "2시간"
        },
        {
          id: "dest_2",
          name: "우도",
          schedule: {
            start: "2024-06-17T13:00:00",
            end: "2024-06-17T15:00:00"
          },
          maxCapacity: 40,
          currentCount: 30,
          estimatedDuration: "2시간"
        }
      ],
      location: "제주 공항",
      totalDuration: "4일 3박"
    },
    // 일정 변경 및 업데이트 이력 (선택 사항)
    updateLogs: [
      {
        id: "log_001",
        timestamp: "2024-05-01T12:00:00",
        changes: "초기 일정 생성"
      }
    ]
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
    users: [
      { id: 'user_101', name: '김민수', role: 'participant' },
      { id: 'user_102', name: '이영희', role: 'participant' },
      { id: 'user_103', name: '박지훈', role: 'participant' },
    ],
    staffs: [],
    steps: [
      {
        id: 'step_001',
        title: '아이디어 제출',
        startTime: '09:00',
        endTime: '10:00',
      },
      {
        id: 'step_002',
        title: '팀 구성',
        startTime: '10:00',
        endTime: '11:00',
      },
      {
        id: 'step_003',
        title: '개발 시작',
        startTime: '11:00',
        endTime: '12:00',
      },
    ],
    tourDetails: [],
    golfDetails: [],
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
    users: [
      { id: 'user_201', name: '홍길동', role: 'participant' },
      { id: 'user_202', name: '김철수', role: 'participant' },
      { id: 'user_203', name: '이수민', role: 'participant' },
    ],
    staffs: [],
    steps: [
      {
        id: 'step_101',
        title: '참가 등록',
        startTime: '09:00',
        endTime: '10:00',
      },
      {
        id: 'step_102',
        title: '시작 전 준비',
        startTime: '10:00',
        endTime: '11:00',
      },
    ],
    location: '부산',
    description: '부산에서 열리는 국제 마라톤 대회입니다.',
  },
  {
    id: 'evt_004',
    title: '2024 글로벌 스타트업 컨퍼런스',
    startDate: '2024-11-05',
    endDate: '2024-11-07',
    status: 'upcoming',
    thumbnail: {
      icon: '🎯',
      bgColor: 'bg-blue-100',
      url: null,
    },
    type: ['conference'],
    users: [
      { id: 'user_301', name: '최영수', role: 'participant' },
      { id: 'user_302', name: '박지영', role: 'participant' },
      { id: 'user_303', name: '이민호', role: 'participant' },
    ],
    staffs: [],
    steps: [
      { id: 'step_201', title: '등록', startTime: '09:00', endTime: '10:00' },
      {
        id: 'step_202',
        title: '세션 참석',
        startTime: '10:00',
        endTime: '12:00',
      },
      {
        id: 'step_203',
        title: '네트워킹',
        startTime: '12:00',
        endTime: '13:00',
      },
      { id: 'step_204', title: '피드백', startTime: '13:00', endTime: '14:00' },
    ],
    location: '서울 코엑스',
    description:
      '세계 각국 스타트업이 모여 네트워킹하고 발표하는 컨퍼런스입니다.',
  },
  {
    id: 'evt_005',
    title: 'React 스터디 모임',
    startDate: '2025-02-20',
    endDate: '2025-03-10',
    status: 'ongoing',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(150),
    staffs: [],
    steps: generateDummySteps(5),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
  {
    id: 'evt_006',
    title: 'AI 해커톤',
    startDate: '2025-03-15',
    endDate: '2025-03-20',
    status: 'completed',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://images.unsplash.com/photo-1733506312514-267f8134208a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(230),
    staffs: [],
    steps: generateDummySteps(7),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
  {
    id: 'evt_007',
    title: '웹개발 컨퍼런스',
    startDate: '2025-04-01',
    endDate: '2025-04-03',
    status: 'ongoing',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://images.unsplash.com/photo-1738683987582-b52d371d2782?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(300),
    staffs: [],
    steps: generateDummySteps(4),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
  {
    id: 'evt_008',
    title: '블록체인 해커톤',
    startDate: '2025-01-10',
    endDate: '2025-01-15',
    status: 'completed',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://images.unsplash.com/photo-1738807991630-260f842bdf49?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5NXx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(180),
    staffs: [],
    steps: generateDummySteps(6),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
  {
    id: 'evt_009',
    title: '프론트엔드 개발자 컨퍼런스',
    startDate: '2025-05-05',
    endDate: '2025-05-07',
    status: 'upcoming',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://images.unsplash.com/photo-1734784548166-a1ffe07dd7cd?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(250),
    staffs: [],
    steps: generateDummySteps(5),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
  {
    id: 'evt_010',
    title: '데이터 사이언스 워크숍',
    startDate: '2025-06-10',
    endDate: '2025-06-12',
    status: 'upcoming',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://images.unsplash.com/photo-1737914111975-b4d513d783e0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(120),
    staffs: [],
    steps: generateDummySteps(3),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
  {
    id: 'evt_011',
    title: '모바일 앱 개발 세미나',
    startDate: '2025-07-15',
    endDate: '2025-07-16',
    status: 'upcoming',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://plus.unsplash.com/premium_photo-1738614647383-0435fcb26a55?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(200),
    staffs: [],
    steps: generateDummySteps(4),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
  {
    id: 'evt_012',
    title: '클라우드 컴퓨팅 컨퍼런스',
    startDate: '2025-08-20',
    endDate: '2025-08-22',
    status: 'upcoming',
    thumbnail: {
      icon: '',
      bgColor: '',
      url: 'https://images.unsplash.com/photo-1726064855857-4540ed3834db?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    type: [],
    users: generateDummyUsers(400),
    staffs: [],
    steps: generateDummySteps(6),
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
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

export const dummyUsers = [
  { id: 'user_001', name: '홍길동' },
  { id: 'user_002', name: '김철수' },
  { id: 'user_003', name: '박영수' },
  { id: 'user_004', name: '이민정' },
  { id: 'user_005', name: '최지훈' },
];

export const dummyStaffs = [
  { id: 'user_001', name: '홍길동' },
  { id: 'user_002', name: '김철수' },
  { id: 'user_003', name: '박영수' },
  { id: 'user_004', name: '이민정' },
  { id: 'user_005', name: '최지훈' },
];
