import isAfter from "date-fns/isAfter";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { getEachWeekDay } from "../../Features/getEachWeekDay";
import { getNow } from "../getNow";
import { IReportTableDataTimeRange } from "../ReportTable/interfaces/IReportTableData";
import { DEFAULT_DAY_TIME_RANGES } from "../ReportTable/utils/DEFAULT_DAY_TIME_RANGES";
import { WeekItemViewContext } from "../WeekItemView/WeekItemViewContext";
import { WeekDayTab } from "./interfaces/WeekDayTab";

export type IWeekItemViewDaysContext = {
  eachWeekDay: Date[];

  selectedTab: WeekDayTab;

  setSelectedTab: Dispatch<SetStateAction<WeekDayTab>>;

  dayTimeRanges: IReportTableDataTimeRange[];
};

export const WeekItemViewDaysContext = createContext(
  {} as IWeekItemViewDaysContext
);

export const WeekItemViewDaysContextProvider: FC<PropsWithChildren<{}>> = (
  props
) => {
  const { children } = props;

  const data = useContextSelector(
    WeekItemViewContext,
    ({ dataQuery }) => dataQuery.data
  );

  const [selectedTab, setSelectedTab] = useState(WeekDayTab.SEG);

  const eachWeekDay = useMemo(() => getEachWeekDay(data?.week), [data]);

  const dayTimeRanges = DEFAULT_DAY_TIME_RANGES;

  useEffect(() => {
    const now = getNow();

    const today = now.getDay() - 1;

    const latestDayTimeRange = dayTimeRanges.find(
      (i, idx, arr) => idx === arr.length - 1
    )!;

    const latestDayTimeRangeEndDate = setHours(
      setMinutes(now, latestDayTimeRange.endMinute),
      latestDayTimeRange.endHour
    );

    const goToFirstTab =
      (today === 5 && isAfter(now, latestDayTimeRangeEndDate)) ||
      today > 5 ||
      today < 0;

    const targetTab = goToFirstTab ? 0 : today;

    setSelectedTab(targetTab);
  }, []);

  return (
    <WeekItemViewDaysContext.Provider
      value={{
        eachWeekDay,
        selectedTab,
        dayTimeRanges,
        setSelectedTab,
      }}
    >
      {children}
    </WeekItemViewDaysContext.Provider>
  );
};
