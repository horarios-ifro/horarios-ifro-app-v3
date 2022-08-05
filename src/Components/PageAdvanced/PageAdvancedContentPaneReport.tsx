import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { saveAs } from "file-saver";
import { createElement, useCallback, useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import ReportTable from "../ReportTable/ReportTable";
import PageAdvancedContentReportTable from "./PageAdvancedContentReportTable";
import { generateSVGBlob } from "./utils/generateSVGBlob";
import { getSVGDataForTable } from "./utils/getSVGDataForTable";
import { useSelectedItemsReportTableData } from "./utils/useSelectedItemsReportTableData";
import { DEFAULT_TARGET_SCALE } from "./utils/DEFAULT_TARGET_SCALE";

const PageAdvancedContentPaneReport = () => {
  const outputRef = useRef<HTMLDivElement>(null);

  const { reportTableData } = useSelectedItemsReportTableData();

  const generateImageBlob = useCallback(async () => {
    const outputRefEl = outputRef.current!;

    const rootEl = document.createElement("div");
    outputRefEl.appendChild(rootEl);

    const root = createRoot(rootEl);

    await new Promise<string>((resolve) => {
      root.render(
        <>
          {createElement(() => {
            useLayoutEffect(() => {
              resolve(outputRefEl.innerHTML);
            }, []);
            return null;
          })}
          <ReportTable data={reportTableData} />
        </>
      );
    });

    const svgData = getSVGDataForTable(
      rootEl.querySelector("table")!,
      rootEl.querySelector("style")!
    );

    const svgBlob = generateSVGBlob(svgData);

    const svgURL = URL.createObjectURL(svgBlob);

    const img = new Image();

    await new Promise((resolve, reject) => {
      img.addEventListener("load", resolve);
      img.addEventListener("error", reject);
      img.src = svgURL;
    });

    const canvas = document.createElement("canvas");

    canvas.width = Math.ceil(img.width * DEFAULT_TARGET_SCALE);
    canvas.height = Math.ceil(img.height * DEFAULT_TARGET_SCALE);

    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const finalImgBlob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          resolve(blob);
        }
        reject();
      }, "image/png")
    );

    URL.revokeObjectURL(svgURL);

    outputRefEl.removeChild(rootEl);

    return finalImgBlob;
  }, [reportTableData, outputRef]);

  const handleExportReport = useCallback(async () => {
    const imgBlob = await generateImageBlob();
    saveAs(imgBlob, "relatorio.png");
  }, [generateImageBlob]);

  const handleViewImage = useCallback(async () => {
    const imgBlob = await generateImageBlob();
    const imgURL = URL.createObjectURL(imgBlob);
    window.open(imgURL, "_blank");
  }, [generateImageBlob]);

  // const handleOpenNewTab = useCallback(async () => {
  //   const outputRefEl = outputRef.current!;

  //   const rootEl = document.createElement("div");
  //   outputRefEl.appendChild(rootEl);

  //   const root = createRoot(rootEl);

  //   await new Promise<string>((resolve) => {
  //     root.render(
  //       <>
  //         {createElement(() => {
  //           useLayoutEffect(() => {
  //             resolve(outputRefEl.innerHTML);
  //           }, []);
  //           return null;
  //         })}
  //         <ReportTable data={reportTableData} />
  //       </>
  //     );
  //   });

  //   const svgData = getSVGDataForTable(
  //     rootEl.querySelector("table")!,
  //     rootEl.querySelector("style")!
  //   );

  //   const svgBlob = generateSVGBlob(svgData);

  //   const svgURL = URL.createObjectURL(svgBlob);

  //   window.open(svgURL, "_blank");

  //   outputRefEl.removeChild(rootEl);
  // }, [reportTableData, outputRef]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
        }}
      >
        <Box p={1} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box px={1} py={1} sx={{ flex: 1 }}></Box>

          <Button
            size={"small"}
            color={"primary"}
            variant={"outlined"}
            onClick={() => handleExportReport()}
          >
            Exportar
          </Button>

          <Button
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleViewImage()}
          >
            Ver como Imagem
          </Button>

          {/* <Button
            variant={"contained"}
            size={"small"}
            color={"primary"}
            onClick={() => handleOpenNewTab()}
          >
            Abrir em Nova Guia
          </Button> */}

          <div style={{ visibility: "hidden", position: "absolute" }}>
            <div ref={outputRef}></div>
          </div>
        </Box>

        <Box mt={0.125}>
          <Divider />
        </Box>

        <Box p={2} sx={{ overflow: "hidden", width: "100%", height: "100%" }}>
          <Box sx={{ overflow: "auto", height: "100%" }}>
            <PageAdvancedContentReportTable />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PageAdvancedContentPaneReport;
