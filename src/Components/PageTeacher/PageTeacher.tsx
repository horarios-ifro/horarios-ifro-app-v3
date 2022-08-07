import { AppContent } from "../AppContent/AppContent";
import { PageTeacherContextProvider } from "./PageTeacherContext";
import PageTeacherContent from "./PageTeacherContent";
import PageTeacherHeader from "./PageTeacherHeader";
import loadable from "@loadable/component";
import { PageTeacherFixtureIdMappings } from "./PageTeacherFixtureIdMappings";

const PageTeacherReport = loadable(() => import("./PageTeacherReport"));

const PageTeacher = () => (
  <PageTeacherFixtureIdMappings>
    <PageTeacherContextProvider>
      <PageTeacherHeader />

      <PageTeacherReport />

      <AppContent>
        <PageTeacherContent />
      </AppContent>
    </PageTeacherContextProvider>
  </PageTeacherFixtureIdMappings>
);

export default PageTeacher;
