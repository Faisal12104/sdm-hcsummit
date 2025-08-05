import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AuthForm from './components/AuthForm/AuthForm';
import PopupLogin from './components/PopupLogin/PopupLogin';
import ComingSoon from './components/ComingSoon/ComingSoon';
import Sektor from './components/Admin/SuperAdmin/Manajemen/Sektor';
import User from './components/Admin/SuperAdmin/Manajemen/User';
import Berkas from './components/Admin/SuperAdmin/Manajemen/Berkas';
import Profile from './components/Admin/SuperAdmin/Manajemen/Profile';
import SuperAdmin from './components/Admin/SuperAdmin/SuperAdmin';
import AdminExternal from './components/Admin/AdminExternal/AdminExternal';
import Upload from'./components/Admin/AdminExternal/ManajemenExternal/Upload';
import Approval from './components/Admin/AdminExternal/ManajemenExternal/Approval';
import AdminSector from './components/Admin/AdminSector/AdminSector';
import ProfileSector from './components/Admin/AdminSector/ManajemenSector/ProfileSector';
import UserSector from './components/Admin/AdminSector/ManajemenSector/UserSector';
import DaftarSector from './components/Admin/AdminSector/ManajemenSector/DaftarSector';
import BerkasSector from './components/Admin/AdminSector/ManajemenSector/BerkasSector';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/popup" element={<PopupLogin />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/SuperAdmin" element={<SuperAdmin />} />
        <Route path="/sektor" element={<Sektor />} />
        <Route path="/User" element={<User />} />
        <Route path="/Berkas" element={<Berkas />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AdminExternal" element={<AdminExternal />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/Approval" element={<Approval />} />
        <Route path="/AdminSector" element={<AdminSector />} />
        <Route path="/ProfileSector" element={<ProfileSector />} />
        <Route path="/UserSector" element={<UserSector />} />
        <Route path="/DaftarSector" element={<DaftarSector />} />
        <Route path="/BerkasSector" element={<BerkasSector />} />


      </Routes>
    </Router>
  );
}

export default App;