import { AppContent } from "../AppContent/AppContent";
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
