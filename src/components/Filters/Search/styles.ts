import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { CSSColor } from "../../../theme/types";

export const SearchBarWrapper = styled(Grid)`
  button {
    height: 48.5px;
    width: 48.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50px;
    color: white;
    margin-left: 10px;
    outline: none;

    &:hover {
      opacity: 0.7;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
    }
  }
  button.search {
    background-color: ${CSSColor.Primary};
  }
  button.reset {
    background-color: ${CSSColor.SecondaryLight};
    color: ${CSSColor.Secondary};
  }
`;
