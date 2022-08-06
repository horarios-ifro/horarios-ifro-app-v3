import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

export const AppContent: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Box sx={{ flex: 1, height: "100%", overflow: "auto" }}>{children}</Box>
    </>
  );
};
