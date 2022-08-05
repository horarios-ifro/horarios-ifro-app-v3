import { AppContent } from "../AppContent/AppContent";
import { Header } from "../Header/Header";
import PageTeacherContent from "./PageTeacherContent";

const PageTeacher = () => {
  return (
    <>
      <Header />

      <AppContent>
        <PageTeacherContent />
      </AppContent>
    </>
  );
};

export default PageTeacher;
