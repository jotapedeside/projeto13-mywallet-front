import styled from 'styled-components';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner';

import Button from './shared/Button';
import Input from './shared/Input';
import UserContext from './UserContext';
import { useContext, useEffect } from 'react';

export default function Login (){
  const navigate = useNavigate();

  const { userToken, setUserToken } = useContext(UserContext);
  //const [userToken, setUserToken] = useState(null);
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const [enableBtn, setEnableBtn] = useState(true);

  /*useEffect(() => {
    if (JSON.parse(localStorage.getItem("storedLoginData")) !== null) {
        navigate("/");
    }
  }, [])*/

  function loginUser(event){
    event.preventDefault();
    if (enableBtn){
      setEnableBtn(false);
      
      //fazer rota pro backend
      const URL = 'https://localhost:5000';
      const response = axios.post(`${URL}/login`, {
        email: loginData.email,
        password: loginData.password
      });

      response.then(({data}) => {
        //check if this works
        setUserToken({...loginData, token: data.token});
        localStorage.setItem("storedLoginData", JSON.stringify({...loginData, token: data.token}));
        navigate("/");
      }).catch(err => {
        //alert(`Ocorreu o erro ${err.response.statusText}. Por favor, tente novamente`);
        alert(`Ocorreu um erro. Por favor, tente novamente`);
        setEnableBtn(true);
        })
    } else return;
  }

  return(
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={loginUser}>
        <Input
          type="email"
          placeholder="E-mail"
          value={loginData.email}
          functionOnChange={(e) => setLoginData({...loginData, email: e.target.value})}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={loginData.password}
          functionOnChange={(e) => setLoginData({...loginData, password: e.target.value})}
        />
        <Button
          input= { enableBtn ? "Entrar" :
            <ThreeDots color="#FFFFFF" height={70} width={70}/>
          }
        />
      </form>
      <LinkToRegister to='/register'>Primeira vez? Cadastre-se!</LinkToRegister>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: auto 0;
  padding: 0 10px;

  h1{
    font-family: 'Saira Stencil One';
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 25px;
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
const LinkToRegister = styled(Link)`
    font-weight: 700;
    font-size: 15px;
    color: #FFFFFF;
    margin-top: 25px;
    text-decoration: none;
`