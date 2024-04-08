type SuccessToastProps = {
  message: string;
  children?: React.ReactNode;
};

const SuccessToast = ({ message, children }: SuccessToastProps) => {
  return (
    <>
      <div className="toast toast-center toast-bottom">
        <div className="alert alert-success flex flex-col border-action bg-action text-primary">
          <span>{message}</span>
          {children}
        </div>
      </div>
    </>
  );
};

export default SuccessToast;
