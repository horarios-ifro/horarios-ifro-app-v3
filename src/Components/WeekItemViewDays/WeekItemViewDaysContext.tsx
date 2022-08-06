import { createContext, useContextSelector } from "use-context-selector";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getEachWeekDay } from "../../Features/getEachWeekDay";
import { IReportTableDataTimeRange } from "../ReportTable/interfaces/IReportTableData";
import { DEFAULT_DAY_TIME_RANGES } from "../ReportTable/utils/DEFAULT_DAY_TIME_RANGES";
import { WeekItemViewContext } from "../WeekItemView/WeekItemViewContext";
import { WeekDayTab } from "./interfaces/WeekDayTab";
import { useNow } from "../useNow";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import isAfter from "date-fns/isAfter";

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

  const now = useNow();

  const data = useContextSelector(
    WeekItemViewContext,
    ({ dataQuery }) => dataQuery.data
  );

  const [selectedTab, setSelectedTab] = useState(WeekDayTab.SEG);
  const eachWeekDay = useMemo(() => getEachWeekDay(data?.week), [data]);

  const dayTimeRanges = DEFAULT_DAY_TIME_RANGES;

  useEffect(() => {
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
  }, [now]);

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
