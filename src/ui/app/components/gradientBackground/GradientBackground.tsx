import { useEffect } from "react";
import { Gradient } from "./gradient";

function GradientBackground() {
  useEffect(() => {
    try {
      const gradient = new Gradient();
      // @ts-ignore
      gradient.initGradient("#gradient-canvas");
    } catch {}
  }, []);
  return (
    <canvas
      id="gradient-canvas"
      style={{
        width: "100%",
        height: "100%",
      }}
      data-transition-in
    ></canvas>
  );
}

export default GradientBackground;
