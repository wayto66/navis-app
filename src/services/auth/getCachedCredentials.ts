import { type UseFormSetValue } from "react-hook-form";
import { type LoginParams } from "./handleLogin";

export const getCachedCredentials = (
  window: WindowLocalStorage,
  setValue: UseFormSetValue<LoginParams>,
) => {
  const username = window.localStorage.getItem("username");
  const password = window.localStorage.getItem("password");

  if (username) setValue("username", username);
  if (password) setValue("password", password);
};
