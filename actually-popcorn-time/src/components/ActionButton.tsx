import { useNavigate } from "react-router-dom";

import { ButtonHTMLAttributes } from "react";

type ActionButtonProps = {
  buttonText: string;
  route?: string;
  className?: string;
  outline?: boolean;
  children?: React.ReactNode;
  icon?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ActionButton = ({ buttonText, route, className, outline }: ActionButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`btn flex items-center gap-1 ${className} ${
        outline
          ? " btn-outline btn-sm rounded-full border-primary text-primary"
          : "btn rounded-full border-action bg-action text-primary"
      }`}
      onClick={() => route && navigate(route)}
    >
      {buttonText}
    </button>
  );
};

export default ActionButton;
