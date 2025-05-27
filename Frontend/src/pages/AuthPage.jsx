import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {login ? (
          <LoginForm state={setLogin} />
        ) : (
          <RegisterForm state={setLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
