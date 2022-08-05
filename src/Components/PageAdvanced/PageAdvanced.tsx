import { PageAdvancedContextProvider } from "./PageAdvancedContext";
import PageAdvancedContent from "./PageAdvancedContent";
import PageAdvancedHeader from "./PageAdvancedHeader";

const PageAdvanced = () => (
  <PageAdvancedContextProvider>
    <PageAdvancedHeader />
    <PageAdvancedContent />
  </PageAdvancedContextProvider>
);

export default PageAdvanced;
