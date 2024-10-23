import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Magazine from "./pages/Magazine";
import Register from "./pages/Register";
import Contestant from "./pages/Contestant";
import ContestantPage from "./pages/ContestantPage";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import CompleteRegistrationPage from "./pages/CompleteRegistrationPage";
import ContestRegister from "./pages/ContestRegister";
import ContestLogin from "./pages/ContestLogin";
import VerifyContestant from "./pages/VerifyContestant";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import AdminAuth from "./pages/AdminAuth";
import AdminPage from "./pages/AdminPage";
import ResetPassword from "./pages/ResetPassword";
import { AdminProvider } from "./Context/AdminContext";
import ProtectedRouteContest from "./components/ProtectedRouteContest";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the AOS animations
    });
  }, []);

  const serverUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/register" element={<Register serverUrl={serverUrl}/>} />
        <Route path="/login" element={<Login serverUrl={serverUrl}/>} />

        <Route
          path="/contest-register"
          element={
            <ProtectedRouteContest >
              <ContestRegister serverUrl={serverUrl}/>
            </ProtectedRouteContest>
          }
        />
        <Route
          path="/contest-login"
          element={
            <ProtectedRouteContest>
              <ContestLogin serverUrl={serverUrl}/>
            </ProtectedRouteContest>
          }
        />
        <Route
          path="/complete-registration"
          element={
            <ProtectedRouteContest>
              <CompleteRegistrationPage serverUrl={serverUrl}/>
            </ProtectedRouteContest>
          }
        />
        <Route
          path="/invite/:username"
          element={
            <ProtectedRouteContest>
              <Contestant serverUrl={serverUrl}/>
            </ProtectedRouteContest>
          }
        />
        <Route
          path="/contestantpage"
          element={
            <ProtectedRouteContest>
              <ContestantPage serverUrl={serverUrl}/>
            </ProtectedRouteContest>
          }
        />
         <Route
          path="/contest-verify-email"
          element={
            <ProtectedRouteContest>
              <VerifyContestant serverUrl={serverUrl}/>
            </ProtectedRouteContest>
          }
        />        
        <Route path="/shop/*" element={<Shop serverUrl={serverUrl}/> } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email" element={<VerifyEmail serverUrl={serverUrl}/>} />
        <Route path="/forgot-password" element={<ForgotPassword serverUrl={serverUrl}/>} />
        <Route path="/reset-password/:token" element={<ResetPassword serverUrl={serverUrl}/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin-auth" element={<AdminAuth serverUrl={serverUrl}/>} />
        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <AdminPage serverUrl={serverUrl}/>
            </AdminProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
