import { AppContent } from "../AppContent/AppContent";
import { PageTeacherContextProvider } from "./PageTeacherContext";
import PageTeacherContent from "./PageTeacherContent";
import PageTeacherHeader from "./PageTeacherHeader";
import loadable from "@loadable/component";

const PageTeacherReport = loadable(() => import("./PageTeacherReport"));

const PageTeacher = () => (
  <PageTeacherContextProvider>
    <PageTeacherHeader />

    <PageTeacherReport />

    <AppContent>
      <PageTeacherContent />
    </AppContent>
  </PageTeacherContextProvider>
);

export default PageTeacher;
