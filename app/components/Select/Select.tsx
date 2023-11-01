"use client";

import { ChevronDown } from "@icons/16";
import { useRouter } from "next/navigation";
import * as RadSelect from "@radix-ui/react-select";
import {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useState,
} from "react";
import classes from "./select.module.css";

interface Props extends ComponentProps<"select"> {
  options: {
    value: string;
    label: string;
  }[];
  currentSearchParams: URLSearchParams;
  defaultValue: string;
}

export default function Select({
  options,
  currentSearchParams,
  defaultValue,
}: Props) {
  const [value, setValue] = useState("outline");
  const router = useRouter();

  function handleChange(value: string) {
    setValue(value);

    const newSearchParams = new URLSearchParams(currentSearchParams);
    if (value === options[0].value) newSearchParams.delete("style");
    else newSearchParams.set("style", value);

    router.push(`/?${newSearchParams}`);
  }

  return (
    <RadSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleChange}
    >
      <RadSelect.Trigger className={classes["base-select"]} aria-label="Food">
        <RadSelect.Value placeholder="Select a style">
          {defaultValue}
        </RadSelect.Value>
        <RadSelect.Icon>
          <ChevronDown />
        </RadSelect.Icon>
      </RadSelect.Trigger>
      <RadSelect.Portal>
        <RadSelect.Content className={classes["base-select-content"]}>
          <RadSelect.Viewport>
            <RadSelect.Group>
              {options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </RadSelect.Group>
          </RadSelect.Viewport>
        </RadSelect.Content>
      </RadSelect.Portal>
    </RadSelect.Root>
  );
}

const SelectItem: ForwardRefExoticComponent<
  RadSelect.SelectItemProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, className, ...props }, forwardRef) => {
  return (
    <RadSelect.Item
      className={classes["base-select-item"]}
      {...props}
      ref={forwardRef}
    >
      <RadSelect.ItemText>{children}</RadSelect.ItemText>
    </RadSelect.Item>
  );
});

SelectItem.displayName = "SelectItem";
