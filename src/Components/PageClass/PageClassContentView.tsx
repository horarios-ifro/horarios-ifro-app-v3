import { useContextSelector } from "use-context-selector";
import { PageClassContext } from "./PageClassContext";
import { WeekDayTab } from "./utils/WeekDayTab";
import { PageClassContentViewOverview } from "./PageClassContentViewOverview";
import { PageClassContentViewDay } from "./PageClassContentViewDay";

export const PageClassContentView = () => {
  const selectedTab = useContextSelector(
    PageClassContext,
    ({ selectedTab }) => selectedTab
  );

  if (selectedTab === WeekDayTab.OVERVIEW) {
    return <PageClassContentViewOverview />;
  }

  return (
    <>
      <PageClassContentViewDay />
    </>
  );
};
