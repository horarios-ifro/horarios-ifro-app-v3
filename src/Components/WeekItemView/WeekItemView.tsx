import Container from "@mui/material/Container";
import { WeekItemViewDays } from "../WeekItemViewDays/WeekItemViewDays";
import { WeekItemViewDaysContextProvider } from "../WeekItemViewDays/WeekItemViewDaysContext";

const WeekItemView = () => {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          height: "100%",
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
        }}
      >
        <WeekItemViewDaysContextProvider>
          <WeekItemViewDays />
        </WeekItemViewDaysContextProvider>
      </Container>
    </>
  );
};

export default WeekItemView;
