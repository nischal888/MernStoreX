import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthenticationLayout from './components/authentication/authLayout';
import LoginAuthenticate from './pages/authentication/authLogin';
import RegisterAuthenticate from './pages/authentication/authRegister';
import AdministrationLayout from './components/administration/adminLayout';

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/authenticate" element={<AuthenticationLayout />}>
          <Route path="login" element={<LoginAuthenticate />} />
          <Route path="register" element={<RegisterAuthenticate />} />
        </Route>
        <Route
          path="/administration"
          element={<AdministrationLayout />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
