export const generateSVGBlob = (svgData: string) =>
  new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
