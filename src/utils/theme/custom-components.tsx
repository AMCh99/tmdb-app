import styled from "@emotion/styled";
import { CardContent } from "@mui/material";

export const ScrollableCardContent = styled(CardContent)(({ color }) => ({
    overflow: "auto",

    "&::-webkit-scrollbar": {
      width: "5px",
      height: "5px",
      marginRight: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "5px",
    //   backgroundColor: palette.primary.main,
      marginRight: "10px",
    },
    "&::-webkit-scrollbar-track": {
      margin: "24px",
    },
  }));