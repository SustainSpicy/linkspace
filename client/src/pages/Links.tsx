import { FaPlus } from "react-icons/fa6";

import { BsViewStacked } from "react-icons/bs";
import { FaBoxArchive } from "react-icons/fa6";
import { BsChevronCompactRight } from "react-icons/bs";

import { Button, Modal } from "flowbite-react";
import { Suspense, useCallback, useEffect, useState } from "react";

import useUser from "../hooks/useUser";
import useProfile from "../hooks/useProfile";
import AlertBar from "../components/AlertBar";
import Onboarding from "../components/onBoarding/Onboarding";
import { ProfileProps, isOnboarding } from "../constant/types";
import ErrorBoundary from "../constant/ErrorBoundary";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useAlertContext } from "../provider/AlertProvider";
import Link from "../components/links/Link";
import { v4 as uuidv4 } from "uuid";
import PreviewBox from "../components/PreviewBox";
import { createLink } from "../redux/slice/profileSlice";

const Links = () => {
  const currentUser = useUser();
  const { currentProfile, profileLoading, profileError, isOnboarding, links } =
    useProfile(currentUser?.email);
  const { showAlert } = useAlertContext();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(currentProfile);
  }, [currentProfile]);
  useEffect(() => {
    if (profileError) {
      return showAlert({ text: "Error fetching profile", type: "danger" });
    }
  }, [profileError]);

  if (profileLoading || !currentProfile) {
    return <div className="pt-20">Loading...</div>;
  }

  const handleCreateLink = (e: any, type: string) => {
    e.preventDefault();
    dispatch(createLink(type));
  };
  return (
    <ErrorBoundary fallback="Error Loading page">
      {/* <Suspense fallback="Loading page..."> */}
      <div className="w-full ">
        <div className="relative grid grid-cols-1 sm:grid-cols-3">
          <>
            <div className=" col-span-2 bg-gray-400 min-w-0 min-h-screen p-2 flex items-start justify-end">
              <div className="relative flex flex-col justify-start gap-4 max-w-[800px] lg:max-w-[828px] w-full  mt-[100px] sm:px-6">
                <AlertBar
                  text={`Your Page is live at: ${currentProfile.username}`}
                  btnLabel={"Copy URL"}
                />
                <ErrorBoundary fallback="Error while onboarding">
                  <Onboarding
                    isOnboarding={currentProfile.isOnboarding}
                    // setIsOnboarding={() => {}}
                    // handleUsernameVerify={handleUsernameVerify}
                  />
                </ErrorBoundary>
                <button
                  type="button"
                  className="text-white w-full flex justify-center items-center gap-2 bg-[#177095] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-3.5  mb-2 "
                  onClick={(e) => handleCreateLink(e, "socialLink")}
                >
                  <FaPlus /> Link
                </button>

                <div className="flex justify-between py-2 ">
                  <button
                    type="button"
                    className="text-white flex justify-center items-center gap-2 hover:underline  font-medium rounded-3xl text-sm px-5 py-3.5  mb-2 "
                    onClick={(e) => handleCreateLink(e, "headerLink")}
                  >
                    <BsViewStacked /> Add header
                  </button>
                  <button
                    type="button"
                    className="text-white  flex justify-center items-center gap-2 hover:underline  font-medium rounded-3xl text-sm px-5 py-3.5  mb-2 "
                  >
                    <FaBoxArchive /> View archive <BsChevronCompactRight />
                  </button>
                </div>
                {currentProfile.links.map((item) => {
                  const uid = uuidv4();

                  return <Link key={uid} {...{ ...item }} />;
                })}
              </div>
            </div>
            <div className=" bg-gray-300 min-w-0 min-h-screen flex justify-center items-center">
              <PreviewBox />
            </div>
          </>
        </div>
      </div>
      {/* </Suspense> */}
    </ErrorBoundary>
  );
};

export default Links;
