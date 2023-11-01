import { Portal, Content } from "@radix-ui/react-popover";
import { ComponentProps } from "react";
import classes from "./colorpickerdropdown.module.css";

export function ColorPickerDropDown({ children }: ComponentProps<"div">) {
  return (
    <Portal>
      <Content className={classes["drop-down"]} sideOffset={8} align="start">
        {children}
      </Content>
    </Portal>
  );
}
