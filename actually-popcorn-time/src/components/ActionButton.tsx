import { useNavigate } from "react-router-dom";

import { ButtonHTMLAttributes } from "react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText: string;
  route?: string;
  className?: string;
  outline?: boolean;
  children?: React.ReactNode;
  icon?: string;
  onClick?: () => void;
};

const ActionButton = ({
  buttonText,
  route,
  className,
  outline = false,
  children,
  icon,
  ...props
}: ActionButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`btn flex items-center gap-1 ${className} ${outline ? " btn-outline btn-sm rounded-full border-primary text-primary" : "btn rounded-full border-action bg-action text-primary"}`}
      onClick={() => route && navigate(route)}
      {...props}
    >
      {buttonText}
      {children}
      <span className="material-symbols-outlined text-lg text-primary ">
        {icon}
      </span>
    </button>
  );
};

export default ActionButton;
export type { ActionButtonProps };
