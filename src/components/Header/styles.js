import { css } from 'emotion';

export const header = css`
  position: fixed;
  top: 0;
  width: 100%;
`;

export const avatar = css`
  height: 32px;
  width: 32px;
`;

export const logo = css`
  height: 40px;
  width: 40px;
`;

export const dropdown = css`
  list-style: none;
  position: relative;
  transition: background-color 0.25s linear;

  .open {
    background-color: #eee;

    .arrow {
      color: #777;
      transform: rotate(-180deg);
    }
  }
`;

export const subMenu = css`
  background: #fff;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  list-style: none;
  margin: 0;
  padding: 15px 0;
  position: absolute;
  right: 0;
  top: 65px;
  width: 180px;

  li {
    display: block;
    text-align: right;
    width: 100%;

    button,
    a {
      color: #777;
      width: 100%;

      &:hover,
      &:focus,
      &:active {
        color: #50bb94;
      }
    }
  }
`;
