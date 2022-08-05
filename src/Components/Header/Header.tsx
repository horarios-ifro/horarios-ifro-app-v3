import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ width: "100%" }}>
          <Container sx={{ padding: 0, display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                component="span"
                onClick={() => navigate("/")}
                sx={{ flexGrow: 0, cursor: "pointer" }}
              >
                Início
              </Typography>
            </Box>

            <Typography sx={{ cursor: "default" }}>v0.3-unknown</Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
