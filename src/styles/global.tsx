import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --brown: #DFBB9D;
    --beige: #F7E2D6;
    --teal: #9DD6DF;
    --purple: #676aec;
    --white: #f2f2f2;
  }

  @font-face {
    font-family: "GeekbleMalang2";
    src: url("/assets/fonts/GeekbleMalang2WOFF2.woff2")  format("woff2"),
    url("/assets/fonts/GeekbleMalang2WOFF.woff") format("woff"),
    url("/assets/fonts/GeekbleMalang2TTF.ttf") format("truetype");
    font-display: fallback;
    font-weight: normal;
    font-style: normal;
  }
  
  body {
    font-family: "GeekbleMalang2", sans-serif;
  }

  *,
  *::after,
  *::after {
    box-sizing: border-box;
    font-family: "GeekbleMalang2", sans-serif;
  }

  html {
    background-color: var(--beige);
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--beige);
  }

  a {
    text-decoration: none;
  }

  ul {
    margin-bottom: 0;
  }

  li {
    list-style: none;
  }

  code {
    font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  input, button, textarea {
    font-family: inherit;
  }

  html, border-style, #root {
    height: 100%;
  }
`;

export default GlobalStyles;
