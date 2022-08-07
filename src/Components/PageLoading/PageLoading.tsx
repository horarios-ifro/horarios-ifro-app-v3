import { Header } from "../Header/Header";
import { AppContent } from "../AppContent/AppContent";
import Loading from "../Loading/Loading";

const PageLoading = () => (
  <>
    <Header goBackTo={"/"} title="Carregando..." />

    <AppContent>
      <Loading />
    </AppContent>
  </>
);

export default PageLoading;
