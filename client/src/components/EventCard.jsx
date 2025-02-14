import PropTypes from "prop-types";
import { format, differenceInDays } from "date-fns";

const EventCard = ({ event }) => {
    const { title, date, users, steps, status, thumbnail } = event;
    const [startDate, endDate] = date.split(" ~ ").map((d) => new Date(d));
    const today = new Date();
    
    // D-Day 계산
    const dDay = status === "ongoing" ? differenceInDays(startDate, today) : null;

    return (
        <>
            {/* 반응형 레이아웃 */}
            <div className="flex flex-1 flex-col items-center bg-white dark:bg-slate-800 rounded-lg">
                
                {/* 이미지 */}
                <img
                src={thumbnail}
                alt={title}
                className="w-full aspect-video object-cover rounded-lg"
                />

                {/* 텍스트 영역 */}
                <div className="w-full px-6 my-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{date}</p>

                    {/* 상태 & D-Day */}
                    <p className={`text-xs font-bold mt-1 ${status === "ongoing" ? "text-blue-500" : "text-gray-500"}`}>
                        {status === "ongoing" ? `진행 중 ${dDay >= 0 ? `(D-${dDay})` : "(진행 중)"}` : "완료됨"}
                    </p>

                    {/* 참가자 & 스텝 */}
                    <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">
                        👥 {users}명 | 🔹 스텝 {steps}명
                    </p>
                </div>

            </div>
        </>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        users: PropTypes.number.isRequired,
        steps: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
    }).isRequired,
};

export default EventCard;
