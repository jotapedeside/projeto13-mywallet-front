import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }
  body {
    background-color: #8c11be;
    font-family: 'Raleway', sans-serif;
  }
`;

export default GlobalStyle;