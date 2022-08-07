import { PageItemReportContextProvider } from "../PageItemReport/PageItemReportContext";
import { PageItemReportDialog } from "../PageItemReport/PageItemReportDialog";

const PageTeacherReport = () => (
  <PageItemReportContextProvider reportPath="/teachers/:id/report">
    <PageItemReportDialog />
  </PageItemReportContextProvider>
);

export default PageTeacherReport;
