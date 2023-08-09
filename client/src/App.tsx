import "@/styles/dark.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";

import { useTheme } from "./common/general.store";
import AdminList from "./pages/admin/list/List";
import AdminHome from "./pages/admin/home/Home";
import NewHotel from "./pages/admin/newHotel/NewHotel";
import NewRoom from "./pages/admin/newRoom/newRoom";
import New from "./pages/admin/new/New";
import { userInputs } from "./formSource";
import { useAuth } from "./common/auth.store";
import { Navigate } from "react-router-dom";

function App() {
  const darkMode = useTheme((store) => store.darkMode);
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useAuth((state) => state.user);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

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
            <Route path="admin">
              <Route
                path="register"
                element={
                  <New inputs={userInputs} title="Add New User" />
                }
              />
              <Route
                index
                path="home"
                element={
                  <ProtectedRoute>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />
              <Route path="userslist" element={<AdminList />} />
              <Route path="hotel">
                <Route path="new" element={<NewHotel />} />
              </Route>

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
