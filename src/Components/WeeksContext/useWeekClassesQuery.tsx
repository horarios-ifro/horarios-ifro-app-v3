import { useContextSelector } from "use-context-selector";
import { WeeksContext } from "./WeeksContext";
import { useQuery } from "@tanstack/react-query";
import * as api from "../../Features/horarios-ifro-data-v2-client/api";

export const useWeekClassesQuery = () => {
  const selectedWeek = useContextSelector(
    WeeksContext,
    ({ selectedWeek }) => selectedWeek
  );

  return useQuery(["week", selectedWeek, "classes"], async () => {
    if (selectedWeek) {
      return api.invokeResource(api.resources.weeks.listWeekClassesResource, {
        weekId: selectedWeek,
      });
    }
    return [];
  });
};
