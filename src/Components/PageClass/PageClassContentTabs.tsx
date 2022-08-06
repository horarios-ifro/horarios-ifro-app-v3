import { useContextSelector } from "use-context-selector";
import { PageClassContext } from "./PageClassContext";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import format from "date-fns/format";
import { dateFNSLocale } from "../../Features/date-fns-locale";
import { WeekDayTab } from "./utils/WeekDayTab";

export const PageClassContentTabs = () => {
  const setSelectedTab = useContextSelector(
    PageClassContext,
    ({ setSelectedTab }) => setSelectedTab
  );

  const selectedTab = useContextSelector(
    PageClassContext,
    ({ selectedTab }) => selectedTab
  );

  const eachWeekDay = useContextSelector(
    PageClassContext,
    ({ eachWeekDay }) => eachWeekDay
  );

  const handleSelectedTabChange = (_event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Divider orientation={"vertical"} />
        </Box>

        <Box sx={{ flexShrink: "0" }}>
          <Tabs value={selectedTab} onChange={handleSelectedTabChange}>
            <Tab value={WeekDayTab.OVERVIEW} label="Visão Geral" />
          </Tabs>
        </Box>

        <Box>
          <Divider orientation={"vertical"} />
        </Box>

        <Tabs
          value={selectedTab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleSelectedTabChange}
        >
          {eachWeekDay.map((day) => {
            const label = format(day, "EEEEEE (dd/LL)", {
              locale: dateFNSLocale,
            });
            return <Tab key={String(day)} value={day.getDay()} label={label} />;
          })}
        </Tabs>

        <Box>
          <Divider orientation={"vertical"} />
        </Box>
      </Box>
    </>
  );
};
