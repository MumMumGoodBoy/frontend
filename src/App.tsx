import Home from '@/pages/home';
import Login from '@/pages/login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Define route */}
    </Routes>
  );
}

export default App;
