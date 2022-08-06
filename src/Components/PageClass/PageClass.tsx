import { AppContent } from "../AppContent/AppContent";
import PageClassContent from "./PageClassContent";
import PageClassHeader from "./PageClassHeader";

const PageClass = () => (
  <>
    <PageClassHeader />

    <AppContent>
      <PageClassContent />
    </AppContent>
  </>
);

export default PageClass;
