import CardWrapper from "../CardWrapper";

import React, { useEffect, useRef, useState } from "react";

import { PrivateApi } from "../../api";
import OnboardingSlider from "./OnboardingSlider";
import { GrUpdate } from "react-icons/gr";
import useUser from "../../hooks/useUser";
import { Links, onboardingProps } from "../../constant/types";
import useProfile from "../../hooks/useProfile";
import { setIsOnboarding } from "../../redux/slice/profileSlice";
import { useDispatch } from "react-redux";

interface OnbordingProps {
  isOnboarding: onboardingProps | null | undefined;
  // setIsOnboarding: React.Dispatch<React.SetStateAction<onboardingProps>>;
}
const Onboarding = ({ isOnboarding }: OnbordingProps) => {
  const dispatch = useDispatch();

  const [usernameInput, setUsernameInput] = useState("");
  const [checking, setChecking] = useState(false);

  const [onBoardingStatus, setOnBoardingStatus] = useState({
    valid: null,
    msg: "",
  });

  const handleUsernameVerify = async (username: string) => {
    try {
      const { status, data } = await PrivateApi.get(
        "/profile/username/" + username
      );
      if (status === 200) {
        return data;
      }
    } catch (error: any) {
      console.log(error);
      return false;
    }
  };

  const handleUserNameChange = (e: any) => {
    e.preventDefault();
    setUsernameInput(e.target.value);
  };

  const handleVerify = async () => {
    if (usernameInput !== "") {
      setChecking(true);
      const isUsernameValid = await handleUsernameVerify(usernameInput);

      setOnBoardingStatus(isUsernameValid);
      setChecking(false);
    }
  };
  const handleUpdateUsername = async (formData: any) => {
    if (onBoardingStatus.valid) {
      try {
        // const { status, data } = await PrivateApi.put(
        //   "/profile/username/" + currentUser.email,
        //   { ...formData }
        // );
        // if (status === 200) {
        dispatch(setIsOnboarding("username"));

        // }
      } catch (error: any) {
        console.log(error);
        return false;
      }
    }
  };
  const handleUpdateLink = async (formData: any) => {
    if (isOnboarding?.valid || onBoardingStatus.valid) {
      try {
        // const { status, data } = await PrivateApi.put(
        //   "/profile/links/" + currentUser.email,
        //   { ...formData }
        // );
        // if (status === 200) {
        dispatch(setIsOnboarding(formData.type + "Link"));
        // setIsOnboarding((prev) => ({
        //   ...prev,
        //   valid: prev.todo.length > 1,
        //   todo: prev.todo.filter((item) => item !==),
        // }));
        // }
      } catch (error: any) {
        console.log(error);
        return false;
      }
    }
  };

  const onBoadingSlides: { [key: string]: JSX.Element } = {
    username: (
      <>
        <label
          htmlFor="username"
          className="flex flex-col gap-4  pl-1 text-sm font-medium text-gray-900"
        >
          Set Username
          <div>
            <span className="flex gap-2">
              {" "}
              <input
                type="text"
                id="username"
                className={`default_button w-full ${
                  onBoardingStatus.valid === true
                    ? " border-2 border-green-800"
                    : onBoardingStatus.valid === false
                    ? " border-2 border-red-600"
                    : "" // No border if valid is null
                }`}
                value={usernameInput}
                onChange={handleUserNameChange}
                onBlur={handleVerify}
                required
              />
              <button
                className="flex default_button items-center gap-1 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={!onBoardingStatus.valid}
                onClick={() =>
                  handleUpdateUsername({ username: usernameInput })
                }
              >
                <GrUpdate />
                <span> Update</span>
              </button>
            </span>
            <span
              className={`text-sm pl-1 ${
                onBoardingStatus.valid ? "text-gray-500" : "text-red-600"
              }`}
            >
              {checking && "Validating username..."} {onBoardingStatus.msg}
            </span>
          </div>
        </label>
      </>
    ),
    headerLink: (
      <>
        <label
          htmlFor="headerLink"
          className="flex flex-col gap-6  pl-1 text-sm font-medium text-gray-900"
        >
          Add Header
          <button
            type="button"
            className="text-white  flex justify-center items-center gap-2 bg-[#177095] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  p-2   "
            onClick={() =>
              handleUpdateLink({
                title: "",
                url: "",
                img: "",
                type: "header",
              })
            }
          >
            Add New Header
          </button>
        </label>
      </>
    ),
    socialLink: (
      <>
        <label
          htmlFor="socialLink"
          className="flex flex-col gap-6 pl-1 text-sm font-medium text-gray-900"
        >
          Add Link
          <button
            type="button"
            className="text-white  flex justify-center items-center gap-2 bg-[#177095] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  p-2   "
            onClick={() =>
              handleUpdateLink({
                title: "",
                url: "",
                img: "",
                type: "social",
              })
            }
          >
            Add New Social
          </button>
        </label>
      </>
    ),
  };
  const filteredSlides = Object.keys(onBoadingSlides)
    .filter((key) => isOnboarding?.todo.includes(key))
    .map((key) => onBoadingSlides[key]);

  if (!isOnboarding || !isOnboarding?.valid) {
    return;
  }
  return (
    <CardWrapper className="bg-white bg-opacity-50 px- pt-4 ">
      <h2 className="mb-4 text-xl px-4">Onboarding</h2>
      <div>
        {/* <div className="flex flex-col gap-4">{onBoadingSlides[index]}</div>
         */}
        <OnboardingSlider
          slides={filteredSlides}
          {...{
            onBoardingStatus,
          }}
        />
      </div>
    </CardWrapper>
  );
};

export default Onboarding;
