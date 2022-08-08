import { AppContent } from "../AppContent/AppContent";
import Footer from "../Footer/Footer";
import PageHomeContent from "./PageHomeContent";
import PageHomeHeader from "./PageHomeHeader";

const PageHome = () => (
  <>
    <PageHomeHeader />

    <AppContent>
      <PageHomeContent />
    </AppContent>

    <Footer containerProps={{ maxWidth: "sm" }} />
  </>
);

export default PageHome;
