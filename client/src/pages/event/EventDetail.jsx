import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import EventHeader from '../../components/EventDetail/EventHeader';
import EventTabs from '../../components/EventDetail/EventTabs';
import GolfManagement from '../../components/EventDetail/GolfManagement';
import TourManagement from '../../components/EventDetail/TourManagement';
import AddGroupDrawer from '../../components/EventDetail/AddGroupDrawer';
import { sampleEventData } from '../../data/eventData';

const EventDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [eventList, setEventList] = useState(sampleEventData);

  // 실제 구현시 API로 데이터 fetch
  const eventData = eventList.find((event) => event.id === id);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const openAddGroupDrawer = (type) => {
    setDrawerContent(type);
    setIsDrawerOpen(true);
  };

  if (!eventData) {
    return <div>이벤트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EventHeader event={eventData} />

      <div className="container mx-auto px-4 py-6">
        <EventTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          eventTypes={eventData.type}
        />

        <div className="mt-6">
          {activeTab === 'golf' && (
            <GolfManagement
              data={eventData.golfDetails}
              onAddGroup={() => openAddGroupDrawer('golf')}
            />
          )}
          {activeTab === 'tour' && (
            <TourManagement
              data={eventData.tourDetails}
              onAddBusGroup={() => openAddGroupDrawer('bus')}
              onAddDestination={() => openAddGroupDrawer('destination')}
            />
          )}
        </div>
      </div>

      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="right"
        size={400}
        className="drawer"
      >
        <AddGroupDrawer type={drawerContent} onClose={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default EventDetail;
