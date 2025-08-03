import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AuthForm from './components/AuthForm/AuthForm';
import PopupLogin from './components/PopupLogin/PopupLogin';
import ComingSoon from './components/ComingSoon/ComingSoon';
import DashboardPage from './components/DashboardPage/DashboardPage';
import Sektor from './components/Manajemen/Sektor';
import User from './components/Manajemen/User';
import Berkas from './components/Manajemen/Berkas';
import Profile from './components/DashboardPage/Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/popup" element={<PopupLogin />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sektor" element={<Sektor />} />
        <Route path="/User" element={<User />} />
        <Route path="/Berkas" element={<Berkas />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;