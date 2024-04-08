import ActionButton from "../components/ActionButton";
import GeneralLayout from "../layouts/GeneralLayout";

const HomePage = () => {
  return (
    <GeneralLayout>
      <div className="m-10 flex h-4/5 w-4/5 flex-col items-center justify-center rounded-3xl bg-app300 p-10 text-white">
        <span className="font-medium">
          Discover, rate, and find your next favourite movie.
        </span>
        <div className="flex w-full flex-col items-center text-8xl font-bold leading-tight">
          <span>Popcorn</span>
          <span>Time</span>
        </div>

        <ActionButton
          className="btn-lg mt-4 min-w-[200px]"
          buttonText="Join now"
          route="/register"
        />
        <ActionButton
          className="btn-lg mt-4 min-w-[200px]"
          buttonText="Login"
          route="/login"
        />
      </div>
    </GeneralLayout>
  );
};

export default HomePage;
