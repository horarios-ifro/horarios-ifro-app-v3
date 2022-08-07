import { Header } from "../Header/Header";
import SummarizeIcon from "@mui/icons-material/Summarize";
import IconButton from "@mui/material/IconButton";
import { useContextSelector } from "use-context-selector";
import { PageClassContext } from "./PageClassContext";
import { useNavigate } from "react-router-dom";

const PageClassHeader = () => {
  const navigate = useNavigate();

  const hasData = useContextSelector(PageClassContext, ({ dataQuery }) =>
    Boolean(dataQuery.data)
  );

  return (
    <>
      <Header
        title="Turma"
        goBackTo={"/classes"}
        containerProps={{ maxWidth: "sm" }}
        afterTitle={
          <>
            <IconButton
              color="inherit"
              disabled={!hasData}
              onClick={() => navigate("report")}
            >
              <SummarizeIcon />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default PageClassHeader;
