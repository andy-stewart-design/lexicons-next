import prisma from "./lib/prisma";

export default async function Home() {
  const icons = await prisma.icon.findMany({
    include: {
      tags: true,
    },
  });

  return (
    <section className="grid grid-cols-6 gap-4 p-16">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="grid place-items-center gap-4 border border-white/20 rounded py-12 px-6"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {icon.path_solid && (
              <path
                width="48"
                height="48"
                d={icon.path_solid}
                fill="currentColor"
                opacity="0.4"
              />
            )}
            {icon.path_trans && (
              <path
                width="48"
                height="48"
                d={icon.path_trans}
                fill="currentColor"
                opacity="0.4"
              />
            )}
            {icon.path_outline && (
              <path
                width="48"
                height="48"
                d={icon.path_outline}
                fill="currentColor"
              />
            )}
          </svg>
          <p className="text-xs">{icon.name.replaceAll("_", " ")}</p>
        </div>
      ))}
    </section>
  );
}
