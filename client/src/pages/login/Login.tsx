import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const navigate = useNavigate();

  return <div className="login">
    <div className="lContainer">
      <input type="password" className="lInput" />
    </div>
  </div>;
};

export default Login;
