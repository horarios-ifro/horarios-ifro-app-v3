import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import throttle from "lodash/throttle";
import AppContainer from "../AppContainer/AppContainer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import { useContextSelector } from "use-context-selector";
import { PageClassesContext } from "./PageClassesContext";
import * as classes from "./PageClasses.module.css";

const PageClassesContent = () => {
  const selectedCourse = useContextSelector(
    PageClassesContext,
    ({ selectedCourse }) => selectedCourse
  );
  const setSelectedCourse = useContextSelector(
    PageClassesContext,
    ({ setSelectedCourse }) => setSelectedCourse
  );
  const selectedPeriod = useContextSelector(
    PageClassesContext,
    ({ selectedPeriod }) => selectedPeriod
  );
  const setSelectedPeriod = useContextSelector(
    PageClassesContext,
    ({ setSelectedPeriod }) => setSelectedPeriod
  );
  const selectedLabel = useContextSelector(
    PageClassesContext,
    ({ selectedLabel }) => selectedLabel
  );
  const setSelectedLabel = useContextSelector(
    PageClassesContext,
    ({ setSelectedLabel }) => setSelectedLabel
  );

  const availableCourses = useContextSelector(
    PageClassesContext,
    ({ availableCourses }) => availableCourses
  );
  const availablePeriods = useContextSelector(
    PageClassesContext,
    ({ availablePeriods }) => availablePeriods
  );
  const availableLabels = useContextSelector(
    PageClassesContext,
    ({ availableLabels }) => availableLabels
  );

  const containerElRef = useRef<HTMLDivElement | null>(null);
  const containerWrapperElRef = useRef<HTMLDivElement | null>(null);
  const stepCourseElRef = useRef<HTMLDivElement | null>(null);
  const stepPeriodElRef = useRef<HTMLDivElement | null>(null);
  const stepLabelElRef = useRef<HTMLDivElement | null>(null);

  const syncPaddings = useCallback(() => {
    const containerEl = containerElRef.current;
    const containerWrapperEl = containerWrapperElRef.current;

    if (containerEl && containerWrapperEl) {
      const children = Array.from(containerEl.children);

      const { height: containerHeight } =
        containerWrapperEl.getBoundingClientRect();

      for (const key in children) {
        const idx = +key;

        const element = children[key] as HTMLElement;

        let targetOffsetTop = "0px";
        let targetPaddingBottom = "0px";

        const { height: elementHeight } = element.getBoundingClientRect();

        const paddingFactor = Math.max(
          containerHeight / 2 - elementHeight / 2,
          2 * 16
        );

        if (idx === 0) {
          targetOffsetTop = `${paddingFactor}px`;
        } else if (idx === children.length - 1) {
          targetPaddingBottom = `${paddingFactor}px`;
        }

        element.style.marginTop = targetOffsetTop;
        element.style.marginBottom = targetPaddingBottom;
      }
    }
  }, [containerElRef, containerWrapperElRef]);

  useLayoutEffect(() => {
    syncPaddings();

    const stepCourseEl = stepCourseElRef.current;
    const containerWrapperEl = containerWrapperElRef.current;

    if (stepCourseEl && containerWrapperEl) {
      stepCourseEl.scrollIntoView({
        behavior: "smooth",
        block:
          containerWrapperEl.clientHeight > stepCourseEl.clientHeight
            ? "center"
            : "start",
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = throttle(() => syncPaddings(), 80);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [syncPaddings]);

  const updateSelectedCourse = (id: string) => {
    setSelectedLabel(null);
    setSelectedPeriod(null);
    setSelectedCourse(id);

    const stepPeriodEl = stepPeriodElRef.current;
    const containerWrapperEl = containerWrapperElRef.current;

    if (stepPeriodEl && containerWrapperEl) {
      stepPeriodEl.scrollIntoView({
        behavior: "smooth",
        block:
          containerWrapperEl.clientHeight > stepPeriodEl.clientHeight
            ? "center"
            : "start",
      });
    }
  };

  const updateSelectedPeriod = (id: string) => {
    setSelectedLabel(null);
    setSelectedPeriod(id);

    const stepLabelEl = stepLabelElRef.current;
    const containerWrapperEl = containerWrapperElRef.current;

    if (stepLabelEl && containerWrapperEl) {
      stepLabelEl.scrollIntoView({
        behavior: "smooth",
        block:
          containerWrapperEl.clientHeight > stepLabelEl.clientHeight
            ? "center"
            : "start",
      });
    }
  };

  const updateSelectedLabel = (id: string) => {
    setSelectedLabel(id);
  };

  return (
    <>
      <AppContainer>
        <Box
          ref={containerWrapperElRef}
          sx={{ height: "100%", overflow: "hidden" }}
        >
          <Box sx={{ height: "100%", overflow: "auto" }} ref={containerElRef}>
            <Box>
              <Box ref={stepCourseElRef}>
                <Typography variant="h4" sx={{ mb: 3, pt: 2 }}>
                  Curso
                </Typography>
                <Box
                  className={classes.courseContainer}
                  sx={{
                    gap: 1,
                    display: "grid",
                    gridTemplateRows: "repeat(1, auto)",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    ["--items"]: String(availableCourses.length),
                  }}
                >
                  {availableCourses.map((course) => (
                    <Fragment key={course.id}>
                      <Button
                        disableRipple
                        variant="outlined"
                        sx={{ width: "100%", position: "relative", py: 4 }}
                        onClick={() => updateSelectedCourse(course.id)}
                      >
                        <Radio
                          disableRipple
                          checked={selectedCourse === course.id}
                        />
                        <Typography>{course.label}</Typography>
                      </Button>
                    </Fragment>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                ...(selectedCourse
                  ? {}
                  : { opacity: 0.2, pointerEvents: "none" }),
              }}
            >
              <Box my={6} />

              <Box ref={stepPeriodElRef}>
                <Typography variant="h4" sx={{ mb: 3, pt: 2 }}>
                  Ano
                </Typography>
                <Box
                  className={classes.periodContainer}
                  sx={{
                    gap: 1,
                    display: "grid",
                    gridTemplateRows: "repeat(1, auto)",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    ["--items"]: String(availablePeriods.length),
                  }}
                >
                  {availablePeriods.map((course) => (
                    <Fragment key={course.id}>
                      <Button
                        disableRipple
                        variant="outlined"
                        sx={{ width: "100%", py: 4 }}
                        onClick={() => updateSelectedPeriod(course.id)}
                      >
                        <Radio
                          disableRipple
                          checked={selectedPeriod === course.id}
                        />
                        <Typography>{course.label}</Typography>
                      </Button>
                    </Fragment>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                ...(selectedPeriod
                  ? {}
                  : { opacity: 0.2, pointerEvents: "none" }),
              }}
            >
              <Box my={8} />

              <Box ref={stepLabelElRef}>
                <Typography variant="h4" sx={{ mb: 3, pt: 2 }}>
                  Turma
                </Typography>
                <Box
                  className={classes.labelContainer}
                  sx={{
                    gap: 1,
                    display: "grid",
                    gridTemplateRows: "repeat(1, auto)",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    ["--items"]: String(availableLabels.length),
                  }}
                >
                  {availableLabels.map((course) => (
                    <Fragment key={course.id}>
                      <Button
                        disableRipple
                        variant="outlined"
                        sx={{ width: "100%", py: 4 }}
                        onClick={() => updateSelectedLabel(course.id)}
                      >
                        <Radio
                          disableRipple
                          checked={selectedLabel === course.id}
                        />
                        <Typography>{course.label}</Typography>
                      </Button>
                    </Fragment>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppContainer>
    </>
  );
};

export default PageClassesContent;
