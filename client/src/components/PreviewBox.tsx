import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { LinkProps } from "../constant/types";
import { Link } from "react-router-dom";
const personData = {
  username: "Timi",
  links: [
    {
      _id: "String",
      title: "string",
      url: "string",
      img: "string",
      type: "header",
    },
    {
      _id: "String",
      title: "string",
      url: "string",
      img: "string",
      type: "social",
    },
  ],
};
const PreviewBox = () => {
  const [config, setConfig] = useState({
    mainBackground: "#3b667b",
    primary: "black",
    secondary: "#fff",
  });

  const [profile, setProfile] = useState(personData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [config, profile]);
  return (
    <div className="max-w-[400px] w-[20rem] h-full sm:px-6">
      <div
        style={{ background: config.mainBackground }}
        className={`flex flex-col gap-4 items-center  justify-between my-[50%] min-h-[60%] inset-10 rounded-3xl shadow-2xl  p-6  border-8 border-black`}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        )}

        <div className="header flex flex-col gap-2">
          <div
            style={{ background: config.primary, color: config.secondary }}
            className={`flex justify-center items-center  font-semibold  rounded-full w-10 h-10`}
          >
            {profile.username[0]}
          </div>
          <h2 style={{ color: config.secondary }} className={` text-center`}>
            @{profile.username}
          </h2>
        </div>
        <main className="mt-2 flex-1 flex flex-col gap-4 w-full">
          {profile.links.map((link, index) => {
            const { type, title, url } = link;
            if (type === "header") {
              return (
                <h2
                  key={index}
                  style={{ color: config.secondary }}
                  className={` text-center font-semibold`}
                >
                  {title}
                </h2>
              );
            }
            if (type === "social") {
              return (
                <Link
                  key={index}
                  to={url}
                  style={{
                    background: config.secondary,
                    color: config.primary,
                  }}
                  className={` rounded-xl p-2  bg-white text-center`}
                >
                  {title}
                </Link>
              );
            }
          })}
        </main>
        <h6
          style={{ color: config.primary }}
          className={`footer font-semibold  text-center`}
        >
          Linktree
        </h6>
      </div>
    </div>
  );
};

export default PreviewBox;
