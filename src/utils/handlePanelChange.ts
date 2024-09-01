import { type NextRouter } from "next/router";
import { type TContext } from "~/types/Context";

export const handlePanelChange = (
  ctx: TContext,
  router: NextRouter,
  panel: string
) => {
  ctx.setData((prev) => {
    return {
      ...prev,
      currentPanel: panel,
    };
  });
  void router.push(router.route, {
    query: {
      ...router.query,
      panel,
    },
  });
};
