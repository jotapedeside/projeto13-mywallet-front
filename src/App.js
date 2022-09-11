import {BrowserRouter, Routes, Route, Switch} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { UserProvider } from './UserContext';
import UserContext from './UserContext';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";



function App() {
  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem("loginData")));
  const [val, setVal] = useState([]);

  return (
    <UserContext.Provider value={{userToken, setUserToken, val, setVal}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/withdraw' element={<Withdraw />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
