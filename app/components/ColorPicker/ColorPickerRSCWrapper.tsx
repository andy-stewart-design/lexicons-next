import ColorPicker from '.';
import type { ColorPickerProps } from './types';

export function ColorPickerRSCWrapper({ primaryColor, secondaryColor }: ColorPickerProps) {
  return <ColorPicker primaryColor={primaryColor} secondaryColor={secondaryColor} />;
}
