"use client";

import { useId } from "react";
import * as RadPopover from "@radix-ui/react-popover";
import { useSlider } from "@/app/hooks/use-input";
import classes from "./colorpicker.module.css";

export default function ColorPicker() {
  const hueId = useId();
  const [hue, setHue, restHueProps] = useSlider(240, 0, 360, 0.1);

  const chromaId = useId();
  const [chroma, setChroma, restChromaProps] = useSlider(0.5, 0, 0.5, 0.01);

  const lightId = useId();
  const [light, setLight, restLightProps] = useSlider(100, 0, 100, 0.1);

  const backgroundColor = `oklch(${light}% ${chroma} ${hue})`;

  return (
    <div className={classes["color-picker-group"]}>
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
              <div className="h-32" style={{ backgroundColor }} />
              <div className="p-4">
                {/* ----- HUE SLIDER ----- */}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex">
                      <label htmlFor={hueId} className="grow">
                        Hue
                      </label>
                      <span className="tabular-nums">
                        {Number(hue).toFixed(1)}
                      </span>
                    </div>
                    <input
                      id={hueId}
                      type="range"
                      className="block w-full"
                      value={hue}
                      onChange={setHue}
                      {...restHueProps}
                    />
                  </div>
                  {/* ----- CHROMA SLIDER ----- */}
                  <div className="grid gap-2">
                    <div className="flex">
                      <label htmlFor={chromaId} className="grow">
                        Saturation
                      </label>
                      <span className="tabular-nums">
                        {Number(chroma).toFixed(2)}
                      </span>
                    </div>
                    <input
                      id={chromaId}
                      type="range"
                      className="block w-full"
                      value={chroma}
                      onChange={setChroma}
                      {...restChromaProps}
                    />
                  </div>
                  {/* ----- LIGHTNESS SLIDER ----- */}
                  <div className="grid gap-2">
                    <div className="flex">
                      <label htmlFor={lightId} className="grow">
                        Lightness
                      </label>
                      <span className="tabular-nums">
                        {Number(light).toFixed(1)}
                      </span>
                    </div>
                    <input
                      id={lightId}
                      type="range"
                      className="block w-full"
                      value={light}
                      onChange={setLight}
                      {...restLightProps}
                    />
                  </div>
                </div>
              </div>
            </RadPopover.Content>
          </RadPopover.Portal>
        </RadPopover.Root>
        <span>
          <input
            type="number"
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
