import prisma from "@lib/prisma";
import { cache } from "react";

export const revalidate = 60;

export const fetchIcons = cache(async (query: string) => {
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
});

export const countIcons = cache(async (query: string) => {
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
});
