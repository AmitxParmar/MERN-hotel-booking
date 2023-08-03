import "@/styles/dark.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";

import AdminHome from "./pages/admin/home/Home";
import AdminList from "./components/admin/table/Table";
import { useTheme } from "./common/general.store";
import NewHotel from "./pages/admin/newHotel/NewHotel";
import NewRoom from "./pages/admin/newRoom/newRoom";

function App() {
  const darkMode = useTheme((store) => store.darkMode);
  console.log("Theme Mode", darkMode);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/hotels" element={<List />} />
        </Routes>
      </BrowserRouter>

      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/admin">
              <Route path="home" element={<AdminHome />} />
              <Route path="userslist" element={<AdminList />} />
              <Route path="new" element={<NewHotel />} />

              <Route path="rooms">
                <Route path="new" element={<NewRoom />} />
              </Route>
              
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
