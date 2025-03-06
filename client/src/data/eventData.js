export const newEventData = [
  {
    id: "evt_001",
    title: "2024 제주 골프 & 관광 투어",
    status: "upcoming",
    startDate: "2024-06-15T00:00:00",
    endDate: "2024-06-18T23:59:59",
    images: [
      {
        type: "thumbnail",
        icon: "⛳",
        bgColor: "bg-emerald-100",
        url: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ],
    type: ["golf", "tour"],
    users: ["user_001", "user_002", "user_003", "user_004", "user_005", "user_006", "user_007", "user_008", "user_009"],
    staffs: [
      // 이곳에 스태프를 별도 추가할 예정이었으나 유저의 속성에서 스태프 구분값으로 프론트에서 출력 예정으로 삭제 
    ],
    description: "제주도의 아름다운 자연과 함께하는 골프 & 관광 투어입니다.",
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
    subEvents: [
      {
        id: "sub_evt_001",
        type: "golf",
        venue: "제주 클럽하우스",
        location: "나인브릿지 골프클럽",
        schedule: [
          {
            day: "2024-06-16",
            activities: [
              {
                id: "golf_act_001",
                title: "골프 경기 시작",
                startTime: "2024-06-16T07:30:00",
                endTime: "2024-06-16T11:30:00",
                description: "골프 경기를 진행합니다."
              }
            ]
          }
        ],
        groups: [
          {
            id: "golf_group_1",
            name: "A조",
            teeTime: {
              start: "2024-06-16T07:30:00",
              estimatedDuration: "4시간"
            },
            members: [
              { userId: "user_001", handicap: 12, score: { total: null, holes: [] }, reason: "갑작스런 개인 일정으로 불참", status: "cancelled" },
              { userId: "user_002", handicap: 15, score: { total: null, holes: [
                { holeNumber: 1, strokes: 4, par: 3, scoreType: "normal", notes: "좋은 퍼팅" },
                { holeNumber: 2, strokes: 5, par: 4, scoreType: "bogey", notes: "" }
              ] }, reason: null, status: "confirmed" },
              { userId: "user_003", handicap: 8, score: { total: null, holes: [] }, reason: null, status: "confirmed" },
              { userId: "user_004", handicap: 20, score: { total: null, holes: [] }, reason: null, status: "confirmed" },
              { userId: "user_009", handicap: 10, score: { total: null, holes: [] }, reason: null, status: "confirmed" }
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
              { userId: "user_005", handicap: 18, score: { total: null, holes: [] }, reason: null, status: "confirmed" },
              { userId: "user_006", handicap: 14, score: { total: null, holes: [] }, reason: null, status: "pending" },
              { userId: "user_007", handicap: 16, score: { total: null, holes: [] }, reason: null, status: "pending" },
              { userId: "user_008", handicap: 22, score: { total: null, holes: [] }, reason: null, status: "pending" }
            ]
          },
          {
            id: "golf_group_3",
            name: "C조",
            teeTime: {
              start: "2024-06-16T08:30:00",
              estimatedDuration: "4시간"
            },
            members: []
          }
        ]
      },
      {
        id: "sub_evt_002",
        type: "tour",
        location: "제주 공항",
        schedule: [
          {
            day: "2024-06-17",
            activities: [
              {
                id: "tour_act_001",
                title: "관광: 성산일출봉 방문",
                startTime: "2024-06-17T09:00:00",
                endTime: "2024-06-17T11:00:00",
                description: "성산일출봉을 방문하여 주변 경관을 감상합니다."
              },
              {
                id: "tour_act_002",
                title: "관광: 우도 방문",
                startTime: "2024-06-17T13:00:00",
                endTime: "2024-06-17T15:00:00",
                description: "우도를 방문하여 해양 레포츠 및 지역 음식을 체험합니다."
              }
            ]
          }
        ],
        busGroups: [
          {
            id: "bus_1",
            name: "1호차",
            capacity: 45,
            currentCount: 45,
            schedule: {
              departure: "2024-06-17T07:50:00",
              arrival: "2024-06-17T10:00:00"
            },
            passengers: [
              { userId: "user_001", seatNo: "1A", checkInTime: "2024-06-17T07:45:00" },
              { userId: "user_009", seatNo: "1B", checkInTime: "2024-06-17T07:48:00" }
            ]
          },
          {
            id: "bus_2",
            name: "2호차",
            capacity: 45,
            currentCount: 20,
            schedule: {
              departure: "2024-06-17T08:00:00",
              arrival: "2024-06-17T10:00:00"
            },
            passengers: [
              { userId: "user_005", seatNo: "2A", checkInTime: null },
              { userId: "user_006", seatNo: "2B", checkInTime: null },
              { userId: "user_007", seatNo: "2C", checkInTime: null }
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
        ]
      }
    ],
    updateLogs: [
      {
        id: "log_001",
        timestamp: "2024-05-01T12:00:00",
        changes: "초기 일정 생성"
      },
      {
        id: "log_002",
        timestamp: "2024-05-10T14:30:00",
        changes: "골프 그룹 A조 멤버 변경: 김영희 불참"
      }
    ]
  },
  {
    id: 'evt_002',
    title: '2024 서울 해커톤',
    startDate: '2024-07-01',
    endDate: '2024-07-03',
    status: 'upcoming',
    images: [
      {
        type: "thumbnail",
        icon: "💻",
        bgColor: "bg-purple-100",
        url: null
      }
    ],
    type: ['hackathon'],
    users: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '🏃',
        bgColor: "bg-red-100",
        url: null
      }
    ],
    type: ['sports'],
    users: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '🎯',
        bgColor: 'bg-blue-100',
        url: null,
      }
    ],
    type: ['conference'],
    users: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ],
    type: [],
    users: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://images.unsplash.com/photo-1733506312514-267f8134208a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ],
    type: [],
    users: [],
    steps: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://images.unsplash.com/photo-1738683987582-b52d371d2782?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ],
    type: [],
    users: [],
    steps: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://images.unsplash.com/photo-1738807991630-260f842bdf49?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5NXx8fGVufDB8fHx8fA%3D%3D',
      }
    ],
    type: [],
    users: [],
    steps: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://images.unsplash.com/photo-1734784548166-a1ffe07dd7cd?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ],
    type: [],
    users: [],
    steps: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://images.unsplash.com/photo-1737914111975-b4d513d783e0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ],
    type: [],
    users: [],
    steps: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://images.unsplash.com/photo-1736001850620-b86baea107f8?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ],
    type: [],
    users: [],
    steps: [],
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
    images: [
      {
        type: "thumbnail",
        icon: '',
        bgColor: '',
        url: 'https://images.unsplash.com/photo-1726064855857-4540ed3834db?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    type: [],
    users: [],
    steps: [],
    location: '',
    description: '',
    golfDetails: null,
    tourDetails: null,
  },
];

export const sampleEventData = [
  {
    id: "evt_001",
    title: "2024 제주 골프 & 관광 투어",
    status: "upcoming",
    startDate: "2024-06-15T00:00:00",
    endDate: "2024-06-18T23:59:59",
    thumbnail: {
      icon: "⛳",
      bgColor: "bg-emerald-100",
      url: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    type: ["golf", "tour"],
    users: [
      { id: "user_001", name: "김영희", company: "", position: "", role: "participant", contact: "", inviter: "", notes: [] },
      { id: "user_002", name: "이철수", company: "", position: "", role: "participant", contact: "", inviter: "", notes: [] },
      { id: "user_003", name: "박지성", company: "", position: "", role: "participant", contact: "", inviter: "", notes: []},
    ],
    staffs: [
      { id: "staff_001", name: "최응금", company: "", position: "", role: "leader", contact: "", inviter: "", notes: [] },
    ],
    description: "제주도의 아름다운 자연과 함께하는 골프 & 관광 투어입니다.",
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
        },
        {
          id: "golf_group_3",
          name: "C조",
          teeTime: {
            start: "2025-07-16T08:00:00",
            estimatedDuration: "4시간"
          },
          members: [
          ]
        }
      ]
    },
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
            { id: "user_009", name: "이정민", seatNo: "1B", checkInTime: "2024-06-17T07:48:00" }
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
            { id: "user_007", name: "박수현", seatNo: "2C", checkInTime: null }
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
    updateLogs: [
      {
        id: "log_001",
        timestamp: "2024-05-01T12:00:00",
        changes: "초기 일정 생성"
      }
    ]
  }
];

export const thumbnailOptions = [
  { id: 'conference', icon: '🎯', bgColor: 'bg-blue-100' },
  { id: 'workshop', icon: '💡', bgColor: 'bg-yellow-100' },
  { id: 'hackathon', icon: '💻', bgColor: 'bg-purple-100' },
  { id: 'seminar', icon: '📚', bgColor: 'bg-green-100' },
  { id: 'golf', icon: '⛳', bgColor: 'bg-emerald-100' },
  { id: 'tour', icon: '🏖️', bgColor: 'bg-orange-100' },
  { id: 'sports', icon: '🏃', bgColor: 'bg-red-100' },
  { id: 'etc', icon: '🎸', bgColor: 'bg-gray-100' },
];

export const dummyUsers = [
  {
    id: 'user_001',
    name: '홍길동',
    role: '조인웍, 팀교육',
    position: '영업상무',
    rank: '상무',
    email: 'hong@example.com',
    phone: '010-1111-2222',
    companyContact: '02-1234-5678',
    company: '회사A',
    department: '경영지원본부',
    team: '팀A-1',
    division: '컨설턴트', // FA: 회사업무 컨설팅 담당
    memo: 'A회사 컨설턴트, 본부 소속'
  },
  {
    id: 'user_002',
    name: '김철수',
    role: '행사 총책임', // 인원체크
    position: '팀장', // 직위: 팀장, 파트장
    rank: '차장', // 직급: 차장, 과장 대리...
    email: 'kim@example.com',
    phone: '010-3333-4444',
    companyContact: '02-2222-3333',
    company: '회사A',
    department: '영엽지원본부',
    team: '팀A-2',
    division: '스태프', // 일반 직원
    memo: 'A회사 일반 직원'
  },
  {
    id: 'user_003',
    name: '박영수',
    role: '기업 미팅',
    position: '대표이사',
    rank: '대표',
    email: 'park@example.com',
    phone: '010-5555-6666',
    companyContact: '031-123-4567',
    company: '회사B',
    department: '전략기획본부',
    team: '팀B-1',
    division: '대표', // 기업 대표
    memo: '회사B 대표'
  },
  {
    id: 'user_004',
    name: '이민정',
    role: 'MOU 담당, 인사권자',
    position: '본부장',
    rank: '상무',
    email: 'lee@example.com',
    phone: '010-7777-8888',
    companyContact: '031-456-7890',
    company: '회사B',
    department: '전략기획본부',
    team: '팀B-2',
    division: '임원', // 상무, 전무 등 임원급
    memo: '회사B 임원, 해외 출장 경험 풍부'
  },
  {
    id: 'user_005',
    name: '최지훈',
    role: '이벤트 행사 진행 보조',
    position: '파트장',
    rank: '과장',
    email: 'choi@example.com',
    phone: '010-9999-0000',
    companyContact: '02-3333-4444',
    company: '외부업체',
    team: '외부', // 외부인력인 경우 소속팀 대신 외부라고 표기
    department: '마케팅본부',
    division: '업체', // 외부 협력 업체
    memo: '외부 협력 업체 담당자'
  },
  {
    id: 'user_006',
    name: '박정현',
    role: '',
    position: '',
    rank: '',
    email: 'parks@example.com',
    phone: '010-1111-0000',
    companyContact: '02-2222-4444',
    company: '',
    department: '경영지원본부',
    team: '',
    division: '',
    memo: ''
  },
  {
    id: 'user_007',
    name: '이미숙',
    role: '',
    position: '',
    rank: '',
    email: 'parks@example.com',
    phone: '010-1111-0000',
    companyContact: '02-2222-4444',
    company: '',
    department: '경영지원본부',
    team: '',
    division: '',
    memo: ''
  },
  {
    id: 'user_008',
    name: '고기현',
    role: '',
    position: '',
    rank: '',
    email: 'parks@example.com',
    phone: '010-1111-0000',
    companyContact: '02-2222-4444',
    company: '',
    department: '경영지원본부',
    team: '',
    division: '',
    memo: ''
  },
  {
    id: 'user_009',
    name: '강희수',
    role: '',
    position: '',
    rank: '',
    email: 'parks@example.com',
    phone: '010-1111-0000',
    companyContact: '02-2222-4444',
    company: '',
    department: '경영지원본부',
    team: '',
    division: '',
    memo: ''
  },
  {
    id: 'user_010',
    name: '강희수',
    role: '',
    position: '',
    rank: '',
    email: 'parks@example.com',
    phone: '010-1111-0000',
    companyContact: '02-2222-4444',
    company: '',
    department: '경영지원본부',
    team: '',
    division: '',
    memo: ''
  }
];

// 구분의 보충 설명: A라는 회사에서 컨설팅을 회사업무로 진행하는데 일반 직원은 스태프, 컨설턴트는 FA로 부른다.
// A라는 회사의 임직원 기업 대표와, 상무, 전무 등을 구분하는 것도 필요하고, 컨설턴트가 초대한 기업의 대표 또는 임직원의 구분도 필요하다.
// 만약 행사에 외부 여행사나, 이벤트 관계자 등 외부인력의 경우 해당 인원 정보의 구분도 필요하다
// 사용자의 필요항목으로는 이름, 이메일, 휴대폰, 회사연락처, 회사명, 소속팀, 구분(컨설턴트,스태프,대표,임원,업체), 메모 등 필요하고 관리에 필요한 다른 항목이 있으면 기입한다.
// 사용자의 관리는 하나로 하지만 구분 값으로 그룹을 1차 나누고, 이벤트가 생성되면 그 메인 이벤트에 참여할 사용자 전원(스태프 포함)을 저장하고, 관광, 골프 또는 둘다에 속한 인원은 해당 메인 사용자를 중심으로 참여여부를 위해 사용자 아이디를 추가하여 체크한다. 그리고 그 하위 소그룹에서도 해당 상위 그룹의 인원을 기준으로 분배한다.

export const dummyStaffs = [
  { id: 'user_001', name: '홍길동' },
  { id: 'user_002', name: '김철수' },
  { id: 'user_003', name: '박영수' },
  { id: 'user_004', name: '이민정' },
  { id: 'user_005', name: '최지훈' },
];

export const eventTypeOptions = [
  { id: 'tour', name: '관광', icon: '🏞️' },
  { id: 'golf', name: '골프', icon: '⛳' },
  { id: 'etc', name: '기타', icon: '🎉' },
];