import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/common/auth.store";
import "./login.css";
import { shallow } from "zustand/shallow";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const { loginSuccess, loginStart, loginFailure } = useAuth(
    (store) => ({
      loginSuccess: store.loginSuccess,
      loginStart: store.loginStart,
      loginFailure: store.loginFailure,
    }),
    shallow
  );

  const handleChange = (e): void => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials);
  };

  const handleClick = async (e): void => {
    e.preventDefault();
    loginStart();
    try {
      const res = await axios.post<Promise<T[]>>("/auth/login", credentials);
      console.log(res, "res");
      loginSuccess(res.data.details);
      navigate("/");
    } catch (err) {
      loginFailure(err.response.data);
      console.log(err, "err in handleClick");
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button
          /* disabled={loading} */ onClick={handleClick}
          className="lButton"
        >
          Login
        </button>
        {/* {error && <span>{error.message}</span>} */}
      </div>
    </div>
  );
};

export default Login;
