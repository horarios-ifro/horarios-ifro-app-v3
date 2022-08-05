import { IReportTableDataTimeRange } from "../interfaces/IReportTableData";
import { renderDayTimeRangeText } from "./renderDayTimeRangeText";

export const DEFAULT_DAY_TIME_RANGES: IReportTableDataTimeRange[] = [
  { startHour: 7, startMinute: 30, endHour: 8, endMinute: 20 },
  { startHour: 8, startMinute: 20, endHour: 9, endMinute: 10 },
  { startHour: 9, startMinute: 10, endHour: 10, endMinute: 0 },
  { startHour: 10, startMinute: 20, endHour: 11, endMinute: 10 },
  { startHour: 11, startMinute: 10, endHour: 12, endMinute: 0 },
  { startHour: 13, startMinute: 0, endHour: 13, endMinute: 50 },
  { startHour: 13, startMinute: 50, endHour: 14, endMinute: 40 },
  { startHour: 14, startMinute: 40, endHour: 15, endMinute: 30 },
  { startHour: 15, startMinute: 50, endHour: 16, endMinute: 40 },
  { startHour: 16, startMinute: 40, endHour: 17, endMinute: 30 },
].map(renderDayTimeRangeText);
