import { AppContent } from "../AppContent/AppContent";
import PageTeachersContent from "./PageTeachersContent";
import { PageTeachersContextProvider } from "./PageTeachersContext";
import PageTeachersHeader from "./PageTeachersHeader";

const PageTeachers = () => (
  <PageTeachersContextProvider>
    <PageTeachersHeader />

    <AppContent>
      <PageTeachersContent />
    </AppContent>
  </PageTeachersContextProvider>
);

export default PageTeachers;
