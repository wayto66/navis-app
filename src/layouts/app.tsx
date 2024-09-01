/* eslint-disable react-hooks/exhaustive-deps */
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useContext, useEffect } from "react";
import { Navbar } from "~/components/navigation/Navbar";
import { reactContext } from "~/context";
import { getCustomers } from "~/services/customer/getCustomers";
import { getUsers } from "~/services/user/getUsers";

interface LayoutParams {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = ({ children }: LayoutParams) => {
  const ctx = useContext(reactContext);
  const [animRef] = useAutoAnimate();
  const [animRef2] = useAutoAnimate();
  const loadDefaultData = async () => {
    const users = await getUsers({ page: 1, pageSize: 100 });
    const customers = await getCustomers({ page: 1, pageSize: 100 });

    ctx.setData((prev) => {
      return {
        ...prev,
        users: users ?? [],
        customers: customers ?? [],
      };
    });
  };

  useEffect(() => {
    void loadDefaultData();
  }, []);

  return (
    <>
      <main
        className="flex min-h-screen w-full flex-col justify-start overflow-x-hidden bg-gray-200 lg:flex-row"
        ref={animRef2}
      >
        <Navbar />
        <div
          className="mx-auto h-full w-full p-6 lg:max-w-[1000px] xl:max-w-[1500px]"
          ref={animRef}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default AppLayout;
