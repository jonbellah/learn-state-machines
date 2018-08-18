import { css } from 'emotion';

export const styles = css`
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-sizing: border-box;
  font-size: 16px;
  line-height: 1.42857;
  padding: 9px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  width: 100%;

  &:focus,
  &:active {
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    outline: 0;
  }
`;

export const styledInput = css`
  height: 50px;
`;
