import { useState } from "react";
import { alertProps } from "../constant/types";

const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: "", type: "danger" });

  const showAlert = ({ text, type = "danger" }: alertProps) =>
    setAlert({ show: true, text, type });

  const hideAlert = () => setAlert({ show: false, text: "", type: "danger" });

  return { alert, showAlert, hideAlert };
};

export default useAlert;
