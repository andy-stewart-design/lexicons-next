"use client";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  icon: string;
}

export default function IconCard({ children, icon }: Props) {
  return (
    <div className="grid place-items-center border border-white/20 rounded py-12 px-6">
      <button
        className="grid place-items-center gap-4"
        onClick={() => console.log(`You clicked ${icon}!`)}
      >
        {children}
      </button>
    </div>
  );
}
