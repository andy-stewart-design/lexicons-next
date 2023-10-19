"use client";

import debounce from "just-debounce-it";
import { useRouter } from "next/navigation";
import type { ComponentProps, ChangeEvent } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props extends ComponentProps<"input"> {
  currentSearchParams: URLSearchParams;
}

export default function TestInput({ currentSearchParams }: Props) {
  const router = useRouter();

  function handleSubmit(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    const newSearchParams = new URLSearchParams(currentSearchParams);

    if (query !== "") newSearchParams.set("search", query);
    else newSearchParams.delete("search");

    debouncedSubmit(newSearchParams.toString(), router);
  }

  return (
    <>
      <input
        type="text"
        onChange={handleSubmit}
        placeholder="Search icons"
        className="bg-transparent border border-white/20"
      />
    </>
  );
}

const debouncedSubmit = debounce((query: string, router: AppRouterInstance) => {
  router.push(`/?${query}`);
}, 300);
