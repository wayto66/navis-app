import { type Session } from "next-auth";

const isClient = (session: Session | null) => {
  if (!session) return null;
  if (["user", "superuser"].includes(session.user.permission)) return true;
  return false;
};

export default isClient;
