import { AppContent } from "../AppContent/AppContent";
import Footer from "../Footer/Footer";
import PageTeacherContent from "./PageTeacherContent";
import PageTeacherHeader from "./PageTeacherHeader";

const PageTeacher = () => (
  <>
    <PageTeacherHeader />

    <AppContent>
      <PageTeacherContent />
    </AppContent>
  </>
);

export default PageTeacher;
