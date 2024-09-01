import { signIn } from "next-auth/react";
import { type NextRouter } from "next/router";
import { type FormEvent } from "react";
import { type UseFormWatch } from "react-hook-form";
import { type Context as ContextData } from "~/types/Context";

export interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
}

export const handleLogin = async (
  e: FormEvent,
  getValues: UseFormWatch<LoginParams>,
  router: NextRouter,
  ctx: ContextData,
) => {
  e.preventDefault();

  const { username, password, remember } = getValues();

  if (remember) {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
  }

  await signIn("credentials", {
    username: username,
    password: password?.trim(),
    redirect: true,
    callbackUrl: "/",
  });
};
