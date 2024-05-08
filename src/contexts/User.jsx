import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("jessjelly");
  const [avatarUrl, setAvatarUrl] = useState("https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141");
  return (
    <UserContext.Provider value={{ username, setUsername, avatarUrl, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

