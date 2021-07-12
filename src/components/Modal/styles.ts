import styled from "styled-components";
import { CSSColor } from "../../theme/types";

export const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 38px;
  color: ${CSSColor.Primary};

  @media screen and (max-width: 512px) {
    font-size: 16px;
  }
`;

export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
