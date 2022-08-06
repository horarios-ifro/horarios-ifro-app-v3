import { useContextSelector } from "use-context-selector";
import { WeekItemViewContext } from "../WeekItemView/WeekItemViewContext";
import { WeekItemViewDaysTabs } from "./WeekItemViewDaysTabs";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";
import WeekItemViewDaysSelectedDayTable from "./WeekItemViewDaysSelectedDayTable";
import WeekSelect from "../WeekSelect/WeekSelect";

export const WeekItemViewDays = () => {
  const { isLoading, data } = useContextSelector(
    WeekItemViewContext,
    ({ dataQuery }) => dataQuery
  );

  return (
    <>
      <WeekItemViewDaysTabs />

      <Divider />

      <Box sx={{ py: 2 }}>
        <WeekSelect />
      </Box>

      <Divider />

      <Box sx={{ flex: "1", overflow: "auto" }}>
        {(isLoading || !data) && <Loading />}

        {!(isLoading || !data) && <WeekItemViewDaysSelectedDayTable />}
      </Box>
    </>
  );
};
