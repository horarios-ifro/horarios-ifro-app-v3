import WeekItemView from "../WeekItemView/WeekItemView";
import { WeekItemViewContextProvider } from "../WeekItemView/WeekItemViewContext";
import { usePageClassWeekClassQuery } from "./utils/usePageClassWeekClassQuery";

const PageClassContent = () => {
  const dataQuery = usePageClassWeekClassQuery();

  return (
    <>
      <WeekItemViewContextProvider mode={"class"} dataQuery={dataQuery}>
        <WeekItemView />
      </WeekItemViewContextProvider>
    </>
  );
};

export default PageClassContent;
