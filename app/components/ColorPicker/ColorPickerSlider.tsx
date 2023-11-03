import { useId, type ComponentProps, CSSProperties } from 'react';
import RangeSlider from '@components/RangeSlider';
import classes from './colorpickerslider.module.css';

interface ColorSliderProps extends ComponentProps<'input'> {
  variant?: 'hue' | 'chroma' | 'lightness';
  numDecimals?: number;
}

export function ColorPickerSlider({
  variant = 'hue',
  children,
  value,
  onChange,
  numDecimals = 1,
  ...delegated
}: ColorSliderProps) {
  const id = useId();

  return (
    <div className={classes['slider-group']}>
      <div className={classes['label-group']}>
        <label htmlFor={id}>{children}</label>
        <span>{Number(value).toFixed(numDecimals)}</span>
      </div>
      <RangeSlider
        {...delegated}
        id={id}
        className={`${classes['slider']} ${classes[variant]}`}
        type="range"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
