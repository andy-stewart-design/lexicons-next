"use client";

import classes from "./iconcard.module.css";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  name: string;
}

export default function IconCard({ children, name }: Props) {
  return (
    <div className={classes["icon-card"]}>
      <button onClick={() => console.log(`You clicked ${name}!`)}>
        {children}
        <p>{name.replaceAll("_", " ")}</p>
      </button>
    </div>
  );
}
