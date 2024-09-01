/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react/dist/iconify.js";
import { type NextPage } from "next";

const AppHomePage: NextPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <Icon icon={"flat-color-icons:home"} fontSize={50} />
      <div className="font-bold tracking-tighter text-gray-700">UwU</div>
    </main>
  );
};

export default AppHomePage;
