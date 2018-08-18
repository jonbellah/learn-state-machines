import { css } from 'emotion';

export const background = css`
  background-color: #398DF0;
`;

export const dropzone = css`
  border-color: rgb(102, 102, 102);
  border-radius: 5px;
  border-style: dashed;
  border-width: 2px;
  cursor: pointer;
  height: 200px;
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:hover,
  &:active,
  &:focus {
    border-color: #00CE95;
  }
`;

export const dropzoneActive = css`
  background-color: rgba(0, 206, 149, 0.125);
  border: 2px solid #00CE95;
`;

export const button = css`
  background-color: #50bb94;
  border: 0;
  color: #fff;
  transition: background 0.25s linear;

  &:hover,
  &:focus,
  &:active {
    background-color: #149668;
    color: #fff;
  }
`;

export const closeBtn = css`
  background: transparent;
  border: 0;
  line-height: 1;
  padding: 0;
  top: 5px;

  &:hover,
  &:focus,
  &:active {
    color: #fff;
    opacity: 0.8;
  }
`;
