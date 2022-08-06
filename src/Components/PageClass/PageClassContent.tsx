import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import WeekSelect from "../WeekSelect/WeekSelect";
import { useContextSelector } from "use-context-selector";
import { PageClassContext } from "./PageClassContext";
import Loading from "../Loading/Loading";
import { PageClassContentTabs } from "./PageClassContentTabs";
import { PageClassContentView } from "./PageClassContentView";

const PageClassContent = () => {
  const isLoading = useContextSelector(
    PageClassContext,
    ({ weekClassQuery }) => weekClassQuery.isLoading
  );

  const weekClass = useContextSelector(
    PageClassContext,
    ({ weekClassQuery }) => weekClassQuery.data
  );

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          py: 2,
        }}
      >
        <Box sx={{ my: 2 }}>
          <WeekSelect />
        </Box>

        <Divider />

        <PageClassContentTabs />

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ flex: "1", overflow: "auto" }}>
          {isLoading || !weekClass ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <PageClassContentView />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default PageClassContent;
