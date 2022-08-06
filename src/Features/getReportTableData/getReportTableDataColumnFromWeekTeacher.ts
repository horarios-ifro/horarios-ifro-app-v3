import { IGetWeekTeacherResourceResponseDto } from "../horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherResourceResponseDto";

export const getReportTableDataColumnFromWeekTeacher = (
  data: IGetWeekTeacherResourceResponseDto
) => {
  return {
    header: data.teacher.slugs[0].slug,

    items: data.items.map((item) => ({
      order: item.order,

      weekDay: item.weekDayOrder,

      text: [
        item.subject?.name ?? item.subject?.slugs[0].slug,
        item.klass?.slugs[0].slug,
      ].join(" - "),
    })),
  };
};
