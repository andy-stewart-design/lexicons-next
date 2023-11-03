import { Trigger } from '@radix-ui/react-popover';
import classes from './colorpickertrigger.module.css';
import VisiblyHidden from '@components/VisiblyHidden';

export function ColorPickerTrigger() {
  return (
    <Trigger asChild>
      <button className={classes['trigger']} aria-label="Update icon color">
        <VisiblyHidden>Update Accent Color</VisiblyHidden>
      </button>
    </Trigger>
  );
}
