import ActionButton from "../components/ActionButton";
import GeneralLayout from "../layouts/GeneralLayout";

const Error404Page = () => {
  return (
    <GeneralLayout>
      <div className="m-10 flex h-4/5 w-4/5 flex-col items-center justify-center rounded-3xl bg-app300 p-10 text-white">
        <div className="flex w-full flex-col items-center text-8xl font-bold leading-tight">
          <span>404 ERROR PAGE</span>
        </div>
        <span className="font-medium">
          Uh oh, There's nothing here...
        </span>

        <ActionButton
          className="btn-lg mt-4 min-w-[200px]"
          buttonText="Homepage"
          route="/"
        />
      </div>
    </GeneralLayout>
  );
};

export default Error404Page;
