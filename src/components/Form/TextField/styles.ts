import styled from "styled-components";
import { CSSColor } from "../../../theme/types";

export const CustomInput = styled.input`
  flex: 1;
  height: 49px;
  width: 100%;
  padding: 0 1.5rem;
  border-radius: 10px;
  border: 2px solid ${CSSColor.SecondaryLight};
  color: ${CSSColor.Text};
  background: transparent;
  font-size: 1rem;
  transition: border 0.3s ease-out;

  & + select {
    margin-left: 1rem;
  }
  &::placeholder {
    color: ${CSSColor.Secondary};
  }
  &:focus {
    outline: none;
    border: 2px solid ${CSSColor.Primary};
  }
`;
