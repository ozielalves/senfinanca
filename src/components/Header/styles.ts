import styled from "styled-components";
import { CSSColor } from "../../theme/types";

export const CustomHeader = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 40px;
  position: fixed;
  background-color: ${CSSColor.Background};
  z-index: 99;

  .box {
    display: flex;
    img {
      margin-right: 30px;
    }
    .logo {
      font-weight: 600;
      font-size: 28px;
      color: var(--text);
    }
  }
`;
