import { Link } from "react-router-dom";

type NavBarItem = {
  name: string;
  route: string;
};

const navBarItems: NavBarItem[] = [
  { name: "Home Page", route: "/" },
  { name: "About", route: "/about" },
  {
    name: "Movies",
    route: "/movies",
  },
  { name: "Add Movie", route: "/movies/add" },
  { name: "User Dashboard", route: "/user/dashboard" },
  { name: "Login", route: "/login" },
  { name: "Register", route: "/register" },
  { name: "Approve movies", route: "/movies/approve" },
];
const NavBar = () => {
  return (
    <div className="navbar fixed top-0 z-50 w-full bg-app100">
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
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 text-primary shadow "
          >
            {navBarItems.map((item) => (
              <li
                key={item.name}
                className="rounded-md text-primary hover:bg-app100"
              >
                <Link to={item.route} className="">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl text-primary" href="/">PopcornTime</a>
      </div>
      <div className="navbar-center hidden text-primary lg:flex">
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
        <a className="btn btn-ghost material-symbols-outlined text-5xl text-primary" href="/user/dashboard">
          account_circle
        </a>
      </div>
    </div>
  );
};

export default NavBar;
