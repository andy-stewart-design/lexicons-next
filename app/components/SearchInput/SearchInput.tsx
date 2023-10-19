"use client";

import debounce from "just-debounce-it";
import { useRouter } from "next/navigation";
import type { ComponentProps, ChangeEvent } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props extends ComponentProps<"input"> {
  currentSearchParams: URLSearchParams;
  defaultValue: string;
}

export default function SearchInput({
  currentSearchParams,
  defaultValue,
}: Props) {
  const router = useRouter();

  function handleSubmit(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    const newSearchParams = new URLSearchParams(currentSearchParams);

    if (query !== "") newSearchParams.set("search", query);
    else newSearchParams.delete("search");

    debouncedSubmit(newSearchParams, router);
  }

  return (
    <>
      <input
        type="text"
        onChange={handleSubmit}
        defaultValue={defaultValue}
        placeholder="Search icons"
        className="bg-transparent border border-white/20"
      />
    </>
  );
}

const debouncedSubmit = debounce(
  (query: URLSearchParams, router: AppRouterInstance) => {
    router.push(`/?${query}`);
  },
  300
);
