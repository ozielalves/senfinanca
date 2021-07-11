import styled from "styled-components";
import { ButtonProps } from ".";
import { CSSColor } from "../../theme/types";

export const CustomButton = styled.button<ButtonProps>`
  background: ${({ variant, color }) =>
    variant === "contained"
      ? color === "secondary"
        ? CSSColor.Secondary
        : CSSColor.Primary
      : "transparent"};
  width: ${({ width }) => width ?? "100%"};
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 32px;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
  color: ${({ color }) =>
    color === "secondary"
      ? CSSColor.Secondary
      : color === "primary"
      ? CSSColor.Primary
      : "white"};
  border: ${({ variant, color }) =>
    variant === "outlined"
      ? `2px solid ${
          color === "secondary" ? CSSColor.Secondary : CSSColor.Primary
        }`
      : "unset"};
  outline: none;
  border-radius: 10px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  opacity: ${({ disabled }) => (disabled ? "0.3" : "1")};
  box-shadow: ${({ variant }) =>
    variant === "contained" ? "0px 1px 15px rgba(0, 0, 0, 0.25)" : "unset"};

  &:hover {
    opacity: 0.7;
    box-shadow: ${({ variant }) =>
      variant === "contained" ? "0px 0px 20px rgba(0, 0, 0, 0.3)" : "unset"};
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    align-self: center;
    display: flex;
    margin-right: 10px;
  }
`;
