import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useContextSelector } from "use-context-selector";
import Loading from "../Loading/Loading";
import { WeekItemViewContext } from "../WeekItemView/WeekItemViewContext";
import WeekSelect from "../WeekSelect/WeekSelect";
import WeekItemViewDaysSelectedDayTable from "./WeekItemViewDaysSelectedDayTable";
import { WeekItemViewDaysTabs } from "./WeekItemViewDaysTabs";

export const WeekItemViewDays = () => {
  const data = useContextSelector(
    WeekItemViewContext,
    ({ dataQuery }) => dataQuery.data
  );

  const isLoading = useContextSelector(
    WeekItemViewContext,
    ({ dataQuery }) => dataQuery.isLoading
  );

  return (
    <>
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <WeekItemViewDaysTabs />
      </Container>

      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Divider />
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ my: 2 }}>
          <WeekSelect />
        </Box>
      </Container>

      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Divider />
      </Container>

      <Box sx={{ flex: "1", overflow: "auto", py: 2 }}>
        <Container maxWidth="sm">
          {(isLoading || !data) && <Loading />}

          {!(isLoading || !data) && <WeekItemViewDaysSelectedDayTable />}
        </Container>
      </Box>
    </>
  );
};
