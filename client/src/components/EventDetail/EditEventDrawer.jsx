import React from 'react'
import { FiX } from 'react-icons/fi';

function EditEventDrawer({onClose}) {
    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">이벤트 정보수정</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FiX className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">

                </div>
            </div>
        </div>
    )
}

export default EditEventDrawer