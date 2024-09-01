import { Icon } from "@iconify/react/dist/iconify.js";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EntryPage: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) void router.push("/app");
    else void router.push("/login");
  }, [session]);

  return (
    <>
      <main className="bg-dpurple flex h-screen w-screen flex-col items-center justify-center gap-2">
        <span className="text-white">Aguarde...</span>
        <Icon icon={"tabler:loader-3"} className="animate-spin" />
      </main>
    </>
  );
};

export default EntryPage;
