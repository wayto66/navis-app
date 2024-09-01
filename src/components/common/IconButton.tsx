import { Icon } from "@iconify/react/dist/iconify.js";

interface IconButtonParams {
  icon: string;
  onClick?: (v?: unknown) => unknown;
  className?: string;
  size?: number;
  type?: "submit" | "reset" | "button";
}

export const IconButton = ({
  className,
  icon,
  onClick,
  size,
  type,
}: IconButtonParams) => {
  return (
    <button
      className={`${className} rounded-lg bg-white p-1 shadow-lg`}
      onClick={onClick}
      type={type}
    >
      <Icon icon={icon} fontSize={size ?? 10} />
    </button>
  );
};
