'use client';

import { useEffect } from 'react';
import { Root } from '@radix-ui/react-popover';
import { ColorPickerDropDown, ColorPickerPreview, ColorPickerSlider, ColorPickerTrigger } from '.';
import NumberInput from '@components/NumberInput';
import { useSlider, type SliderSetupHookReturn } from '@/app/hooks/use-input';
import type { ColorPickerProps, ColorValue } from './types';
import classes from './colorpicker.module.css';
import VisiblyHidden from '../VisiblyHidden';

export default function ColorPicker({ primaryColor, secondaryColor }: ColorPickerProps) {
  const [hue, setHue, restHueProps] = useSlider(200, 0, 360, 0.1);
  const [chroma, setChroma, restChromaProps] = useSlider(0.4, 0, 0.5, 0.01);
  const [lightness, setLightness, restLightnessProps] = useSlider(85, 0, 100, 0.1);

  const sliderProps = formatColorValues(
    [hue, setHue, restHueProps],
    [chroma, setChroma, restChromaProps],
    [lightness, setLightness, restLightnessProps]
  );

  useEffect(() => {
    const backgroundOKLCH = `${lightness}% ${chroma} ${hue}`;
    const analogousChroma = chroma < 0.3 ? chroma : 0.3;
    const analogousLightness = lightness < 50 ? lightness : 50;
    const analogousOKLCH = `${analogousLightness}% ${analogousChroma} ${hue + 60}`;

    const root = document.documentElement.style;
    root.setProperty(primaryColor, backgroundOKLCH);
    root.setProperty(secondaryColor, analogousOKLCH);
    root.setProperty('--hue', String(hue));
    root.setProperty('--lightness', `${lightness}%`);
  }, [lightness, chroma, hue, primaryColor, secondaryColor]);

  return (
    <div className={`${classes['color-picker-group']}`}>
      <p aria-hidden className="label">
        Accent Color
      </p>
      <div className={classes['color-picker']}>
        <Root>
          <ColorPickerTrigger />
          <ColorPickerDropDown>
            <div className={classes['slider-container']}>
              {sliderProps.map((slider) => (
                <ColorPickerSlider
                  {...slider.delegated}
                  key={slider.label}
                  variant={slider.label}
                  value={slider.value}
                  onChange={slider.onChange}
                  numDecimals={slider.numDecimals}
                >
                  {slider.label}
                </ColorPickerSlider>
              ))}
            </div>
            <ColorPickerPreview colorValues={[hue, chroma, lightness]} />
          </ColorPickerDropDown>
        </Root>

        {sliderProps.map((slider) => (
          <span key={slider.label}>
            <VisiblyHidden>
              <label>{slider.label}</label>
            </VisiblyHidden>
            <NumberInput
              {...slider.delegated}
              value={slider.value}
              onChange={slider.onChange}
              step={slider.step}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function formatColorValues(
  hue: SliderSetupHookReturn,
  chroma: SliderSetupHookReturn,
  lightness: SliderSetupHookReturn
) {
  const labels: Array<ColorValue> = ['hue', 'chroma', 'lightness'];
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
