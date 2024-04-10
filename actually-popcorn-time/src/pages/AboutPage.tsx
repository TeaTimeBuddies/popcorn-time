import ActionButton from "../components/ActionButton";
import GeneralLayout from "../layouts/GeneralLayout";

const AboutPage = () => {
  return (
    <GeneralLayout>
      <div className="m-10 flex h-4/5 w-4/5 items-center rounded-3xl bg-app300 p-10 text-white">
        <div className="flex w-full flex-col items-center pr-4 text-6xl font-bold leading-tight">
          <span>Popcorn Time</span>
          <span className="text-2xl">
            Just some passionate CST developers with a love of movies. We are a
            group of 4 individuals who have come together to create and nurture
            this platform for others to connect and discuss. We hope you enjoy
            your time here.
          </span>
          <br />
          <span>Developers:</span>
          <ul className="text-2xl">
            <li>Aric</li>
            <li>Cheryl</li>
            <li>Mika</li>
            <li>Conrad</li>
          </ul>
        </div>
        <img src="Skadoosh.jpg" alt="Conrad in popcorn" />
      </div>
    </GeneralLayout>
  );
};

export default AboutPage;
