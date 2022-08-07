import loadable from "@loadable/component";
import { AppContent } from "../AppContent/AppContent";
import PageClassContent from "./PageClassContent";
import { PageClassContextProvider } from "./PageClassContext";
import PageClassHeader from "./PageClassHeader";

const PageClassReport = loadable(() => import("./PageClassReport"));

const PageClass = () => (
  <PageClassContextProvider>
    <PageClassHeader />

    <PageClassReport />

    <AppContent>
      <PageClassContent />
    </AppContent>
  </PageClassContextProvider>
);

export default PageClass;
