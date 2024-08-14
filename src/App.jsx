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
        <Route path="/contestants" element={<Contestant />} />
        <Route path="/contestantpage" element={<ContestantPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<HistoryPage />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;