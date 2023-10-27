"use client";

import ColorPicker from "@components/ColorPicker";
import NumberInput from "@components/NumberInput";
// import RangeSlider from "@components/RangeSlider";
import { useSlider } from "@/app/hooks/use-input";

export default function Play() {
  const hueProps = useSlider(240, 0, 360, 0.1);
  const chromaProps = useSlider(0.5, 0, 0.5, 0.01);
  const lightnessProps = useSlider(100, 0, 100, 0.1);
  //   const [iconSize, setIconSize, restIconSizeProps] = useSlider(5, 0, 10, 0.1);

  const chroma = chromaProps[0] < 0.35 ? chromaProps[0] : 0.35;

  const start = `oklch(${lightnessProps[0]}% ${chroma} ${hueProps[0]})`;
  const end = `oklch(${lightnessProps[0]}% ${chroma} ${hueProps[0] + 75})`;

  const background = `linear-gradient(to bottom right in oklch, ${start} 0%, ${end} 100%)`;

  return (
    <div
      className="h-screen p-6"
      style={{
        background,
      }}
    >
      <div className="flex items-center justify-center h-full bg-gray-950 rounded-xl">
        <div className="grid gap-8 grow max-w-[320px]">
          {/* <RangeSlider
          value={iconSize}
          onChange={setIconSize}
          label="foo"
          {...restIconSizeProps}
        /> */}
          <ColorPicker
            hue={hueProps}
            chroma={chromaProps}
            lightness={lightnessProps}
          />

          <NumberInput className="test" />
          <input type="number" className="test" />
        </div>
      </div>
    </div>
  );
}
