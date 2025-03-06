import { Link, useNavigate } from 'react-router-dom';
import { LuPlus, LuUsers, LuUserRoundCog } from 'react-icons/lu';
import CreateEventDrawer from './CreateEventDrawer';

const Header = ({ state, dispatch }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white border-b">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between px-6 py-4 space-y-3 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900">
            <Link to="/">Event Management</Link>
          </h1>
          <div className="space-x-3">
            <button
              onClick={() => navigate('/user-management')}
              className="inline-flex items-center px-3 py-2 bg-white text-blue-600 rounded-lg border border-blue-500
                                    hover:text-blue-700 hover:bg-blue-50 active:bg-blue-300 
                                    shadow-sm hover:shadow-md transition-all duration-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-md"
            >
              <LuUserRoundCog className="w-5 h-5 mr-2" />
              사용자 관리
            </button>
            <button
              onClick={() =>
                dispatch({ type: 'OPEN_DRAWER', drawer: 'isCreateEventDrawer' })
              }
              className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg
                                    hover:bg-blue-700 active:bg-blue-800 
                                    shadow-sm hover:shadow-md transition-all duration-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <LuPlus className="w-5 h-5 mr-2" />
              이벤트 생성
            </button>
          </div>
        </div>
      </header>

      <CreateEventDrawer
        isOpen={state.drawers.isCreateEventDrawer}
        searchUsers={state.users}
        onClose={() => {
          dispatch({ type: 'CLOSE_DRAWER', drawer: 'isCreateEventDrawer' });
          // dispatch({ type: 'RESET_EVENT_FORM' });
        }}
        handleCreateEvent={(newEventData) => {
          const newEvent = {
            id: `evt_${Date.now()}`,
            title: newEventData.title,
            startDate: newEventData.startDate,
            endDate: newEventData.endDate,
            status: 'upcoming',
            images: newEventData.images || [],
            type: newEventData.type,
            users: newEventData.users || [],
            staffs: newEventData.staffs || [],
            description: newEventData.description,
            subEvents: newEventData.type.map((t) => ({
              type: t,
              schedule: [],
              ...(t === 'golf' ? { venue: '', groups: [] } : {}),
              ...(t === 'tour' ? { busGroups: [], destinations: [] } : {}),
            })),
          };
          dispatch({ type: 'CREATE_EVENT', event: newEvent });
        }}
      />
    </>
  );
};

export default Header;
