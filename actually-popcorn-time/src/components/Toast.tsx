type Toast = {
  message: string;
  children?: React.ReactNode;
  status?: "success" | "error";
};

type ToastProps = {
  toasts: Toast[];
};

const ToastColours = {
  success: "border-action bg-action",
  error: "alert-error",
};

const Toast = ({ toasts }: ToastProps) => {
  return (
    <>
      <div className="toast toast-center toast-bottom">
        {toasts.map(({ message, children, status = "success" }, index) => (
          <div
            key={index}
            className={`alert ${ToastColours[status]} flex flex-col text-primary`}
          >
            <span>{message}</span>
            {children}
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
