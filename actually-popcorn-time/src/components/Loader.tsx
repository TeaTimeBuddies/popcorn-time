interface LoaderProps {
  text: string;
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="flex items-center">
      <span className="text-primary">{text}</span>
      <span className="loading loading-ring loading-lg text-primary"></span>
    </div>
  );
};

export default Loader;
