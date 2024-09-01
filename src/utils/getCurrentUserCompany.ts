import { toast } from "react-toastify";
import { type TContext } from "~/types/Context";
import { type TClient } from "~/types/DatabseModels";
import fetchDbData from "./fetchDbData";

export const getCurrentUserCompany = async (
  ctx: TContext,
  clientId: number
) => {
  const fetch = await fetchDbData({
    ctx,
    path: `client/${clientId}`,
    method: "GET",
  });

  const objects = fetch.objects as TClient[];

  if (!objects || !objects.length) {
    toast.error("Houve um erro no servidor.");
    return;
  }
  ctx.setData((prev) => {
    return {
      ...prev,
      currentClient: objects[0],
    };
  });
};
