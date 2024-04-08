import { Link } from "react-router-dom";

type NavBarItem = {
  name: string;
  route: string;
};

const navBarItems: NavBarItem[] = [
  { name: "Main", route: "/" },
  { name: "About", route: "/about" },
  {
    name: "Movies",
    route: "/movies",
  },
  { name: "Reviews", route: "/reviews" },
];
const NavBar = () => {
  return (
    <div className="navbar bg-app100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="bg-background menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box p-2 text-base-100 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl text-white">PopcornTime</a>
      </div>
      <div className="navbar-center hidden text-white lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navBarItems.map((item) => (
            <li key={item.name}>
              <Link to={item.route} className="btn btn-ghost">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <span className="material-symbols-outlined text-5xl text-white ">
          account_circle
        </span>
      </div>
    </div>
  );
};

export default NavBar;
