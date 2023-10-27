import IconCard from "@components/IconCard";
import SVG from "@components/SVG";
import SearchInput from "./components/SearchInput/SearchInput";
import { fetchIcons, countIcons } from "@utils/prisma";
import Select from "@components/Select";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const iconStyles = [
  {
    value: "outline",
    label: "Outline",
  },
  {
    value: "solid",
    label: "Solid",
  },
  {
    value: "semi-solid",
    label: "Two-tone",
  },
];

export default async function Home({ searchParams }: PageProps) {
  const query =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const iconRes = fetchIcons(query);
  const countRes = countIcons(query);
  const [icons, iconCount] = await Promise.all([iconRes, countRes]);

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
      <nav className="flex items-center gap-4 px-16 pt-8">
        <Select
          options={iconStyles}
          defaultValue={style ?? ""}
          currentSearchParams={currentSearchParams}
        />
        <SearchInput
          currentSearchParams={currentSearchParams}
          defaultValue={query}
          style={{ flexGrow: 1 }}
        />
        <div className="text-[11px] leading-snug tracking-wide">
          <div className="opacity-60">Showing</div>
          <span className="text-[13px] slashed-zero tabular-nums">
            0{iconCount} icons
          </span>
        </div>
      </nav>
      <section className="grid grid-cols-6 gap-4 p-16">
        {!style || icons.length === 0 ? (
          <p>No icons found</p>
        ) : (
          icons_alphabetized.map((icon) => (
            <IconCard key={icon.id} name={icon.name}>
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

function validateStyle(style: string | Array<string> | undefined) {
  if (!style) return "outline";

  const invalidStyle =
    style !== "outline" && style !== "solid" && style !== "semi-solid";

  if (invalidStyle) return null;

  return style;
}
