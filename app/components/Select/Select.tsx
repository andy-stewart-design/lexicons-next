"use client";

import { ChevronDown, Check } from "@icons/16";
import { useRouter } from "next/navigation";
import * as RadSelect from "@radix-ui/react-select";
import {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useState,
} from "react";

// const options = [
//   {
//     value: "outline",
//     label: "Outline",
//   },
//   {
//     value: "solid",
//     label: "Solid",
//   },
//   {
//     value: "semi-solid",
//     label: "Two-tone",
//   },
// ];

interface Props extends ComponentProps<"select"> {
  options: {
    value: string;
    label: string;
  }[];
  currentSearchParams: URLSearchParams;
}

export default function Select({ options, currentSearchParams }: Props) {
  const [value, setValue] = useState("outline");
  const router = useRouter();

  function handleChange(value: string) {
    setValue(value);

    console.log(value === options[0].value);

    const newSearchParams = new URLSearchParams(currentSearchParams);
    if (value === options[0].value) newSearchParams.delete("style");
    else newSearchParams.set("style", value);

    router.push(`/?${newSearchParams}`);
  }

  return (
    <RadSelect.Root value={value} onValueChange={handleChange}>
      <RadSelect.Trigger
        className="flex items-center justify-between rounded px-3 py-2 text-sm leading-none gap-1 bg-white text-black shadow-[0_2px_10px] shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none min-w-[160px]"
        aria-label="Food"
      >
        <RadSelect.Value placeholder="Select a style" />
        <RadSelect.Icon className="text-black">
          <ChevronDown />
        </RadSelect.Icon>
      </RadSelect.Trigger>
      <RadSelect.Portal>
        <RadSelect.Content className="overflow-hidden bg-white rounded-md w-full shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <RadSelect.Viewport className="p-1">
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
      className="text-sm leading-none text-black rounded-[3px] flex items-center px-3 py-2.5 relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-black data-[highlighted]:text-white"
      {...props}
      ref={forwardRef}
    >
      <RadSelect.ItemText>{children}</RadSelect.ItemText>
      {/* <RadSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <Check />
      </RadSelect.ItemIndicator> */}
    </RadSelect.Item>
  );
});

SelectItem.displayName = "SelectItem";
