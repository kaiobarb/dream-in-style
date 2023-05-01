import { PrismaClient, Style, User } from '@prisma/client';
const prisma = new PrismaClient();

// User-related functions
export async function createUser(clerkId: string , email: string) {
  return await prisma.user.create({
    data: {
      clerkId,
      email,
    },
  });
}

export async function registerUser(clerkId: string, email: string) {
  console.log('CLERK ID', clerkId)
  const existingUser = await prisma.user.findUnique({
    where: { clerkId }
  });

  if (!existingUser) {
    await createUser(clerkId, email);
  }
}

export async function updateUser(id: number, data: User) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function getUser(clerkId: string) {
  return await prisma.user.findFirst({ where: { clerkId } });
}

// Style-related functions
export async function createStyle(userId: string, name: string, keywords: string[], description: string, archiveURL: string) {
  return await prisma.style.create({
    data: {
      userId,
      name,
      keywords,
      description,
      archiveURL,
    },
  });
}

export async function updateStyle(id: number, data: Style) {
  return await prisma.style.update({
    where: { id },
    data,
  });
}

export async function getStyles() {
  return await prisma.style.findMany();
}
