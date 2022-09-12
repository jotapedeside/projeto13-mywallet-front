import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import Header from "./shared/Header";
import Button from "./shared/Button";
import Input from "./shared/Input";
import UserContext from "./UserContext";

export default function Deposit(){
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (!userToken) navigate("/")
  }, [userToken])

  const [depositData, setDepositData] = useState({value: "", description: ""});
  const [enableBtn, setEnableBtn] = useState(true);

  function depositMoney(event){
    event.preventDefault();
    if (enableBtn){
      setEnableBtn(false);
      const config = {
        headers: {
          Authorization: `Bearer ${userToken.token}`
        }
      }

      if (depositData.value <= 0){
        alert("O valor do depósito deve ser maior que zero");
        setEnableBtn(true);
        return;
      }
      if(depositData.description === ""){
        alert("A descrição do depósito não pode estar vazia");
        setEnableBtn(true);
        return;
      }

      function formatter(x){
        return parseFloat(x).isNaN ? alert("O valor do depósito deve ser um número") : parseFloat(x);
      }
      
      const URL = 'http://localhost:5000';
      const response = axios.post(`${URL}/deposit`, {
        value: depositData.value,
        description: depositData.description,
        type: "deposit"
      }, config);
      console.log(response);

      response.then(() => {
        setEnableBtn(true);
        navigate("/");
      }).catch(err => {
        alert(`Ocorreu um erro. Por favor, tente novamente`);
        setEnableBtn(true);
        })
    } else return;
  }

  return(
    <Container>
      <Header>
        <h1>Novo depósito</h1>
      </Header>
      <form onSubmit={depositMoney}>
        <Input
          type="text"
          placeholder="Valor"
          value={depositData.value}
          functionOnChange={(e) => setDepositData({...depositData, value: e.target.value})}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={depositData.description}
          functionOnChange={(e) => setDepositData({...depositData, description: e.target.value})}
        />
        <Button
          input= { enableBtn ? "Salvar depósito" :
            <ThreeDots color="#FFFFFF" height={70} width={70}/>
          }
        />
      </form>
    </Container>
  )
}

const Container = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px 0;
  height: 80vh;
  padding: 0 10px;
  
  form{
    max-width: 326px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  ::placeholder {
    font-size: 20px;
    line-height: 23px;
    color: rgba(0,0,0,0.5);
  }
`
