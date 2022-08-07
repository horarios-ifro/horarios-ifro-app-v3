import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Loading from "../Loading/Loading";
import { PageItemReportContext } from "./PageItemReportContext";
import { useContextSelector } from "use-context-selector";

export const PageItemReportDialogContentClosedView = () => {
  const handleClose = useContextSelector(
    PageItemReportContext,
    ({ handleClose }) => handleClose
  );

  return (
    <>
      <DialogContent sx={{ overflow: "hidden" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Loading />
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={handleClose}>Concluído</Button>
      </DialogActions>
    </>
  );
};
