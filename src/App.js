import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AuthForm from './components/AuthForm/AuthForm';
import PopupLogin from './components/PopupLogin/PopupLogin';
import ComingSoon from './components/ComingSoon/ComingSoon';
import DashboardPage from './components/DashboardPage/DashboardPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/popup" element={<PopupLogin />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;