import { Trigger } from "@radix-ui/react-popover";
import classes from "./colorpickertrigger.module.css";

interface TriggerProps {
  backgroundColor: string;
}

export function ColorPickerTrigger({ backgroundColor }: TriggerProps) {
  return (
    <Trigger asChild>
      <button
        className={classes["trigger"]}
        style={{ backgroundColor }}
        aria-label="Update icon color"
      ></button>
    </Trigger>
  );
}
