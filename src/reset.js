import { css } from 'styled-components';

const Reset = css`
  /* CSS reset code */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-decoration: none;
    color: black;
    list-style: none;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: flex;
  }
  body {
    line-height: 1;
    background: #fff;
    color: #000;
  }
  ol, ul, li {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* Additional resets */
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }
  button, input {
    overflow: visible;
  }
  button, select {
    text-transform: none;
  }
  button, [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: button;
  }
  button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  textarea {
    overflow: auto;
  }
  [type="checkbox"], [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }
  [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  /* Link resets */
  a {
    text-decoration: none;
    color: black;
  }
  *{
    box-sizing: border-box;
  }
`;

export default Reset;
