import IconCard from "@components/IconCard";
import SVG from "@components/SVG";
import SearchInput from "./components/SearchInput/SearchInput";
import Select from "@components/Select";
import { fetchIcons, countIcons } from "@utils/prisma";

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
    <div style={{ padding: "var(--size-6)", height: "100lvh" }}>
      <div
        style={{
          background: "var(--background)",
          height: "100%",
          borderRadius: "var(--size-3)",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingInline: "4rem",
            paddingBlockStart: "2rem",
          }}
        >
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
        </nav>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            gap: "1rem",
            padding: "4rem",
          }}
        >
          {!style || icons.length === 0 ? (
            <p>No icons found</p>
          ) : (
            icons_alphabetized.map((icon) => (
              <IconCard key={icon.id} name={icon.name}>
                <SVG key={icon.id} variant={style} icon={icon} />
              </IconCard>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

function validateStyle(style: string | Array<string> | undefined) {
  if (!style) return "outline";

  const invalidStyle =
    style !== "outline" && style !== "solid" && style !== "semi-solid";

  if (invalidStyle) return null;

  return style;
}
