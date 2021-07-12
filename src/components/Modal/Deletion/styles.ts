import styled from "styled-components";
import { CSSColor } from "../../../theme/types";

export const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  p {
    font-size: 16px;
    color: ${CSSColor.Text};
    text-align: center;
  }
`;
