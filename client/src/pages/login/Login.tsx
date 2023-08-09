import "./login.css";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/common/auth.store";
import { shallow } from "zustand/shallow";
import axios from "axios";
import type { IUser } from "@/types";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [error, setError] = useState<Error | null | undefined>(null);

  const { loginSuccess, loginStart, loginFailure } = useAuth(
    (store) => ({
      loginSuccess: store.loginSuccess,
      loginStart: store.loginStart,
      loginFailure: store.loginFailure,
    }),
    shallow
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials);
  };

  const handleClick = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    console.log("loggin in");
    loginStart();
    try {
      console.log("client, logging in pass, id");
      const res = await axios.post("/api/auth/login", credentials);
      console.log(res, "res");
      loginSuccess(res.data.details as IUser);
      localStorage.setItem("user", JSON.stringify(res.data.details));
      navigate("/");
    } catch (err) {
      setError(err);
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
          /*  disabled={loading} */
          onClick={(e) => void handleClick(e)}
          className="lButton"
        >
          Login
        </button>
        {error && (
          <span style={{ color: "red", fontSize: "13px" }}>
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
