"use client";

import ColorPicker from "@components/ColorPicker";
import { useSlider } from "@/app/hooks/use-input";
import RangeSlider from "../components/RangeSlider/RangeSlider";

export default function Play() {
  const hueProps = useSlider(200, 0, 360, 0.1);
  const chromaProps = useSlider(0.4, 0, 0.5, 0.01);
  const lightnessProps = useSlider(85, 0, 100, 0.1);

  const [foo, setFoo, restFooProps] = useSlider(80, 0, 100, 0.1);

  return (
    <div
      style={{
        height: "100lvh",
        padding: "var(--size-6)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: "var(--gray-950)",
          borderRadius: "var(--size-3)",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "var(--size-8)",
            flexGrow: 1,
            maxWidth: "320px",
          }}
        >
          <ColorPicker
            hue={hueProps}
            chroma={chromaProps}
            lightness={lightnessProps}
          />
        </div>
      </div>
    </div>
  );
}
