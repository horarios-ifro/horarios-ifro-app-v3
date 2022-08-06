import { AppContent } from "../AppContent/AppContent";
import PageClassContent from "./PageClassContent";
import { PageClassContextProvider } from "./PageClassContext";
import PageClassHeader from "./PageClassHeader";

const PageClass = () => {
  return (
    <PageClassContextProvider>
      <PageClassHeader />

      <AppContent>
        <PageClassContent />
      </AppContent>
    </PageClassContextProvider>
  );
};

export default PageClass;
