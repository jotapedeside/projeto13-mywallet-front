import {BrowserRouter, Routes, Route, Switch} from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from "./Home";
import Register from "./Register";
import { UserProvider } from './UserContext';


function App() {
  // const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem("loginData")));
  //const [val, setVal] = useState([]);

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
