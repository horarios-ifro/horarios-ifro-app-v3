import { createContext } from "use-context-selector";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import * as api from "../../Features/horarios-ifro-data-v2-client/api";
import { IListWeeksResourceResponseDto } from "../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeeksResourceResponseDto";
import { useEffect, useMemo, useState } from "react";
import { IListWeeksItem } from "../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeeksItem";

export type IWeeksContext = {
  weeksQuery: UseQueryResult<IListWeeksResourceResponseDto, unknown>;

  selectedWeek: string | null;

  setSelectedWeek: (newSelectedWeek: string | null) => void;

  week: IListWeeksItem | undefined;

  weeks: IListWeeksItem[];
};

export const WeeksContext = createContext({} as IWeeksContext);

export const WeeksContextProvider = ({ children }: { children: any }) => {
  const weeksQuery = useQuery(["weeks"], () =>
    api.invokeResource(api.resources.weeks.listWeeksResource, undefined)
  );

  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);

  const allWeeks = useMemo(() => weeksQuery.data ?? [], [weeksQuery.data]);

  const weeks = useMemo(() => allWeeks.slice(-2), [allWeeks]);

  useEffect(() => {
    if (weeks.length > 0 && selectedWeek === null) {
      setSelectedWeek(weeks.slice(-1)[0].id);
    }
  }, [weeks, selectedWeek]);

  const week = useMemo(
    () => allWeeks.find((i) => i.id === selectedWeek),
    [allWeeks, selectedWeek]
  );

  return (
    <WeeksContext.Provider
      value={{ weeksQuery, selectedWeek, setSelectedWeek, weeks, week }}
    >
      {children}
    </WeeksContext.Provider>
  );
};
