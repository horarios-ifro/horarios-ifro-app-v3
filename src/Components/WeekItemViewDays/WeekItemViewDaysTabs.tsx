import { useContextSelector } from "use-context-selector";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import format from "date-fns/format";
import { dateFNSLocale } from "../../Features/date-fns-locale";
import { WeekDayTab } from "./interfaces/WeekDayTab";
import { WeekItemViewContext } from "../WeekItemView/WeekItemViewContext";
import { useCallback } from "react";
import { useNow } from "../useNow";
import isSameDay from "date-fns/isSameDay";
import { WeekItemViewDaysContext } from "./WeekItemViewDaysContext";

// EEEEEE (dd/LL)

const formatWeekDayTabLabel = (day: Date | number) =>
  format(day, "EEEEEE", {
    locale: dateFNSLocale,
  });

export const WeekItemViewDaysTabs = () => {
  const now = useNow();

  const setSelectedTab = useContextSelector(
    WeekItemViewDaysContext,
    ({ setSelectedTab }) => setSelectedTab
  );

  const selectedTab = useContextSelector(
    WeekItemViewDaysContext,
    ({ selectedTab }) => selectedTab
  );

  const eachWeekDay = useContextSelector(
    WeekItemViewDaysContext,
    ({ eachWeekDay }) => eachWeekDay
  );

  const handleSelectedTabChange = (_event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const formatDayLabel = useCallback(
    (day: Date | number) =>
      `${formatWeekDayTabLabel(day)}${isSameDay(now, day) ? " (HOJE)" : ""}`,
    [now]
  );

  return (
    <>
      <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
        <Tabs
          sx={{ flex: 1 }}
          value={selectedTab}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          onChange={handleSelectedTabChange}
        >
          {eachWeekDay.map((day) => (
            <Tab
              key={String(day)}
              value={day.getDay() - 1}
              label={formatDayLabel(day)}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};
