import { PageItemReportContextProvider } from "../PageItemReport/PageItemReportContext";
import { PageItemReportDialog } from "../PageItemReport/PageItemReportDialog";

const PageClassReport = () => (
  <PageItemReportContextProvider reportPath="/classes/:id/report">
    <PageItemReportDialog />
  </PageItemReportContextProvider>
);

export default PageClassReport;
