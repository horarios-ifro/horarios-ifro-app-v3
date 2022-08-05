import PageHomeHeader from "./PageHomeHeader";
import { AppContent } from "../AppContent/AppContent";
import PageHomeContent from "./PageHomeContent";

const PageHome = () => (
  <>
    <PageHomeHeader />
    <AppContent>
      <PageHomeContent />
    </AppContent>
  </>
);

export default PageHome;
