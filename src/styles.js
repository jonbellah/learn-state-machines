import { css } from 'emotion';

export const body = css`
  padding-top: 100px;
`;

export default `
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background: #fafafa;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  a,
  button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  a {
    transition: all 0.25s linear;
  
    &:hover,
    &:focus,
    &:active {
      color: blue;
      border-color: blue;
    }
  }

  button,
  .button {
    outline: none;
    cursor: pointer;
    border: 2px solid #b3b3b3;
    transition: all 0.25s ease-in-out;

    &:hover,
    &:focus,
    &:active {
      color: blue;
      border-color: blue;
    }
  }

  input,
  button,
  textarea {
    outline: none;
  }

  textarea {
    resize: none;
  }

  .shadow-05 {
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .icon {
    height: 14px;
    width: 14px;
  
    &-l {
      height: 20px;
      width: 20px;
    }
  }

  .c-mid-gray {
    color: #b3b3b3;
  }
`;
