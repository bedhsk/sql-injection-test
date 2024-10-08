import React from "react";
import LoginForm from "../../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="loginPage">
      <h1>Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
