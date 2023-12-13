import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const userSessionStorage = JSON.parse(
  sessionStorage.getItem("user_data") ||
    JSON.stringify({
      isAuthenticated: true,
    })
);

export default function UserContextProvider(props) {
  const [userData, setUserData] = useState(userSessionStorage);

  useEffect(() => {
    sessionStorage.setItem("user_data", JSON.stringify(userData));
  }, [userData]);

  const signIn = () => {
    setUserData({
      isAuthenticated: true,
    });
  };
  const logOut = () => {
    setUserData({
      isAuthenticated: false,
    });
  };

  return (
    <UserContext.Provider value={{ userData, signIn, logOut }}>
      {props.children}
    </UserContext.Provider>
  );
}
