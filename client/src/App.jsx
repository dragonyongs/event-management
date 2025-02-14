import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
