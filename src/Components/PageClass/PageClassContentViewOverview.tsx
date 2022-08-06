import ReportTable from "../ReportTable/ReportTable";
import { IReportTableData } from "../ReportTable/interfaces/IReportTableData";
import {
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useContextSelector } from "use-context-selector";
import { PageClassContext } from "./PageClassContext";
import { getReportTableDataDaysFromWeek } from "../PageAdvanced/utils/getReportTableDataDaysFromWeek";
import { getReportTableDataColumnFromWeekClass } from "../PageAdvanced/utils/getReportTableDataColumnFromWeekTeacher";
import Box from "@mui/material/Box";
import { createRoot } from "react-dom/client";
import { getSVGDataForTable } from "../PageAdvanced/utils/getSVGDataForTable";
import { DEFAULT_TARGET_SCALE } from "../PageAdvanced/utils/DEFAULT_TARGET_SCALE";

export const PageClassContentViewOverview = () => {
  const [imgURL, setImgURL] = useState("");

  const tableElRef = useRef<HTMLTableElement>(null);
  const tableStyleElRef = useRef<HTMLStyleElement>(null);
  const outputElRef = useRef<HTMLDivElement>(null);

  const weekClass = useContextSelector(
    PageClassContext,
    ({ weekClassQuery }) => weekClassQuery.data
  );

  const reportTableData = useMemo((): IReportTableData => {
    if (!weekClass) {
      return {
        days: [],
        columns: [],
      };
    }

    return {
      days: getReportTableDataDaysFromWeek(weekClass.week),
      columns: [getReportTableDataColumnFromWeekClass(weekClass)],
    };
  }, [weekClass]);

  const generateImageBlob = useCallback(async () => {
    const outputEl = outputElRef.current!;

    if (!outputEl) {
      return null;
    }

    const rootEl = document.createElement("div");
    outputEl.appendChild(rootEl);

    const root = createRoot(rootEl);

    await new Promise<string>((resolve) => {
      root.render(
        <>
          {createElement(() => {
            useLayoutEffect(() => {
              resolve(outputEl.innerHTML);
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

    const svgURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgData
    )}`;

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

    outputEl.removeChild(rootEl);

    return finalImgBlob;
  }, [reportTableData, outputElRef]);

  const handleGenerateImgURL = useCallback(async () => {
    const imgBlob = await generateImageBlob();

    if (imgBlob) {
      const imgURL = URL.createObjectURL(imgBlob);

      setImgURL((curr) => {
        URL.revokeObjectURL(curr);
        return imgURL;
      });
    }
  }, [generateImageBlob]);

  useEffect(() => {
    handleGenerateImgURL().then(() => {});
  }, [handleGenerateImgURL]);

  return (
    <>
      <Box sx={{ py: 2, height: "100%", width: "100%", overflow: "auto" }}>
        <img
          alt={"Resumo da Semana"}
          style={{ width: "100%", objectFit: "contain" }}
          src={imgURL}
        />

        <Box sx={{ visibility: "hidden", position: "absolute" }}>
          <Box ref={outputElRef} />
        </Box>
      </Box>
    </>
  );
};
