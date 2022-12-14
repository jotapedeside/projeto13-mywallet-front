import styled from "styled-components"

function Input({ type, placeholder, value, functionOnChange }) {
    return (
      <>
        <InputStyle
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={functionOnChange}
        />
      </>
    )
}

const InputStyle = styled.input`
  max-width: 326px;
  width: 100%;
  height: 58px;
  background: #FFFFFF;
  border-radius: 5px;
  margin: 7px auto;
  padding: 15px;
  border: none;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
  
  ::placeholder {
    font-size: 20px;
    line-height: 23px;
    color: rgba(0,0,0,0.5);
  }
  :focus {
    outline: none;
  }
`

export default Input