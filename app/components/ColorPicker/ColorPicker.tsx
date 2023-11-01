"use client";

import { useEffect, type CSSProperties } from "react";
import { Root } from "@radix-ui/react-popover";
import {
  ColorPickerDropDown,
  ColorPickerPreview,
  ColorPickerSlider,
  ColorPickerTrigger,
} from ".";
import NumberInput from "@components/NumberInput";
import type { SliderSetupHookReturn } from "@/app/hooks/use-input";
import type { ColorValue } from "./types";
import classes from "./colorpicker.module.css";

interface ColorPickerProps {
  hue: SliderSetupHookReturn;
  chroma: SliderSetupHookReturn;
  lightness: SliderSetupHookReturn;
}

export default function ColorPicker({
  hue,
  chroma,
  lightness,
}: ColorPickerProps) {
  const sliderProps = formatColorValue(hue, chroma, lightness);

  const backgroundOKLCH = `${lightness[0]}% ${chroma[0]} ${hue[0]}`;
  const backgroundColor = `oklch(${backgroundOKLCH})`;

  // useEffect prevents document error on initial render
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent-color-oklch",
      backgroundOKLCH
    );

    const analogousChroma = chroma[0] < 0.3 ? chroma[0] : 0.3;
    const analogousLightness = lightness[0] < 50 ? lightness[0] : 50;

    const analogousOKLCH = `${analogousLightness}% ${analogousChroma} ${
      hue[0] + 60
    }`;

    document.documentElement.style.setProperty(
      "--analogous-color-oklch",
      analogousOKLCH
    );
  }, [backgroundOKLCH, lightness, chroma, hue]);

  return (
    <div className={`${classes["color-picker-group"]} test`}>
      <p>Accent Color</p>
      <div className={classes["color-picker"]}>
        <Root>
          <ColorPickerTrigger backgroundColor={backgroundColor} />
          <ColorPickerDropDown>
            <div
              style={
                {
                  "--accent-color": backgroundColor,
                  "--hue": hue[0],
                  "--lightness": `${lightness[0]}%`,
                  display: "grid",
                  gap: "var(--size-3)",
                  padding: "var(--size-4)",
                } as CSSProperties
              }
            >
              {sliderProps.map((slider) => (
                <ColorPickerSlider
                  key={slider.label}
                  variant={slider.label}
                  value={slider.value}
                  onChange={slider.onChange}
                  numDecimals={2}
                  {...slider.delegated}
                >
                  {slider.label}
                </ColorPickerSlider>
              ))}
            </div>
            <ColorPickerPreview
              currentColor={backgroundColor}
              lightness={lightness[0]}
            />
          </ColorPickerDropDown>
        </Root>

        {sliderProps.map((slider) => (
          <span key={slider.label}>
            <NumberInput
              value={slider.value}
              onChange={slider.onChange}
              {...slider.delegated}
              step={slider.step}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function formatColorValue(
  hue: SliderSetupHookReturn,
  chroma: SliderSetupHookReturn,
  lightness: SliderSetupHookReturn
) {
  const labels: Array<ColorValue> = ["hue", "chroma", "lightness"];
  const numDecimals = [1, 2, 1];
  const steps = [10, 0.01, 1];
  const props = [hue, chroma, lightness];

  return props.map((prop, index) => {
    return {
      value: prop[0],
      onChange: prop[1],
      delegated: prop[2],
      label: labels[index],
      numDecimals: numDecimals[index],
      step: steps[index],
    };
  });
}
