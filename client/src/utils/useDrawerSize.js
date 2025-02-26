import { useState, useEffect } from 'react';

const useDrawerSize = () => {
    const [drawerSize, setDrawerSize] = useState(480); // 기본값을 데스크탑 사이즈로 설정

    const updateDrawerSize = () => {
        if (window.innerWidth < 768) { // 모바일 기준 (768px 이하)
            setDrawerSize('100%');
        } else {
            setDrawerSize(480); // 데스크탑 기준
        }
    };

    useEffect(() => {
        updateDrawerSize(); // 컴포넌트가 마운트될 때 사이즈 업데이트
        window.addEventListener('resize', updateDrawerSize); // 윈도우 리사이즈 이벤트 리스너 추가

        return () => {
            window.removeEventListener('resize', updateDrawerSize); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, []);

    return drawerSize;
};

export default useDrawerSize;
