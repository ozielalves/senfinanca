import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { CSSColor } from "../../theme/types";

export const dashboardStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  marginBlock: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  largeIcon: {
    width: 70,
  },
}));

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  p.h3 {
    font-size: 32px;
    color: ${CSSColor.Text};
    line-height: 44px;
  }
  p.body-secondary {
    font-size: 18px;
    line-height: 25px;
    color: ${CSSColor.TextLight};
  }
}
`;
