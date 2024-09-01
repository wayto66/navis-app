import { Session } from "next-auth";

const isMaster = (session: Session | null) => {
  if (!session) return null;
  if (["master"].includes(session.user.permission)) return true;
  return false;
};

export default isMaster;
