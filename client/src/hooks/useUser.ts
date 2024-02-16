import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User } from "../constant/types";

const useUser = () => {
  const currentUserRedux = useSelector((state: RootState) => state.user);
  const currentUserLocalStorage = JSON.parse(
    localStorage.getItem("user") ?? "null"
  );

  const currentUser = currentUserRedux || currentUserLocalStorage;

  console.log("currentUser ", currentUser);

  return currentUser;
};

export default useUser;
