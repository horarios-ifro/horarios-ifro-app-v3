import { useContextSelector } from "use-context-selector";
import { WeekItemViewContext } from "../WeekItemView/WeekItemViewContext";
import { WeekItemViewDaysTabs } from "./WeekItemViewDaysTabs";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";
import WeekItemViewDaysSelectedDayTable from "./WeekItemViewDaysSelectedDayTable";
import WeekSelect from "../WeekSelect/WeekSelect";

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
      <WeekItemViewDaysTabs />

      <Divider sx={{ my: 2 }} />

      <Box>
        <WeekSelect />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ flex: "1", overflow: "auto", mb: 2 }}>
        {(isLoading || !data) && <Loading />}

        {!(isLoading || !data) && <WeekItemViewDaysSelectedDayTable />}
      </Box>
    </>
  );
};
