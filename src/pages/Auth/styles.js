import amsterdam from 'assets/images/bg.jpg';
import { css } from 'emotion';

export const container = css`
  background-color: #fafafa;
  height: 100vh;
  overflow: hidden;
`;

export const background = css`
  background-image: url(${amsterdam});
  background-size: cover;
  background-position: center;
  background-color: #777;
  background-blend-mode: multiply;
`;

export const title = css`
  color: #314654;

  h1 {
    margin: 0;

    &:after {
      background-color: #314654;
      content: "";
      display: block;
      height: 4px;
      margin-top: 15px;
      width: 50px;
    }
  }
`;

export const button = css`
  background-color: #50bb94;
  border-radius: 30px;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  padding: 15px 36px;
  transition: background 0.25s linear;

  &:hover,
  &:focus,
  &:active {
    background-color: #149668;
    color: #fff;
  }
`;

export const disabled = css`
  opacity: 0.7;
  pointer-events: none;
`;
