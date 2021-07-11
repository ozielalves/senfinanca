import { Box, Link, Typography } from "@material-ui/core";
import { currentDate } from "../../services/constants";

function Copyright() {
  return (
    <Box pt={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Made with ❤ by "}
        <Link color="inherit" href="https://github.com/ozielalves/">
          Oziel Alves
        </Link>
        {" - "}
        {currentDate.getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Copyright;
