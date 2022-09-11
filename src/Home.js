import styled from 'styled-components';
import { useContext, useState } from 'react';
import UserContext from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Header from './shared/Header';


export default function Home (){
  const navigate = useNavigate();
  const {userToken, setUserToken} = useContext(UserContext);
  const [val, setVal] = useState([]);
  const [user, setUser] = useState({name: "Joao"})
  const values = [
    {
    id: 1,
    description: "Salário",
    value: 300000,
    type: "deposit",
    date: "15/11"
    },
    {
      id: 2,
      description: "Empréstimo Maria",
      value: 50000,
      type: "deposit",
      date: "20/11"
    },
    {
      id: 3,
      description: "Compras churrasco",
      value: 6760,
      type: "withdraw",
      date: "26/11"
    },
    {
      id: 4,
      description: "Mercado",
      value: 54254,
      type: "withdraw",
      date: "27/11"
    }];

  const reducer = (accumulator, curr) => accumulator + curr;
  function formatter(x){
    return (x/100).toFixed(2).replace('.', ',')
  }

  function logout() {
    localStorage.removeItem("loginDataStoraged")
    navigate("/login")
  }

  function Saldoo() {
    var saldoFinal = values.map((item) => {
      if(item.type === "deposit"){  
        return item.value;
      } else if (item.type === "withdraw"){
        return -item.value;
      }
    }).reduce(reducer, 0);
    
    var color;
    if (saldoFinal>0) {
      color = "#03AC00";
    } else {
      color = "#C70000";
    }
    return (
      <Saldo>
        <p>SALDO</p>
        <p style={{color: color}}>R$ {formatter(saldoFinal)}</p>
      </Saldo>
    )
  }

  function Itemm({id, date, description, value, type}) {
    var color;
    if (type==="deposit") {
      color = "#03AC00";
    } else {
      color = "#C70000";
    }
    return (
      <Item>
        <p>{date}</p>
        <p>{description}</p>
        <p style={{color: color}}>{formatter(value)}</p>
      </Item>
    )
  }

  return(
    <Container>
      <Body>
        <Header>
          <h1>Olá, {user.name}</h1>
          <div onClick={() => logout()}>
            <ion-icon name="log-out-outline"></ion-icon>
          </div>
        </Header>
        <Table>
          <div>
            {values.length ===0  ?
            <h2>Não há registros de entrada ou saída</h2> :
            <div>
              {values.map((v, key) =>
              <Itemm
                key={key}
                value={v.value}
                description={v.description}
                type={v.type}
                date={v.date}
              />)}
            </div>}
          </div>
          <Saldoo/>
        </Table>
        <EntradaSaida>
          <div onClick={() => navigate('/deposit')}>
              <ion-icon name="add-circle-outline"></ion-icon>
              <p> Nova entrada </p>
          </div>
          <div onClick={() => navigate('/withdraw')}>
              <ion-icon name="remove-circle-outline"></ion-icon>
              <p> Nova saída </p>
          </div>
        </EntradaSaida>
      </Body>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px 0;
  h2{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    width: 60%;
    text-align: center;
    color: #868686;
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%)
  }
`;

const Body = styled.main`
  display: flex;
  height: calc(97vh - 53px - 25px);
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  max-width: 326px;
  width: 100%;
  height: 90vh;
`

const Table = styled.div`
  max-width: 326px;
  width: 100%;
  //min-height: 446px;
  //height: 100%;
  height: 100%;
  max-height: 396px;
  margin-bottom: 15px;
  padding: 15px 5px;
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div{
    div{
      overflow: hidden;
    }
  }
`

const EntradaSaida = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  div{
    max-width: 156px;
    width: 48%;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    transition: 200ms ease;
    cursor: pointer;
    
    p{
      padding: 12px;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 17px;
      margin-top: 21px;
    }
    ion-icon {
      margin: 11px;
      color: #FFFFFF;
      background-color: rgba(0,0,0,0);
      font-size: 22px;
    }
    :hover {
      filter: brightness(1.15)
    }
  }
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 12px;

  p:first-child{
    width: 30%;
    color: #C6C6C6;
  }
  p:nth-child(2){
    width: 100%;
    text-align: start;
    margin-left: 10px;
  }
  p:last-child{
    width: 30%;
    text-align: end;
  }

`
const Saldo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;

  p:first-child{
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
  }
`