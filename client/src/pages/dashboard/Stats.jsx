const Stats = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold">이벤트 통계</h2>
        <p className="text-gray-600 mt-2">진행 중인 이벤트: 2개</p>
        <p className="text-gray-600 mt-2">완료된 이벤트: 5개</p>
        <p className="text-gray-600 mt-2">총 참가자: 1000명</p>
        </div>
    );
};

export default Stats;
