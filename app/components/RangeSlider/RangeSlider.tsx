import { map } from "@utils/math";
import type { ComponentProps } from "react";

export default function RangeSlider({
  value,
  min,
  max,
  style,
  ...delegated
}: ComponentProps<"input">) {
  const sliderProgress = map(Number(value), Number(min), Number(max), 0, 100);
  const internalStyle = {
    "--slider-progress": `${sliderProgress}%`,
  };

  return (
    <input
      {...delegated}
      type="range"
      value={value}
      min={min}
      max={max}
      style={{ ...style, ...internalStyle }}
    />
  );
}

// return (
//   <div
//     className={appliedClassname}
//     style={{ ...style, ...internalStyle }}
//     data-disabled={disabled}
//   >
//     {label && <label htmlFor={id}>{label}</label>}
//     <input
//       id={id}
//       type="range"
//       value={value}
//       onChange={onChange}
//       min={min}
//       max={max}
//       step={step}
//       disabled={disabled}
//       {...delegated}
//     />
//     <input
//       type="number"
//       value={value}
//       onChange={onChange}
//       min={min}
//       max={max}
//       step={step}
//       disabled={disabled}
//     />
//   </div>
// );
