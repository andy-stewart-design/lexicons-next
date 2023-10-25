import { useState, useCallback, useMemo } from "react";
import type { ChangeEvent } from "react";

// ------------------------------------------------------
// Input: Slider ----------------------------------------
// ------------------------------------------------------

type SliderChangeEvent = (event: ChangeEvent<HTMLInputElement>) => void;

interface DelegatedSlideProps {
  //   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
}

type SliderSetupHook = (
  defaultValue: number,
  min: number,
  max: number,
  step: number
) => [number, SliderChangeEvent, DelegatedSlideProps];

export const useSlider: SliderSetupHook = (
  defaultValue = 5,
  min = 0,
  max = defaultValue * 2,
  step = 0.1
) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>) {
      const { target } = event;

      if (!target) return;
      const newValueNumber = Number((target as HTMLInputElement).value);

      if (newValueNumber >= max) setValue(max);
      else if (newValueNumber <= min) setValue(min);
      else setValue(newValueNumber);
    },
    [min, max]
  );

  const delegatedProps = useMemo(() => {
    return { min, max, step };
  }, [min, max, step]);

  return [value, onChange, delegatedProps];
};
