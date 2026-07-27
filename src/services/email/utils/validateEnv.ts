export function validateEmailEnv(): { user: string; pass: string } {
  const user = process.env.EMAIL_FROM;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    throw new Error("Missing EMAIL_FROM or EMAIL_PASSWORD environment variables.");
  }

  return { user, pass };
}
