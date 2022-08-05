import { AppContent } from "../AppContent/AppContent";
import { Header } from "../Header/Header";
import PageClassContent from "./PageClassContent";

const PageClass = () => {
  return (
    <>
      <Header />

      <AppContent>
        <PageClassContent />
      </AppContent>
    </>
  );
};

export default PageClass;
