import { makeStyles } from "@material-ui/core";
import { CSSColor } from "../../theme/types";

export const tableStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
  td: {
    backgroundColor: CSSColor.Paper,
    "&:first-child": {
      borderTopLeftRadius: 10,
    },
    "&:last-child": {
      borderTopRightRadius: 10,
    },
  },
});
