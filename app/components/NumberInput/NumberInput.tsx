import { ComponentProps } from "react";

export default function NumberInput({ ...delegated }: ComponentProps<"input">) {
  return <input type="number" {...delegated} />;
}
