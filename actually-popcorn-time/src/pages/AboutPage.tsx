import ActionButton from "../components/ActionButton";
import GeneralLayout from "../layouts/GeneralLayout";

const AboutPage = () => {
  return (
    <GeneralLayout>
      <div className="m-10 flex h-full w-full flex-col items-center rounded-3xl bg-app300 p-10 text-white sm:w-4/5 sm:flex-row">
        <div className="flex w-full flex-col items-center pr-4 text-2xl font-bold leading-tight sm:w-1/2 sm:text-6xl">
          <span className="mb-4">Popcorn Time</span>
          <span className="text-xl sm:text-2xl">
            Just some passionate CST developers with a love of movies. We are a
            group of 4 individuals who have come together to create and nurture
            this platform for others to connect and discuss. We hope you enjoy
            your time here.
          </span>
          <br />
          <span className="mb-4">Developers:</span>
          <ul className="grid grid-cols-2 text-xl sm:text-2xl">
            <li>Aric</li>
            <li>Cheryl</li>
            <li>Mika</li>
            <li>Conrad</li>
          </ul>
        </div>
        <img
          className="w-full rounded-lg sm:w-1/2"
          src="Skadoosh.jpg"
          alt="Conrad in popcorn"
        />
      </div>
    </GeneralLayout>
  );
};

export default AboutPage;
