import { ComponentProps } from "react";
import classes from "./colorpickerpreview.module.css";
import { Copy } from "@/app/icons/20/Copy";

interface ColorPreviewProps extends ComponentProps<"div"> {
  currentColor: string;
  lightness: number;
}

export function ColorPickerPreview({
  currentColor,
  lightness,
}: ColorPreviewProps) {
  const color = lightness > 60 ? "var(--gray-950)" : "var(--gray-50)";

  return (
    <div
      className={classes["preview"]}
      style={{ backgroundColor: currentColor, color }}
    >
      <span>
        <p>{currentColor}</p>
        <button onClick={() => navigator.clipboard.writeText(currentColor)}>
          <Copy />
        </button>
      </span>
    </div>
  );
}
