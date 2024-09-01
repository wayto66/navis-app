import { useContext, useMemo } from "react";
import { reactContext } from "~/context";

export const UserOptions = () => {
  const ctx = useContext(reactContext);
  const users = ctx.data.users;

  return useMemo(() => {
    return users.map((user) => (
      <option key={`user-${user.id}`} value={user.id}>
        {user.name}
      </option>
    ));
  }, [users]);
};
