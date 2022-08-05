import { FC, PropsWithChildren } from "react";
import Container from "@mui/material/Container";

const AppContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Container sx={{ height: "100%" }}>{children}</Container>
    </>
  );
};

export default AppContainer;
