import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout.jsx';
import UserManagementPage from './pages/userManagement/UserManagementPage.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import EventDetail from './pages/event/EventDetail.jsx';
import { EventProvider } from './context/EventContext';

function App() {
  return (
      <BrowserRouter>
        <EventProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user-management" element={<UserManagementPage />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </EventProvider>
      </BrowserRouter>
  );
}

export default App;
