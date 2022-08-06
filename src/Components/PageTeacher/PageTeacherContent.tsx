import WeekItemView from "../WeekItemView/WeekItemView";
import { WeekItemViewContextProvider } from "../WeekItemView/WeekItemViewContext";
import { usePageTeacherWeekTeacherQuery } from "./utils/usePageTeacherWeekTeacherQuery";

const PageTeacherContent = () => {
  const dataQuery = usePageTeacherWeekTeacherQuery();

  return (
    <>
      <WeekItemViewContextProvider mode={"teacher"} dataQuery={dataQuery}>
        <WeekItemView />
      </WeekItemViewContextProvider>
    </>
  );
};

export default PageTeacherContent;
