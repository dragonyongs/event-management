import { LuPlus } from 'react-icons/lu';
import CreateEventDrawer from './CreateEventDrawer';

const Title = ({
  isCreateDrawerOpen,
  setIsCreateDrawerOpen,
  handleCreateEvent,
}) => {
  return (
    <>
      <header className="bg-white border-b">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <button
            onClick={() => setIsCreateDrawerOpen(true)}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 active:bg-blue-800 
                       shadow-sm hover:shadow-md transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <LuPlus className="w-5 h-5 mr-2" />
            이벤트 생성
          </button>
        </div>
      </header>
      {isCreateDrawerOpen && (
        <CreateEventDrawer
          isOpen={isCreateDrawerOpen}
          onClose={() => setIsCreateDrawerOpen(false)}
          handleCreateEvent={handleCreateEvent}
        />
      )}
    </>
  );
};


export default Title;
