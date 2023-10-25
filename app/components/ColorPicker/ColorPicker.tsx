"use client";

import { useId } from "react";
import * as RadPopover from "@radix-ui/react-popover";
import { useSlider } from "@/app/hooks/use-input";
import classes from "./colorpicker.module.css";
// import { Close } from "@icons/24";

export default function ColorPicker() {
  const hueId = useId();
  const [hue, setHue, restHueProps] = useSlider(240, 0, 360, 0.1);

  const chromaId = useId();
  const [chroma, setChroma, restChromaProps] = useSlider(0.5, 0, 0.5, 0.01);

  const lightId = useId();
  const [light, setLight, restLightProps] = useSlider(100, 0, 100, 0.1);

  const backgroundColor = `oklch(${light}% ${chroma} ${hue})`;

  return (
    <RadPopover.Root>
      <RadPopover.Trigger asChild>
        <span className={classes.test}>
          <button
            className="rounded-full w-12 h-12"
            style={{ backgroundColor }}
            aria-label="Update icon color"
          ></button>
        </span>
      </RadPopover.Trigger>
      <RadPopover.Portal>
        <RadPopover.Content
          className="rounded w-[280px] bg-gray-800 text-gray-50 overflow-hidden data-[state=open]:animate-slideUpAndFade"
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
                  <span className="tabular-nums">{Number(hue).toFixed(1)}</span>
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
                    Chroma
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
          {/* <RadPopover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center absolute top-[5px] right-[5px]"
            aria-label="Close"
          >
            <Close />
          </RadPopover.Close> */}
          {/* <RadPopover.Arrow className="fill-gray-800" /> */}
        </RadPopover.Content>
      </RadPopover.Portal>
    </RadPopover.Root>
  );
}
