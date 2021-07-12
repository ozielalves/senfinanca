import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import { CSSColor } from "../../../theme/types";

export const FiltersContainer = styled.div`
  position: absolute;
  .dropdown {
    width: max-content;
    min-width: 244px;
    position: absolute;
    top: 0px;
    right: 0%;
    z-index: 10;
    background-color: white;
    padding: 0 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  }
`;

export const ClearButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 5px;
  font-weight: bold;
  font-size: 16px;
  color: ${CSSColor.Primary};
  background-color: transparent;
  border: none;

  &:hover {
    opacity: 0.7;
  }
`;

export const CloseButton = styled(IconButton)`
  right: -20%;
`;
