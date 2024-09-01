import { Icon } from "@iconify/react/dist/iconify.js";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { reactContext } from "~/context";
import { handlePanelChange } from "~/utils/handlePanelChange";

type TNavbarConfigParams = {
  open: boolean;
  keepOpen: boolean;
  expandPanel: string;
};

type TSideMenuOption = {
  name: string;
  url: string;
  children: TSideMenuOption[];
  icon: JSX.Element;
  fatherIcon?: JSX.Element;
  roles?: string[];
};

const sideMenuOptions: TSideMenuOption[] = [
  {
    name: "Home",
    url: "/app/home",
    children: [],
    icon: <Icon icon={"tabler:home-filled"} />,
  },

  {
    name: "Projetos",
    url: "/app/project",
    children: [],
    icon: <Icon icon={"eos-icons:project"}></Icon>,
  },

  {
    name: "Tarefas",
    url: "/app/task",
    children: [],
    icon: <Icon icon={"fluent:clipboard-task-list-24-filled"}></Icon>,
  },

  {
    name: "Rotinas",
    url: "/app/routine",
    children: [],
    icon: <Icon icon="akar-icons:schedule"></Icon>,
    // roles: ["admin", "master"],
  },
];

export const Navbar = () => {
  const ctx = useContext(reactContext);
  const router = useRouter();
  const url = router.pathname;

  const [navbarConfig, setNavbarConfig] = useState<TNavbarConfigParams>({
    open: true,
    keepOpen: true,
    expandPanel: "users",
  });

  if (!ctx) return <></>;

  return (
    <div
      className={`fixed relative flex h-[75px] text-gray-800 lg:h-[inherit]`}
    >
      <div
        className={`navbar sticky top-0 w-screen max-w-full transition-all lg:h-screen lg:w-auto ${
          navbarConfig.keepOpen ? "w-[300px]" : "w-[100px]"
        } z-[10] overflow-visible`}
      >
        <div
          className={`flex min-w-[100px] max-w-[350px] bg-white shadow-xl lg:h-full ${
            navbarConfig.open ? "w-full" : "w-[40%]"
          } bg-dark-gray flex-row items-center overflow-x-hidden px-5 py-3 transition-all duration-[300ms] lg:flex-col`}
          onMouseEnter={() => {
            setNavbarConfig({ ...navbarConfig, open: true });
          }}
          onMouseLeave={() => {
            if (!navbarConfig.keepOpen) {
              setNavbarConfig({ ...navbarConfig, open: false });
            }
          }}
        >
          <div className="hidden w-full flex-row items-center justify-between gap-6 lg:flex">
            <Link
              href={"/"}
              className={`${
                navbarConfig.open
                  ? "text-start"
                  : "text-center text-xl font-semibold text-dark"
              } flex w-full items-center justify-center text-sm font-semibold uppercase`}
            >
              {navbarConfig.open ? (
                <div className="flex flex-row items-center gap-3">
                  <Image
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                  Navis
                </div>
              ) : (
                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  width={32}
                  height={32}
                />
              )}
            </Link>
            {navbarConfig.open && (
              <button
                className="transition hover:rotate-12"
                onClick={() => {
                  setNavbarConfig({
                    ...navbarConfig,
                    keepOpen: !navbarConfig.keepOpen,
                  });
                }}
              >
                <i className="">
                  {navbarConfig.keepOpen ? (
                    <Icon icon={"tabler:lock"} />
                  ) : (
                    <Icon icon={"tabler:lock-open"} />
                  )}
                </i>
              </button>
            )}
          </div>

          <ul
            className={`flex w-full flex-row gap-6 lg:mt-6 lg:flex-col lg:gap-0`}
          >
            {sideMenuOptions.map((option) => {
              if (!option.roles) {
                return (
                  <li className="my-2" key={Math.random()}>
                    <Link
                      className={`flex w-full flex-row items-center ${
                        navbarConfig.open
                          ? "justify-start pl-4 pr-8"
                          : "justify-center px-4"
                      } gap-3 rounded-lg py-2 transition ${
                        url.includes(option.url)
                          ? "bg-gradient-to-r from-primary to-primary/80 text-white hover:bg-primary/70"
                          : "hover:bg-gray-200"
                      }`}
                      href={option.url}
                    >
                      <i className="">{option.icon}</i>
                      {navbarConfig.open && (
                        <span className="hidden font-semibold lg:block">
                          {option.name}
                        </span>
                      )}
                      {navbarConfig.open && option.children.length > 0 && (
                        <i
                          className="ml-auto rounded-sm p-1 transition hover:bg-white/10"
                          onClick={() =>
                            setNavbarConfig({
                              ...navbarConfig,
                              expandPanel:
                                navbarConfig.expandPanel === option.url
                                  ? " "
                                  : option.url,
                            })
                          }
                        >
                          <Icon
                            icon={"tabler:chevron-right"}
                            className={`transition-all ${
                              navbarConfig.expandPanel === option.url
                                ? "rotate-90"
                                : "rotate-0"
                            } `}
                          />
                        </i>
                      )}
                    </Link>
                    <ul
                      className={`w-full ${
                        navbarConfig.open ? "block" : "hidden"
                      } ${
                        navbarConfig.expandPanel === option.url
                          ? "h-auto"
                          : "h-0"
                      } overflow-hidden rounded-sm transition-all`}
                    >
                      {option.children.map((childOption) => (
                        <li key={Math.random()}>
                          <button
                            className={`flex w-full flex-row items-center ${
                              navbarConfig.open
                                ? "justify-start pl-5"
                                : "justify-center"
                            } gap-6 rounded-sm py-2 transition hover:scale-[1.03] ${
                              url.includes(childOption.url)
                                ? "bg-jpurple"
                                : "hover:bg-white/20"
                            }`}
                            onClick={() =>
                              handlePanelChange(ctx, router, childOption.url)
                            }
                          >
                            <div className="relative mr-[-25px] flex flex-row">
                              <i className="">{option.icon}</i>
                              <i className="z-[5] translate-x-[-10px] rounded-full bg-primary p-1">
                                {childOption.icon}
                              </i>
                            </div>
                            {navbarConfig.open && (
                              <span className="font-semibold">
                                {childOption.name}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
            })}
          </ul>

          <div className="bottom-0 ml-auto flex h-full w-auto flex-col border-gray-500 lg:ml-0 lg:mt-auto lg:h-auto lg:w-full lg:border-t lg:pt-2">
            {/* <button
            className={` flex w-full flex-row items-center ${
              navbarConfig.open ? "justify-start" : "justify-center"
            } gap-6 rounded-sm px-2 py-2 transition ${
              ctx.data.currentPanel === "settings"
                ? "bg-primary "
                : " hover:bg-white/20"
            }`}
            onClick={() => ctx.data.setCurrentPanel("settings")}
          >
            <i>
              <IconSettings color="white" />
            </i>

            {navbarConfig.open && (
              <span className="font-semibold ">Configurações</span>
            )}
          </button> */}
            <button
              className={`flex w-full flex-row items-center hover:bg-gray-200 ${
                navbarConfig.open
                  ? "justify-start pl-4 pr-8"
                  : "justify-center px-4"
              } gap-6 rounded-lg py-2 transition`}
              onClick={() =>
                void signOut({
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
              <i>
                <Icon icon={"material-symbols:logout"} />
              </i>

              {navbarConfig.open && (
                <span className="hidden font-semibold lg:block">Sair</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
