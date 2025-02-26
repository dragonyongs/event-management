import { getCount } from '../../utils/eventUtils';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};

const EventHeader = ({ event, onEdit }) => { 
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">
                {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
              </p>
              <p className="text-gray-600">
                참가자 {getCount(event.users)}명 · 스텝 {getCount(event.steps)}명
              </p>
            </div>
          </div>
          <button onClick={onEdit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
