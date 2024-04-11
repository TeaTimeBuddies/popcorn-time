import { Link } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { useUser } from "../hooks/useUser";

type NavBarItem = {
  name: string;
  route: string;
  adminOnly?: boolean;
};

const navBarItems: NavBarItem[] = [
  { name: "Dashboard", route: "/user/dashboard" },
  { name: "About", route: "/about" },
  {
    name: "Movies",
    route: "/movies",
  },
  { name: "Add Movie", route: "/movies/add" },
  { name: "Approve movies", route: "/movies/approve", adminOnly: true },
  {
    name: "Approve users",
    route: "/users/approve",
    adminOnly: true,
  },
];

const logout = () => {
  sessionStorage.removeItem("user_id");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("is_admin");
  sessionStorage.removeItem("is_approved");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("name");
  window.location.href = "/";
};

const NavBar = () => {
  const isAdmin = useAdmin();
  const isApproved = useUser();
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
        <a className="btn btn-ghost text-2xl text-primary" href="/">
          PopcornTime
        </a>
      </div>
      {isAdmin && (
        <div className="navbar-center hidden text-primary lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navBarItems
              .filter((item) => (isAdmin ? true : !item.adminOnly))
              .map((item) => (
                <li key={item.name}>
                  <Link to={item.route} className="btn btn-ghost">
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      {isApproved && (
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-sm text-primary">
              Hi, {sessionStorage.getItem("name")}
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
