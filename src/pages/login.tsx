import { type NextPage } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/common/Button";
import { reactContext } from "~/context";
import { getCachedCredentials } from "~/services/auth/getCachedCredentials";
import { handleLogin, type LoginParams } from "~/services/auth/handleLogin";

const Login: NextPage = () => {
  const { register, watch, setValue } = useForm<LoginParams>();
  const router = useRouter();
  const ctx = useContext(reactContext);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) void router.push("/app");
    else void router.push("/login");
  }, [session]);

  useEffect(() => {
    if (!window) return;
    getCachedCredentials(window, setValue);
  }, [setValue]);

  return (
    <>
      <SessionProvider>
        <Head>
          <title>Navis</title>
          <meta name="description" content="" />
          <link rel="icon" href="/arauta-favicon.ico" sizes="64x64" />
          <link rel="stylesheet" href="https://use.typekit.net/ivi8uyr.css" />
        </Head>
        <main className="no-repeat relative flex min-h-screen flex-col items-center justify-center bg-cover backdrop-blur">
          <div className="absolute inset-0 flex min-h-screen flex-col items-center justify-center backdrop-blur-[20px]">
            <div className="mb-6">
              <h1 className="mb-4 inline-block w-full bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-6xl font-extrabold tracking-tighter text-transparent">
                NAVIS
              </h1>
            </div>
            <div className="rounded-md bg-white p-12 shadow-2xl">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => void handleLogin(e, watch, router, ctx)}
              >
                <input
                  type="text"
                  className="rounded-md px-3 py-1 outline outline-1 outline-gray-300 focus:outline-primary"
                  placeholder="Usuário"
                  {...register("username")}
                />
                <div className="relative">
                  <input
                    className="rounded-md px-3 py-1 !pr-[15px] outline outline-1 outline-gray-300 focus:outline-primary"
                    placeholder="Senha"
                    type="password"
                    {...register("password")}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <input type="checkbox" {...register("remember")} />
                  Lembrar-me
                </div>
                <Button className="mt-4">Login</Button>
              </form>
            </div>
          </div>
        </main>
      </SessionProvider>{" "}
    </>
  );
};

export default Login;
