/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";

const DefaultLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <Head>
        <title>Navis</title>
        <meta name="description" content="" />
        <link rel="icon" href="/icon.ico" sizes="64x64" />
        <link rel="stylesheet" href="https://use.typekit.net/ivi8uyr.css" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 lg:flex-row">
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
