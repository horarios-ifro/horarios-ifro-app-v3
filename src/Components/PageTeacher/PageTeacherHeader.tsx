import { Header } from "../Header/Header";
import IconButton from "@mui/material/IconButton";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { PageTeacherContext } from "./PageTeacherContext";

const PageTeacherHeader = () => {
  const navigate = useNavigate();

  const hasData = useContextSelector(PageTeacherContext, ({ dataQuery }) =>
    Boolean(dataQuery.data)
  );

  return (
    <>
      <Header
        title="Professor"
        goBackTo={"/teachers"}
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

export default PageTeacherHeader;
