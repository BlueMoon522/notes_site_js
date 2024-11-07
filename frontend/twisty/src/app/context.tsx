import { createContext, useContext, useState } from "react";

// Create Context
const UserContext = createContext();

// Create Provider component to manage userId state
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use userId context
export const useUser = () => useContext(UserContext);
