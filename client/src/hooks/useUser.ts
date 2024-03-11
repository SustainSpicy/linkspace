import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useMemo } from "react";

const useUser = () => {
  const currentUserRedux = useSelector((state: RootState) => state.user);
  const currentUserLocalStorage = JSON.parse(
    localStorage.getItem("user") ?? "null"
  );

  const currentUser = useMemo(
    () => currentUserRedux || currentUserLocalStorage,
    [currentUserRedux, currentUserLocalStorage]
  );

  return currentUser;
};

export default useUser;
