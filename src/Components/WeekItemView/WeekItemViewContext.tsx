import { createContext } from "use-context-selector";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { IWeekItemViewData } from "./interfaces/IWeekItemViewData";
import { WeekDayTab } from "../WeekItemViewDays/interfaces/WeekDayTab";
import { getEachWeekDay } from "../../Features/getEachWeekDay";
import { IReportTableDataTimeRange } from "../ReportTable/interfaces/IReportTableData";
import { DEFAULT_DAY_TIME_RANGES } from "../ReportTable/utils/DEFAULT_DAY_TIME_RANGES";

export type IWeekItemViewContext = {
  mode: "class" | "teacher";

  dataQuery: UseQueryResult<IWeekItemViewData | null, unknown>;
};

export const WeekItemViewContext = createContext({} as IWeekItemViewContext);

type IWeekItemViewContextProviderProps = PropsWithChildren<
  Pick<IWeekItemViewContext, "dataQuery" | "mode">
>;

export const WeekItemViewContextProvider: FC<
  IWeekItemViewContextProviderProps
> = (props) => {
  const { children, dataQuery, mode } = props;

  return (
    <WeekItemViewContext.Provider
      value={{
        mode,
        dataQuery,
      }}
    >
      {children}
    </WeekItemViewContext.Provider>
  );
};
