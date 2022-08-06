import { createContext } from "use-context-selector";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { usePageClassWeekClassQuery } from "./utils/usePageClassWeekClassQuery";
import { UseQueryResult } from "@tanstack/react-query";
import { IGetWeekClassResourceResponseDto } from "../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { WeekDayTab } from "./utils/WeekDayTab";
import { getEachWeekDay } from "../../Features/getEachWeekDay";

export type IPageClassContext = {
  weekClassQuery: UseQueryResult<
    IGetWeekClassResourceResponseDto | null,
    unknown
  >;

  eachWeekDay: Date[];

  selectedTab: WeekDayTab;
  setSelectedTab: Dispatch<SetStateAction<WeekDayTab>>;
};

export const PageClassContext = createContext({} as IPageClassContext);

export const PageClassContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const weekClassQuery = usePageClassWeekClassQuery();

  const weekClass = useMemo(() => weekClassQuery.data, [weekClassQuery.data]);

  const [selectedTab, setSelectedTab] = useState(WeekDayTab.OVERVIEW);

  const eachWeekDay = useMemo(
    () => getEachWeekDay(weekClass?.week),
    [weekClass]
  );

  return (
    <PageClassContext.Provider
      value={{ weekClassQuery, eachWeekDay, selectedTab, setSelectedTab }}
    >
      {children}
    </PageClassContext.Provider>
  );
};
