import NotFound from '@/pages/404';
import Home from '@/pages/home';
import Landing from '@/pages/landing';
import Login from '@/pages/login';
import Register from '@/pages/register';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AppSidebar, Navbar } from './components/menu';
import { SidebarProvider } from './components/ui/sidebar';

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
      </Route>

      <Route path="*" element={<NotFound />} />
      {/* Define route */}
    </Routes>
  );
}

export default App;
