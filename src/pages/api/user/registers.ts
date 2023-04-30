import { PrismaClient, Style } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerUser(clerkId: string, email: string) {
  const existingUser = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId,
        email,
      },
    });
  }
}

// export async function addStyle(clerkId: string, style: Style) {
//   await prisma.user.update({
//     where: { clerkId },
//     data: {
//       styles: {
//         push: style,
//       },
//     },
//   });
// }
