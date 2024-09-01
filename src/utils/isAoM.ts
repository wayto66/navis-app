import { Session } from "next-auth";

const isAoM = (session: Session | null) => {
  if (!session) return null;
  if (["admin", "master"].includes(session.user.permission)) return true;
  return false;
};

export default isAoM;
