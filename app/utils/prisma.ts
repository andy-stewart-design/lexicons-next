import prisma from "@lib/prisma";

export const revalidate = 60;

export async function fetchIcons(query: string) {
  const icons = await prisma.icon.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          tags: {
            some: {
              name: {
                contains: query,
              },
            },
          },
        },
      ],
    },
    include: {
      tags: true,
    },
  });

  return icons;
}

export async function countIcons(query: string) {
  const icons = await prisma.icon.count({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          tags: {
            some: {
              name: {
                contains: query,
              },
            },
          },
        },
      ],
    },
  });

  return icons;
}
