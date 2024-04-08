import { useNavigate } from "react-router-dom";
type ActionButtonProps = {
  buttonText: string;
  route: string | undefined;
  className: string | undefined;
};

const ActionButton = ({ buttonText, route, className }: ActionButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${className} btn rounded-full bg-action text-white`}
      onClick={() => route && navigate(route)}
    >
      {buttonText}
    </button>
  );
};

export default ActionButton;
