import { makeStyles, createStyles } from "@material-ui/core";
import styled from "styled-components";
import { CSSColor } from "../../theme/types";

export const useModalStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 512,
      backgroundColor: theme.palette.background.paper,
      border: "none",
      borderRadius: "10px",
      padding: theme.spacing(3),
      outline: "none",
    },
  })
);

export const Title = styled.p`
  font-weight: bold;
  font-size: 25px;
  line-height: 38px;
  color: ${CSSColor.Primary};
`;
