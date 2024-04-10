type ToastProps = {
  message: string;
  children?: React.ReactNode;
  status?: "success" | "error";
};

const ToastColours = {
  success: "border-action bg-action",
  error: "alert-error",
};

const Toast = ({ message, children, status = "success" }: ToastProps) => {
  return (
    <>
      <div className="toast toast-center toast-bottom">
        <div
          className={`alert ${ToastColours[status]} flex flex-col text-primary`}
        >
          <span>{message}</span>
          {children}
        </div>
      </div>
    </>
  );
};

export default Toast;
