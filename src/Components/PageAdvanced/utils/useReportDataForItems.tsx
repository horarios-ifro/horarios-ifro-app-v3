import {
  IReportTableData,
  IReportTableDataColumn,
  IReportTableDataDay,
} from "../../ReportTable/interfaces/IReportTableData";
import { useMemo } from "react";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import localePTBR from "date-fns/locale/pt-BR";
import { useContextSelector } from "use-context-selector";
import { useQueries } from "@tanstack/react-query";
import { WeeksContext } from "../../WeeksContext/WeeksContext";
import * as api from "../../../Features/horarios-ifro-data-v2-client/api";
import { IGetWeekTeacherResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherResourceResponseDto";
import { IGetWeekClassResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { IPageAdvancedElementsListItem } from "../interfaces/IPageAdvancedElementsListItem";

export const useReportDataForItems = (
  selectedItems: IPageAdvancedElementsListItem[]
) => {
  const week = useContextSelector(WeeksContext, ({ week }) => week);

  const weekId = useContextSelector(
    WeeksContext,
    ({ selectedWeek }) => selectedWeek
  );

  const itemsWeekQueries = useQueries({
    queries: selectedItems.map((selectedItem) => {
      if (weekId) {
        if (selectedItem.type === "teacher") {
          return {
            queryKey: ["week", weekId, "teacher", selectedItem.id],
            queryFn: () =>
              api.invokeResource(api.resources.weeks.getWeekTeacherResource, {
                weekId,
                teacherId: selectedItem.data.id,
              }),
          };
        }
        if (selectedItem.type === "class") {
          return {
            queryKey: ["week", weekId, "class", selectedItem.id],
            queryFn: () =>
              api.invokeResource(api.resources.weeks.getWeekClassResource, {
                weekId,
                classId: selectedItem.data.id,
              }),
          };
        }
      }
      return {
        queryKey: ["week", weekId],
        queryFn: () => Promise.resolve(null),
      };
    }),
  });

  const reportTableData: IReportTableData = useMemo(() => {
    const selectedItemsColumns: IReportTableDataColumn[] =
      selectedItems.map<IReportTableDataColumn>((item, idx) => {
        const itemWeekQuery = itemsWeekQueries[idx];

        if (itemWeekQuery.isLoading) {
          return { header: item.data.slugs[0].slug, items: "loading" };
        }

        if (item.type === "teacher") {
          const data = itemWeekQuery.data as IGetWeekTeacherResourceResponseDto;
          return {
            header: item.data.slugs[0].slug,
            items: data.items.map((item) => ({
              order: item.order,
              weekDay: item.weekDayOrder,
              text: [
                item.subject?.name ?? item.subject?.slugs[0].slug,
                item.klass?.slugs[0].slug,
              ].join(" - "),
            })),
          };
        }

        if (item.type === "class") {
          const data = itemWeekQuery.data as IGetWeekClassResourceResponseDto;
          return {
            header: item.data.slugs[0].slug,
            items: data.items.map((item) => ({
              order: item.order,
              weekDay: item.weekDayOrder,
              text: [
                item.subject?.name ?? item.subject?.slugs[0].slug,
                item.teacher?.slugs[0].slug,
              ].join(" - "),
            })),
          };
        }

        return { header: "-", items: [] };
      });

    const columns: IReportTableDataColumn[] =
      selectedItemsColumns.length === 0
        ? [
            {
              header: "-",
              items: [],
            },
          ]
        : selectedItemsColumns;

    const days: IReportTableDataDay[] = week
      ? Array.from({ length: 6 })
          .map((_, idx) => idx)
          .map((weekDayOrder) => {
            const dayDate = addDays(new Date(week.startsAt), weekDayOrder);

            const weekDayText = format(dayDate, "EEEE", {
              locale: localePTBR,
            });

            const weekDayTextShort =
              weekDayText.split("-")[0][0].toUpperCase() +
              weekDayText.split("-")[0].slice(1);

            return {
              weekDayOrder,
              dateText: format(dayDate, "dd/MM"),
              weekDayText: weekDayTextShort,
            };
          })
      : [];

    return {
      days,
      columns,
    };
  }, [selectedItems, itemsWeekQueries]);

  return { reportTableData };
};
