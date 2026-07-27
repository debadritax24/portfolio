import { prisma } from "@/lib/db/prisma";
import { hashPassword, comparePassword } from "@/lib/auth/password";

/**
 * Find an admin user by email.
 */
export async function findAdminByEmail(email: string) {
  return prisma.adminUser.findUnique({
    where: { email: email.toLowerCase() },
  });
}

/**
 * Verify admin credentials (email + password).
 */
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const admin = await findAdminByEmail(email);
  if (!admin) return false;
  return comparePassword(password, admin.password);
}

/**
 * Create or update admin user with hashed password.
 * Uses upsert so seed can run multiple times safely.
 */
export async function upsertAdmin(email: string, password: string) {
  const hashed = await hashPassword(password);
  return prisma.adminUser.upsert({
    where: { email: email.toLowerCase() },
    update: { password: hashed },
    create: {
      email: email.toLowerCase(),
      password: hashed,
    },
  });
}
