import { createContext, useState } from "react";

const UserContext = createContext({});

export function UserProvider({childen}){
  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem("loginData")));
  const [val, setVal] = useState([]);

  return(
    <UserContext.Provider value={{userToken, setUserToken, val, setVal}}>
      {childen}
    </UserContext.Provider>
  )
}

export default UserContext;
