import { useId } from "react";
import { map } from "@utils/math";
import type { ComponentProps } from "react";
import classes from "./rangeslider.module.css";

type SliderProps = ComponentProps<"input"> & {
  label: string;
};

export default function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  className = "",
  disabled,
  style,
  ...delegated
}: SliderProps) {
  const id = useId();
  const appliedClassname = `${classes["slider-group"]} ${className}`;

  const sliderProgress = map(Number(value), Number(min), Number(max), 0, 100);
  const internalStyle = {
    "--slider-progress": `${sliderProgress}%`,
  };

  return (
    <div
      className={appliedClassname}
      style={{ ...style, ...internalStyle }}
      data-disabled={disabled}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        {...delegated}
      />
      <input
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
    </div>
  );
}
