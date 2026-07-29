import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { AuthProvider } from "../contexts";

function AuthLayout() {
  const [Users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const addUser = (userName, pass, email, fullName) => {
    setUsers((prev) => [
      ...prev,
      { id: userName, password: pass, email: email, fullName: fullName },
    ]);
  };

  const changePass = (userName, pass) => {
    setUsers((prev) =>
      prev.map((prevUser) =>
        prevUser.id === userName ? { ...prevUser, password: pass } : prevUser,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(Users));
  }, [Users]);

  return (
    <AuthProvider value={{ Users, addUser, changePass }}>
      <div className="min-h-screen flex flex-col">
        <Header type="authNav" />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default AuthLayout;
