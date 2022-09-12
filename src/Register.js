import styled from 'styled-components';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner';

import Button from './shared/Button';
import Input from './shared/Input';


export default function Register (){
  const navigate = useNavigate();

  const [userData, setUserData] = useState({name: "", email: "", password: "", confirmPassword: ""});
  const [enableBtn, setEnableBtn] = useState(true);

  function confirmPassword(password, confirmPassword){
    if(password !== confirmPassword) return false;
    return true;
  }

  function registerUser(event){
    event.preventDefault();
    if (enableBtn){
      setEnableBtn(false);
      
      const isPasswordValid = confirmPassword(userData.password, userData.confirmPassword);
      if (!isPasswordValid){
        alert("As senhas não coincidem");
        setEnableBtn(true);
        return;
      }
      //fazer rota pro backend
      const URL = 'http://localhost:5000';
      const response = axios.post(`${URL}/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password
      });

      response.then(() => navigate("/login")).catch(err => {
        //alert(`Ocorreu o erro ${err.response.statusText}. Por favor, tente novamente`);
        alert(`Ocorreu um erro. Por favor, tente novamente`);
        setEnableBtn(true);
        })

    } else return;
  }

  return(
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={registerUser}>
        <Input
          type="text"
          placeholder="Nome"
          value={userData.name}
          functionOnChange={(e) => setUserData({...userData, name: e.target.value})}
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={userData.email}
          functionOnChange={(e) => setUserData({...userData, email: e.target.value})}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={userData.password}
          functionOnChange={(e) => setUserData({...userData, password: e.target.value})}
        />
        <Input
          type="password"
          placeholder="Confirme a senha"
          value={userData.confirmPassword}
          functionOnChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
        />
        <Button
          input= { enableBtn ? "Cadastrar" :
            <ThreeDots color="#FFFFFF" height={70} width={70}/>
          }
        />
      </form>
      <LinkToLogin to='/login'>Já tem uma conta? Entre agora!</LinkToLogin>
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
const LinkToLogin = styled(Link)`
    font-weight: 700;
    font-size: 15px;
    color: #FFFFFF;
    margin-top: 25px;
    text-decoration: none;
`