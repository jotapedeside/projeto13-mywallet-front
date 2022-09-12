import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import Header from "./shared/Header";
import Button from "./shared/Button";
import Input from "./shared/Input";
import UserContext from "./UserContext";

export default function Withdraw(){
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (!userToken) navigate("/")
  }, [userToken])

  const [withdrawData, setWithdrawData] = useState({value: "", description: ""});
  const [enableBtn, setEnableBtn] = useState(true);

  function withdrawMoney(event){
    event.preventDefault();
    if (enableBtn){
      setEnableBtn(false);

      const config = {
        headers: {
          Authorization: `Bearer ${userToken.token}`
        }
      }

      if (withdrawData.value <= 0){
        alert("O valor do depósito deve ser maior que zero");
        setEnableBtn(true);
        return;
      }
      if(withdrawData.description === ""){
        alert("A descrição do depósito não pode estar vazia");
        setEnableBtn(true);
        return;
      }
      //verificar se valores passados são válidos
      function formatter(x){
        return parseFloat(x).isNaN ? alert("O valor do depósito deve ser um número") : parseFloat(x);
      }

      const URL = 'http://localhost:5000';
      const response = axios.post(`${URL}/deposit`, {
        value: formatter(withdrawData.value),
        description: withdrawData.description,
        type: "deposit"
      }, config);

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
        <h1>Novo saque</h1>
      </Header>
      <form onSubmit={withdrawMoney}>
        <Input
          type="text"
          placeholder="Valor"
          value={withdrawData.value}
          functionOnChange={(e) => setWithdrawData({...withdrawData, value: e.target.value})}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={withdrawData.description}
          functionOnChange={(e) => setWithdrawData({...withdrawData, description: e.target.value})}
        />
        <Button
          input= { enableBtn ? "Salvar saque" :
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
