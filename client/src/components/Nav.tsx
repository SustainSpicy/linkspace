import { IoIosLink } from "react-icons/io";
import { IoShapesOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/Terra.png";
import { useState } from "react";
type isActive = { isActive: boolean };

const navLinks = [
  {
    title: "Links",
    url: "links",
    icon: <IoIosLink />,
  },
  {
    title: "Appearance",
    url: "appearance",
    icon: <IoShapesOutline />,
  },
  {
    title: "Analytics",
    url: "analytics",
    icon: <BsBarChart />,
  },
  {
    title: "Settings",
    url: "settings",
    icon: <CiSettings />,
  },
];
const Nav = () => {
  const [isAuth] = useState(true);

  const NavLinks = () => {
    if (isAuth) {
      return navLinks.map((item, index) => {
        return (
          <NavLink
            key={index}
            to={`/${item.url}`}
            className={({ isActive }: isActive) =>
              isActive
                ? "font-bold flex items-center gap-1 "
                : "font-light flex items-center gap-1 "
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        );
      });
    } else {
      return;
    }
  };
  return (
    <nav className=" max-w-[1200px] fixed z-50 top-2  w-full p-2 rounded-3xl h-[80px] flex items-center justify-between bg-white">
      <div className="links flex gap-4 items-center">
        <NavLink to="/" className="logo w-10">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLinks />
      </div>
      <div className="ops flex gap-4 items-center">
        {!isAuth ? (
          <button className="p-2 rounded-2xl bg-pink-400 hover:bg-pink-500 active:bg-pink-950">
            Signup
          </button>
        ) : (
          <div className="avatar w-10 h-10 p-1 cursor-pointer bg-pink-100 rounded-full flex items-center justify-center ">
            <img src="" alt="" />
            He
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
