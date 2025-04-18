import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthenticationLayout from './components/authentication/AuthLayout';
import LoginAuthenticate from './pages/authentication/LoginAuthenticate';
import RegisterAuthenticate from './pages/authentication/RegisterAuthenticate';
import AdministrationLayout from './components/administration/AdminLayout';
import AdminOrders from './pages/administration/AdminOrders';
import AdminProducts from './pages/administration/AdminProducts';
import AdminDashboard from './pages/administration/AdminDashboard';
import ShoppingLayout from './components/shopping/shoppingLayout';
import PageNotFound from './pages/pagenotfound';
import ShoppingAccount from './pages/shopping/ShoppingAccount';
import ShoppingCheckout from './pages/shopping/ShoppingCheckout';
import ShoppingHome from './pages/shopping/ShoppingHome';
import ShoppingList from './pages/shopping/ShoppingList';
import UnautorizePage from './pages/unauthorizepage/UnautorizePage';
import AuthChecker from './components/shared/authChecker';

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/authenticate"
          element={
            <AuthChecker>
              <AuthenticationLayout />
            </AuthChecker>
          }
        >
          <Route path="login" element={<LoginAuthenticate />} />
          <Route path="register" element={<RegisterAuthenticate />} />
        </Route>
        <Route
          path="/administration"
          element={
            <AuthChecker>
              <AdministrationLayout />
            </AuthChecker>
          }
        >
          <Route path="dahboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route
          path="/shop"
          element={
            <AuthChecker>
              <ShoppingLayout />
            </AuthChecker>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="lists" element={<ShoppingList />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="/unauthorize-page" element={<UnautorizePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
