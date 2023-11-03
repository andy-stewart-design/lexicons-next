import type { ComponentProps } from 'react';
import classes from './colorpickerpreview.module.css';
import { Copy } from '@/app/icons/20/Copy';

interface ColorPreviewProps extends ComponentProps<'div'> {
  colorValues: Array<number>;
}

export function ColorPickerPreview({ colorValues }: ColorPreviewProps) {
  const [hue, chroma, lightness] = colorValues;
  const currentColor = `oklch(${lightness}% ${chroma} ${hue})`;
  const textColor = lightness > 60 ? 'var(--gray-950)' : 'var(--gray-50)';

  return (
    <div className={classes['preview']} style={{ color: textColor }}>
      <span>
        <p>{currentColor}</p>
        <button onClick={() => navigator.clipboard.writeText(currentColor)}>
          <Copy />
        </button>
      </span>
    </div>
  );
}
