import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import Loading from "../Loading/Loading";
import { WeekItemViewOverviewContext } from "../WeekItemViewOverview/WeekItemViewOverviewContext";

export const PageItemReportDialogContentOpenedViewPreview = () => {
  const imgURL = useContextSelector(
    WeekItemViewOverviewContext,
    ({ imgURL }) => imgURL
  );

  const handleGenerateImgURL = useContextSelector(
    WeekItemViewOverviewContext,
    ({ handleGenerateImgURL }) => handleGenerateImgURL
  );

  useEffect(() => {
    void handleGenerateImgURL();
  }, [handleGenerateImgURL]);

  if (!imgURL) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        gap: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <a href={imgURL}>
          <img
            alt={""}
            src={imgURL}
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              objectFit: "contain",
            }}
          />
        </a>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Button
          href={imgURL}
          variant="contained"
          download="relatorio.png"
          startIcon={<DownloadIcon />}
        >
          Baixar Imagem
        </Button>

        <Button
          href={imgURL}
          target="_blank"
          variant="contained"
          startIcon={<OpenInNewIcon />}
        >
          Abrir em Nova Guia
        </Button>
      </Box>
    </Box>
  );
};
