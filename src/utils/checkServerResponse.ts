import { type TArautaResponse } from "./fetchDbData";

export const checkServerResponse = (
  _: unknown,
  response: TArautaResponse | null | undefined
): { interrupt: boolean; message: string; objects?: unknown } => {
  if (!response?.objects) {
    alert(response?.meta.message || "Houve um erro inesperado.");

    return {
      interrupt: true,
      message: response?.meta.message || "Houve um erro inesperado",
    };
  }

  return {
    interrupt: false,
    message: response?.meta.message || "Houve um erro inesperado",
    objects: response.objects,
  };
};
