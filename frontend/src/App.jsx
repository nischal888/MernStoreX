import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthenticationLayout from './components/authentication/authLayout';
import LoginAuthenticate from './pages/authentication/authLogin';
import RegisterAuthenticate from './pages/authentication/authRegister';
import AdministrationLayout from './components/administration/adminLayout';
import AdminOrders from './pages/administration/adminOrders';
import AdminProducts from './pages/administration/adminProducts';
import AdminDashboard from './pages/administration/adminDashboard';
import ShoppingLayout from './pages/shopping/shoppingLayout';
import PageNotFound from './pages/pagenotfound';

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/authenticate" element={<AuthenticationLayout />}>
          <Route path="login" element={<LoginAuthenticate />} />
          <Route path="register" element={<RegisterAuthenticate />} />
        </Route>
        <Route path="/administration" element={<AdministrationLayout />}>
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="dahboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/shop" element={<ShoppingLayout />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
