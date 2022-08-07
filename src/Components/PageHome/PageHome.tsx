import { AppContent } from "../AppContent/AppContent";
import PageHomeContent from "./PageHomeContent";
import PageHomeHeader from "./PageHomeHeader";

const PageHome = () => (
  <>
    <PageHomeHeader />

    <AppContent>
      <PageHomeContent />
    </AppContent>
  </>
);

export default PageHome;
