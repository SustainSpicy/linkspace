import { useState, useEffect } from "react";
import { PrivateApi } from "../api";
import { User } from "../constant/types";

const useProfile = (currentUser: User) => {
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await PrivateApi.get(
          "/profile/" + currentUser.email
        );
        if (status === 200) {
          setCurrentUserProfile(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return { currentUserProfile, error };
};

export default useProfile;
