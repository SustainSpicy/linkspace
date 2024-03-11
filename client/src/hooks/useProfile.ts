import { useState, useEffect, useCallback } from "react";
import { PrivateApi } from "../api";
import {
  LinkProps,
  ProfileProps,
  User,
  onboardingProps,
} from "../constant/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import useUser from "./useUser";
import { profileData } from "../constant/dummyData";
import { getProfile, setProfileData } from "../redux/slice/profileSlice";

interface HookReturn {
  currentProfile: ProfileProps | null;
  links?: LinkProps[] | null;
  isOnboarding?: onboardingProps | null;
  profileLoading: boolean;
  profileError: string | null;
}

const useProfile = (email: string): HookReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const currentProfile = useSelector(
    (state: RootState) => state.profile.profile
  );
  const profileLoading = useSelector(
    (state: RootState) => state.profile.loading
  );
  const profileError = useSelector((state: RootState) => state.profile.error);
  const [links, setLinks] = useState<LinkProps[] | null>(null);
  const [isOnboarding, setsOnboarding] = useState<onboardingProps | null>(null);

  useEffect(() => {
    if (email) {
      dispatch(getProfile(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (currentProfile) {
      setLinks(currentProfile.links);
      setsOnboarding(currentProfile.isOnboarding);
    }
  }, [currentProfile]);

  return {
    links,
    isOnboarding,
    currentProfile,
    profileLoading,
    profileError,
  };
};

export default useProfile;
