import styled from 'styled-components';
import { useState } from 'react';


export default function Home (){
  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem("loginData")));
  const [val, setVal] = useState([0, 10]);
  return(
    <Container>
      <Body>
        <Table>
          {val.length ===0  ?
          <h2>Não há registros de entrada ou saída</h2> :
          <>
            <h1>Registros</h1>
          </>}
        </Table>
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
    justify-content: space-between;
    max-width: 326px;
    width: 100%;
`

const Table = styled.div`
    max-width: 326px;
    width: 100%;
    min-height: 446px;
    height: 100%;
    margin-bottom: 15px;
    padding: 15px 5px;
    font-family: 'Raleway';
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;
`