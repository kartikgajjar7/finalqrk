import db from "@/lib/db";
export const getUserById = async (id: string) => {
  if (!id) {
    return null;
  }
  const user = await db.user.findUnique({ where: { id } });
  return user;
};

export const getUserByEmail = async (email: string) => {
  if (!email) {
    return null;
  }
  const user = await db.user.findUnique({ where: { email } });
  return user;
};
