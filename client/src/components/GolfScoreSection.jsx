import { useState, useEffect, useRef } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const GolfScoreSection = ({ holes, addHole, removeHole, updateHoleField, onHolesChange }) => {
    const [openHoleIndex, setOpenHoleIndex] = useState(holes.length - 1);

    const prevHolesRef = useRef(holes); // 이전 값 저장용 ref

    useEffect(() => {
        if (JSON.stringify(prevHolesRef.current) !== JSON.stringify(holes)) {
            onHolesChange([...holes]); 
            prevHolesRef.current = holes; // 최신값 저장
        }
    }, [holes]);

    const toggleHole = (index) => {
        setOpenHoleIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    
    const getScoreType = (strokes, par) => {
        const diff = strokes - par;
        if (diff === 0) return 'normal';
        if (diff === -1) return 'birdie';
        if (diff === -2) return 'eagle';
        if (diff === 1) return 'bogey';
        return 'other'; // 기타 경우
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">홀별 점수</h5>
                <button
                type="button"
                onClick={addHole}
                className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                <FiPlus className="w-4 h-4 mr-1" /> 홀 추가
                </button>
            </div>

            <div className="space-y-4">
                {holes.map((hole, index) => (
                <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border cursor-pointer"
                >
                    <div className="flex justify-between items-center" onClick={() => toggleHole(index)}>
                        <div className="flex items-center">
                            <div className="flex items-center gap-x-3">
                                <span className="font-medium text-gray-900">홀 {hole.holeNumber}</span>
                                {holes.length > 0 && (
                                <div className="flex items-center text-gray-600 text-sm">
                                    타수: {hole.strokes} 파: {hole.par}
                                    {getScoreType(hole.strokes, hole.par) !== "normal" && (
                                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                                            {getScoreType(hole.strokes, hole.par)}
                                        </span>
                                    )}
                                </div>
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); // 클릭 이벤트 버블링 방지
                                removeHole(index);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>

                    {openHoleIndex === index && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">타수</label>
                            <input
                                type="number"
                                value={hole.strokes}
                                onChange={(e) => updateHoleField(index, "strokes", Number(e.target.value))}
                                className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">파</label>
                            <input
                                type="number"
                                value={hole.par}
                                onChange={(e) => updateHoleField(index, "par", Number(e.target.value))}
                                className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            />
                        </div>
                        {/* <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">스코어 타입</label>
                        <select
                            value={hole.scoreType}
                            onChange={(e) => updateHoleField(index, "scoreType", e.target.value)}
                            className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="normal">Normal</option>
                            <option value="birdie">Birdie</option>
                            <option value="eagle">Eagle</option>
                            <option value="bogey">Bogey</option>
                        </select>
                        </div> */}
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">메모</label>
                            <input
                                type="text"
                                value={hole.notes}
                                onChange={(e) => updateHoleField(index, "notes", e.target.value)}
                                className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            />
                        </div>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
};

export default GolfScoreSection;