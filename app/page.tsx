import IconCard from "@components/IconCard";
import SVG from "@components/SVG";
import Link from "next/link";
import SearchInput from "./components/SearchInput/SearchInput";
import { ComponentProps } from "react";
import { fetchIcons, countIcons } from "@utils/prisma";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const query =
    typeof searchParams.search === "string" ? searchParams.search : "";

  // const icons = await fetchIcons(query);
  // const iconCount = await countIcons(query);

  const iconRes = fetchIcons(query);
  const countRes = countIcons(query);
  const [icons, iconCount] = await Promise.all([iconRes, countRes]);

  // console.log(foo);

  const icons_alphabetized = icons.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  const style = validateStyle(searchParams.style);

  const currentSearchParams = new URLSearchParams();
  if (query) currentSearchParams.set("search", query);
  if (style) currentSearchParams.set("style", style);

  return (
    <>
      <nav className="flex gap-4 px-16 pt-8">
        <StyleToggle
          variant="outline"
          currentSearchParams={currentSearchParams}
        >
          Outline
        </StyleToggle>
        <StyleToggle
          variant="semi-solid"
          currentSearchParams={currentSearchParams}
        >
          Two-tone
        </StyleToggle>
        <StyleToggle variant="solid" currentSearchParams={currentSearchParams}>
          Solid
        </StyleToggle>
        <SearchInput currentSearchParams={currentSearchParams} />
        <span>{iconCount} icons</span>
      </nav>
      <section className="grid grid-cols-6 gap-4 p-16">
        {!style ? (
          <p>No icons found</p>
        ) : (
          icons_alphabetized.map((icon) => (
            <IconCard key={icon.id} icon={icon.name}>
              <SVG key={icon.id} variant={style} icon={icon} />
              <p className="capitalize text-xs">
                {icon.name.replaceAll("_", " ")}
              </p>
            </IconCard>
          ))
        )}
      </section>
    </>
  );
}

interface StyleLink extends ComponentProps<"a"> {
  variant: string;
  currentSearchParams: URLSearchParams;
}

function StyleToggle({ variant, currentSearchParams, children }: StyleLink) {
  const newSearchParams = new URLSearchParams(currentSearchParams);
  newSearchParams.set("style", variant);

  return <Link href={`/?${newSearchParams}`}>{children}</Link>;
}

function validateStyle(style: string | Array<string> | undefined) {
  if (!style) return "outline";

  const invalidStyle =
    style !== "outline" && style !== "solid" && style !== "semi-solid";

  if (invalidStyle) return null;

  return style;
}
