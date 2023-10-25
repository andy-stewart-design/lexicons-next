"use client";

import ColorPicker from "@components/ColorPicker";
import RangeSlider from "@components/RangeSlider";
import { useSlider } from "@/app/hooks/use-input";

export default function Play() {
  const [iconSize, setIconSize, restIconSizeProps] = useSlider(5, 0, 10, 0.1);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid gap-8 grow max-w-[320px]">
        <RangeSlider
          value={iconSize}
          onChange={setIconSize}
          label="foo"
          {...restIconSizeProps}
        />
        <ColorPicker />
      </div>
    </div>
  );
}
