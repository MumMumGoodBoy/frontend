import NotFound from '@/pages/404';
import Home from '@/pages/home';
import Landing from '@/pages/landing';
import Login from '@/pages/login';
import Register from '@/pages/register';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AppSidebar, Navbar } from './components/menu';
import { SidebarProvider } from './components/ui/sidebar';
import Favourite from './pages/favourite';
import Food from './pages/food';
import Foods from './pages/foods';
import Profile from './pages/profile';
import Random from './pages/random';
import Restaurant from './pages/restaurant';
import Restaurants from './pages/restaurants';
import Suggest from './pages/suggest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col w-full">
              <Navbar />
              <Outlet />
            </div>
          </SidebarProvider>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/food" element={<Foods />} />
        <Route path="/food/:id" element={<Food />} />
        <Route path="/restaurant" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/suggest" element={<Suggest />} />
        <Route path="/random" element={<Random />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/favourite" element={<Favourite />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      {/* Define route */}
    </Routes>
  );
}

export default App;
