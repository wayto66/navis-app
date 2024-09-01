import { type MouseEvent } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ModalParams {
  children: JSX.Element | JSX.Element[] | (boolean | JSX.Element)[];
  onClick?: (v?: any) => any;
  className?: string;
}

export const Modal = ({ children, onClick, className }: ModalParams) => {
  const handleClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal_backdrop" && onClick) onClick();
  };

  return (
    <div
      className={`${className} fixed left-0 top-0 z-[99] flex h-screen max-h-screen w-screen items-center justify-center overflow-auto bg-black/20 p-12 backdrop-blur-[2px]`}
      id="modal_backdrop"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
