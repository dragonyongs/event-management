import React, { useState } from 'react';
import { dummyStaffs } from '../data/eventData';

const StaffSelector = ({ selectedStaffs, onChange }) => {
    const [staffSearch, setStaffSearch] = useState('');

    const filteredStaffs = dummyStaffs.filter(
        (staff) =>
        staff.name.includes(staffSearch) &&
        !selectedStaffs.find((sel) => sel.id === staff.id)
    );

    const handleSelectStaff = (staff) => {
        onChange([...selectedStaffs, staff]);
        setStaffSearch('');
    };

    const handleRemoveStaff = (staffId) => {
        onChange(selectedStaffs.filter((staff) => staff.id !== staffId));
    };

    return (
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">스태프 추가</label>
        <input
            type="text"
            value={staffSearch}
            onChange={(e) => setStaffSearch(e.target.value)}
            placeholder="스태프 검색"
            className="w-full px-4 py-2 border rounded-lg border-gray-300"
        />
        {staffSearch.trim() && filteredStaffs.length > 0 && (
            <ul className="border border-gray-200 mt-1 rounded-lg max-h-40 overflow-y-auto">
            {filteredStaffs.map((staff) => (
                <li
                key={staff.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectStaff(staff)}
                >
                {staff.name}
                </li>
            ))}
            </ul>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
            {selectedStaffs.map((staff) => (
            <span key={staff.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                {staff.name}
                <button className="ml-1 text-green-500" onClick={() => handleRemoveStaff(staff.id)}>
                X
                </button>
            </span>
            ))}
        </div>
        </div>
    );
};

export default StaffSelector;