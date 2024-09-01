import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { contextDefaultDataValue, reactContext } from "~/context";
import AppLayout from "~/layouts/app";
import DefaultLayout from "~/layouts/default";
import "~/styles/globals.css";
import { type ContextData } from "~/types/Context";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const { pathname } = router;
  const [data, setData] = useState<ContextData>(contextDefaultDataValue);
  const Layout = pathname.startsWith("/app") ? AppLayout : DefaultLayout;

  useEffect(() => {
    document.body.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setData((prev) => {
          return {
            ...prev,
            showClientCreationBox: false,
            showEventCreationBox: false,
          };
        });
      }
    });
  }, []);

  return (
    <reactContext.Provider
      value={{
        data,
        setData,
      }}
    >
      <Head>
        <title>Navis</title>
        <meta name="description" content="" />
        <link rel="icon" href="/icon.ico" sizes="64x64" />
        <link rel="stylesheet" href="https://use.typekit.net/ivi8uyr.css" />
      </Head>
      <SessionProvider session={session}>
        <ToastContainer />
        <CustomProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CustomProvider>
      </SessionProvider>
    </reactContext.Provider>
  );
};

export default MyApp;
