"use client";

import { type ComponentProps, useId } from "react";
import * as RadPopover from "@radix-ui/react-popover";
import NumberInput from "@components/NumberInput";
import type { SliderSetupHookReturn } from "@/app/hooks/use-input";
import classes from "./colorpicker.module.css";

interface ColorPickerProps {
  hue: SliderSetupHookReturn;
  chroma: SliderSetupHookReturn;
  lightness: SliderSetupHookReturn;
}

export default function ColorPicker({
  hue: hueProps,
  chroma: chromaProps,
  lightness: lightnessProps,
}: ColorPickerProps) {
  const [hue, setHue, restHueProps] = hueProps;
  const [chroma, setChroma, restChromaProps] = chromaProps;
  const [light, setLight, restLightProps] = lightnessProps;

  const backgroundColor = `oklch(${light}% ${chroma} ${hue})`;

  return (
    <div className={`${classes["color-picker-group"]} test`}>
      <p>Accent Color</p>
      <div className={classes["color-picker"]}>
        <RadPopover.Root>
          <RadPopover.Trigger asChild>
            <button
              className={classes.trigger}
              style={{ backgroundColor }}
              aria-label="Update icon color"
            ></button>
          </RadPopover.Trigger>
          <RadPopover.Portal>
            <RadPopover.Content
              className={classes["drop-down"]}
              sideOffset={8}
              align="start"
            >
              <ColorPreview style={{ backgroundColor }} />
              <div className="p-4">
                <div className="grid gap-4">
                  {/* ----- HUE SLIDER ----- */}
                  <ColorSlider value={hue} onChange={setHue} {...restHueProps}>
                    Hue
                  </ColorSlider>
                  {/* ----- CHROMA SLIDER ----- */}
                  <ColorSlider
                    value={chroma}
                    onChange={setChroma}
                    numDecimals={2}
                    {...restChromaProps}
                  >
                    Saturation
                  </ColorSlider>
                  {/* ----- LIGHTNESS SLIDER ----- */}
                  <ColorSlider
                    value={light}
                    onChange={setLight}
                    {...restLightProps}
                  >
                    Lightness
                  </ColorSlider>
                </div>
              </div>
            </RadPopover.Content>
          </RadPopover.Portal>
        </RadPopover.Root>
        <span>
          {/* <input
            type="number"
            value={hue}
            onChange={setHue}
            {...restHueProps}
            step="10"
          /> */}
          <NumberInput
            value={hue}
            onChange={setHue}
            {...restHueProps}
            step="10"
          />
        </span>
        <span>
          <input
            type="number"
            value={chroma}
            onChange={setChroma}
            {...restChromaProps}
          />
        </span>
        <span>
          <input
            type="number"
            value={light}
            onChange={setLight}
            {...restLightProps}
          />
        </span>
      </div>
    </div>
  );
}

// COLOR PREVIEW -------------------------------------------- //

function ColorPreview({ style }: ComponentProps<"div">) {
  return <div className="h-32" style={style} />;
}

// COLOR SLIDER -------------------------------------------- //

interface ColorSliderProps extends ComponentProps<"input"> {
  numDecimals?: number;
}

function ColorSlider({
  children,
  value,
  onChange,
  numDecimals = 1,
  ...delegated
}: ColorSliderProps) {
  const id = useId();

  return (
    <div className="grid gap-2">
      <div className="flex">
        <label htmlFor={id} className="grow">
          {children}
        </label>
        <span className="tabular-nums">
          {Number(value).toFixed(numDecimals)}
        </span>
      </div>
      <input
        {...delegated}
        id={id}
        type="range"
        className="block w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
