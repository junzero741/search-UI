import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
        box-sizing: border-box;
    }

  a, a:active, a:hover, a:visited{
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  ul, ol, dl {
    list-style: none;
  }

  input, button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
