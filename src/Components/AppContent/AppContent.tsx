import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

export const AppContent: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Box sx={{ flex: 1, height: "100%", overflow: "auto" }}>{children}</Box>

      <Divider />

      <footer style={{ flexGrow: 0 }}>
        <Container sx={{ p: 2, py: 1, display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography component={"span"}>
              Criado por{" "}
              <a
                style={{ textDecoration: "none" }}
                href="https://linktr.ee/gabriel.rodrigues.antunes"
              >
                Gabriel R. Antunes.
              </a>
            </Typography>
            {/* <>
              {" "}
              <Typography component={"span"}>Licença: AGPL-3.0.</Typography>
            </> */}
          </Box>

          <Box component={"nav"}>
            <Box
              component={"ul"}
              sx={{
                display: "flex",
                listStyle: "none",
                alignItems: "center",
                gap: 2,
                margin: 0,
                padding: 0,
              }}
            >
              <Box component={"li"}>
                <Box sx={{ width: 36, height: 36 }}>
                  <img
                    alt="Ji-Paraná, RO."
                    title="Feito em Ji-Paraná, RO."
                    src="https://raw.githubusercontent.com/guesant/assets/shared/jiparana-bg-white.svg"
                  />
                </Box>
              </Box>

              <Box component={"li"}>
                <a href="https://github.com/horarios-ifro">
                  <Box sx={{ width: 26, height: 26 }}>
                    <img
                      alt="Repositório GitHub"
                      title="Repositório GitHub"
                      src="https://simpleicons.org/icons/github.svg"
                    />
                  </Box>
                </a>
              </Box>
            </Box>
          </Box>
        </Container>
      </footer>
    </>
  );
};
