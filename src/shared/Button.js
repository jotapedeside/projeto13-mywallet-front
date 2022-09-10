import styled from "styled-components"

function Button ({input}) {
  return (
    <>
      <ButtonStyle>
        {input}
      </ButtonStyle>
    </>
  )
}

const ButtonStyle = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-top: 10px;
    max-width: 326px;
    width: 100%;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
    transition: 180ms ease;
    cursor: pointer;
    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;
    :hover {
      filter: brightness(1.15)
    }
`

export default Button