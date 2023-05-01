import { PrismaClient, Style, User } from '@prisma/client';
const prisma = new PrismaClient();

// User-related functions
async function createUser(clerkId: string , email: string) {
  return await prisma.user.create({
    data: {
      clerkId,
      email,
    },
  });
}

async function updateUser(id: number, data: User) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

// Style-related functions
async function createStyle(userId: number, name: string, keywords: string[], description: string, archiveURL: string) {
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

async function updateStyle(id: number, data: Style) {
  return await prisma.style.update({
    where: { id },
    data,
  });
}

module.exports = {
  createUser,
  updateUser,
  createStyle,
  updateStyle,
};
