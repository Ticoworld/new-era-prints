import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Magazine from './pages/Magazine';
import Register from './pages/Register';
import Contestant from './pages/Contestant';
import ContestantPage from './pages/ContestantPage';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import HistoryPage from './pages/HistoryPage';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import CompleteRegistrationPage from './pages/CompleteRegistrationPage';
import Loader from './components/Loader';
import Pay from './pages/Pay';
import ContestRegister from './pages/ContestRegister';
import ContestLogin from './pages/ContestLogin';
import VerifyContestant from './pages/VerifyContestant';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the AOS animations
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contest-register" element={<ContestRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contest-login" element={<ContestLogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contest-verify-email" element={<VerifyContestant />} />
        <Route path="/complete-registration" element={<CompleteRegistrationPage />} />
        <Route path="/invite/:username" element={<Contestant />} />
        <Route path="/shop/*" element={<Shop />} /> 
        <Route path="/contestantpage" element={<ContestantPage />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
