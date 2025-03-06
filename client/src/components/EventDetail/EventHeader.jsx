import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../../context/EventContext';
import { formatDate } from '../../utils/eventUtils';
import EventTabs from './EventTabs';

const EventHeader = ({activeTab, setActiveTab, eventTypes}) => { 
  const navigate = useNavigate();
  const { state, dispatch } = useContext(EventContext);
  const { events, drawers, selectedEvent } = state;

  return (
    <div className="sticky z-50 top-0 left-0 bg-white border-b">
      <div className="container mx-auto px-4 pt-6">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-start md:items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h1>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">
                {formatDate(selectedEvent.startDate)} ~ {formatDate(selectedEvent.endDate)}
              </p>
            </div>
          </div>
          <div className="flex gap-x-4">
            <button onClick={()=> navigate('/')} className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
              이벤트 목록
            </button>
            <button onClick={() => dispatch({ type: 'OPEN_DRAWER', drawer: 'isEditEventDrawer' })} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              수정하기
            </button>
          </div>
        </div>
        <EventTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          eventTypes={eventTypes}
      />
      </div>
    </div>
  );
};

export default EventHeader;
