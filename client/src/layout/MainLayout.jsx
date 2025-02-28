import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { EventContext } from '../context/EventContext';

const MainLayout = () => {
    const { state, dispatch } = useContext(EventContext);
    const { drawers } = state;

    // body overflow 처리 (드로어가 열리면 스크롤 방지)
    useEffect(() => {
        const { isDrawerOpen, isCreateEventDrawer, isEditEventDrawer, isCreateUserDrawer } = drawers;
        document.body.style.overflow =
            isDrawerOpen || isCreateEventDrawer || isEditEventDrawer || isCreateUserDrawer
                ? 'hidden'
                : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [drawers]);

    return (
        <div className='h-layout'>
            <Header state={state} dispatch={dispatch} />
            <main className='h-full bg-gray-50'>
                <Outlet context={{ state, dispatch }} />
            </main>
        </div>
    );
};

export default MainLayout;
