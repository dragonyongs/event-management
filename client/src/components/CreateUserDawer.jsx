import React, { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import useDrawerSize from '../utils/useDrawerSize';

const CreateUserDrawer = ({ isOpen, onClose, onSubmit }) => {
    const drawerSize = useDrawerSize();

    const [userData, setUserData] = useState({
        id: '', // 실제 데이터에선 _id로 자동생성
        name: '',
        role: '',
        position: '',
        rank: '',
        email: '',
        phone: '',
        companyContact: '',
        company: '',
        department: '',
        team: '',
        division: '',
        memo: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = () => {
        const newErrors = {};
        if (!userData.name.trim()) newErrors.name = '이름을 입력하세요';
        if (!userData.email.trim()) newErrors.email = '이메일을 입력하세요';
        if (!userData.phone.trim()) newErrors.phone = '연락처를 입력하세요';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newUserData = { ...userData, id: new Date()};

        onSubmit(newUserData);
        // 저장 후 폼 초기화 및 드로어 닫기
        setUserData({
            id: '', // 실제 데이터에선 _id로 자동생성
            name: '',
            role: '',
            position: '',
            rank: '',
            email: '',
            phone: '',
            companyContact: '',
            company: '',
            department: '',
            team: '',
            division: '',
            memo: '',
        });
        onClose();
    };

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            direction="right"
            size={drawerSize}
            className="p-6"
        >
        <div className="flex flex-col space-y-6 h-[calc(100vh-158px)] overflow-y-auto overflow-x-hidden scrollbar-hidden">
            <h2 className="text-xl font-bold text-gray-800">신규 사용자 생성</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="홍길동"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">역할</label>
                <input
                    type="text"
                    value={userData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="예: 조인웍, 팀교육"
                />
                {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">직위</label>
                <input
                    type="text"
                    value={userData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.position ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="예: 영업상무"
                />
                {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">직급</label>
                <input
                    type="text"
                    value={userData.rank}
                    onChange={(e) => handleChange('rank', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.rank ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="예: 상무"
                />
                {errors.rank && <p className="mt-1 text-sm text-red-500">{errors.rank}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="hong@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="010-1111-2222"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">회사 연락처</label>
                <input
                    type="text"
                    value={userData.companyContact}
                    onChange={(e) => handleChange('companyContact', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.companyContact ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="02-1234-5678"
                />
                {errors.companyContact && <p className="mt-1 text-sm text-red-500">{errors.companyContact}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">회사</label>
                <input
                    type="text"
                    value={userData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="회사A"
                />
                {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">부서</label>
                <input
                    type="text"
                    value={userData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="부서를 입력하세요"
                />
                {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">팀</label>
                <input
                    type="text"
                    value={userData.team}
                    onChange={(e) => handleChange('team', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.team ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="예: 팀A-1"
                />
                {errors.team && <p className="mt-1 text-sm text-red-500">{errors.team}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">구분</label>
                <input
                    type="text"
                    value={userData.division}
                    onChange={(e) => handleChange('division', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.division ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="예: 컨설턴트, 스태프 등"
                />
                {errors.division && <p className="mt-1 text-sm text-red-500">{errors.division}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                <textarea
                    value={userData.memo}
                    onChange={(e) => handleChange('memo', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.memo ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="메모를 입력하세요"
                    rows={3}
                />
                {errors.memo && <p className="mt-1 text-sm text-red-500">{errors.memo}</p>}
            </div>
        </div>

        <div className="flex justify-between gap-x-3 px-6 mt-6">
            <button 
                onClick={onClose} 
                className="flex-initial py-2 px-4 text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
            닫기
            </button>
            <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
            저장
            </button>
        </div>
        </Drawer>
    );
};

export default CreateUserDrawer;
