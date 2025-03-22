"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 403 };

    const userExists = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workSpace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (userExists)
      return {
        status: 200,
        user: userExists,
      };

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workSpace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workSpace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser)
      return {
        status: 201,
        user: newUser,
      };

    return { status: 400 };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const notifications = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length > 0)
      return {
        status: 200,
        data: notifications,
      };

    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    return {
      status: 400,
      data: [],
      error,
    };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const users = await client.user.findMany({
      where: {
        OR: [
          {
            firstname: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            lastname: {
              contains: query,
            },
          },
        ],
        NOT: [
          {
            clerkid: user.id,
          },
        ],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length > 0)
      return {
        status: 200,
        data: users,
      };

    return {
      status: 404,
      data: undefined,
    };
  } catch (error) {
    return {
      status: 500,
      data: undefined,
      error,
    };
  }
};
