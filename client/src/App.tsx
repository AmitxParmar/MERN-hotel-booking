import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import AdminHome from "./pages/admin/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/hotels/:id" element={<Hotel/>} />
        <Route path="/hotels" element={<List />} />
        
        <Route path="/admin/dashboard" element={<AdminHome />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
