import "./login.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/common/auth.store";
import { shallow } from "zustand/shallow";
import axios, { AxiosError } from "axios";
import { IUser, IErrorResponse } from "@/types";

interface Credentials {
  username?: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({});
  const [error, setError] = useState<string>("");

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
  };

  const handleClick = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    loginStart();

    try {
      const res = await axios.post<IUser>("/api/auth/login", credentials);
      loginSuccess(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        const errorData = error.response.data as IErrorResponse;
        const errorMessage = errorData.message || "Login failed";
        setError(errorMessage);
        loginFailure(errorMessage);
      } else {
        setError("An unknown error occurred");
      }
      console.log(error, "err in handleClick");
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
        <button onClick={(e) => void handleClick(e)} className="lButton">
          Login
        </button>
        {error && (
          <span style={{ color: "red", fontSize: "13px" }}>{error}</span>
        )}
      </div>
    </div>
  );
};

export default Login;
