import { ComponentProps } from 'react';
import classes from './visiblyhidden.module.css';

export default function VisiblyHidden({ children }: ComponentProps<'div'>) {
  return <div className={classes['sr-only']}>{children}</div>;
}
