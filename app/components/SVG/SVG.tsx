import type { ComponentProps } from "react";

interface Tag {
  id: number;
  name: string;
}

interface Icon {
  id: number;
  name: string;
  path_outline: string | null;
  path_trans: string | null;
  path_solid: string | null;
  tags: Array<Tag>;
}

interface Props extends ComponentProps<"svg"> {
  icon: Icon;
  variant: string;
}

export default function SVG({ icon, variant }: Props) {
  const showOutline = variant === "semi-solid" || variant === "outline";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "solid" && icon.path_solid && (
        <path d={icon.path_solid} fill="currentColor" />
      )}
      {variant === "semi-solid" && icon.path_trans && (
        <path d={icon.path_trans} fill="currentColor" opacity="0.4" />
      )}
      {showOutline && icon.path_outline && (
        <path
          d={icon.path_outline}
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
}
