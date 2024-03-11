import { IoIosLink } from "react-icons/io";
import { IoShapesOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/Terra.png";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { logout } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { PATHS } from "../constant";

type IsActiveProps = { isActive: boolean };

const navLinks = [
  {
    title: "Links",
    path: PATHS.LINKS,
    icon: <IoIosLink />,
  },
  {
    title: "Appearance",
    path: PATHS.APPEARANCE,
    icon: <IoShapesOutline />,
  },
  {
    title: "Analytics",
    path: PATHS.ANALYTICS,
    icon: <BsBarChart />,
  },
  {
    title: "Settings",
    path: PATHS.SETTINGS,
    icon: <CiSettings />,
  },
];

const NavLinks = ({ user }: any) => {
  if (!user) {
    return null;
  }

  return (
    <ul className="flex gap-4 items-center">
      {navLinks.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }: IsActiveProps) =>
              isActive
                ? "font-bold flex items-center gap-1 text-text transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-105 "
                : "font-light flex items-center gap-1 text-text transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-105 "
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
const Nav = () => {
  const dispatch = useDispatch();
  const currentUser = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(PATHS.HOME);
  };
  return (
    <nav className="max-w-[1200px] fixed z-50 top-2 w-full p-2 rounded-3xl h-[60px] flex items-center justify-between bg-primary">
      <div className="links flex gap-4 items-center">
        <Link to="/" className="logo w-10">
          <img src={logo} alt="logo" />
        </Link>
        <NavLinks user={currentUser} />
      </div>
      <div className="ops flex gap-4 items-center">
        {!currentUser ? (
          <Link
            to={PATHS.AUTH}
            className="p-2 rounded-3xl border border-white bg-background hover:bg-primary active:bg-pink-950 text-text hover:scale-105 "
          >
            Get Started
          </Link>
        ) : (
          <button
            className="p-2 rounded-3xl bg-background hover:bg-primary active:bg-pink-950 text-text"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        {currentUser && (
          <div className="avatar w-10 h-10 p-1 cursor-pointer bg-pink-100 rounded-full flex items-center justify-center ">
            <img src="" alt="" />
            <span className="text-sm uppercase leading-none tracking-wide ">
              {currentUser?.fullName?.charAt(0)}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
