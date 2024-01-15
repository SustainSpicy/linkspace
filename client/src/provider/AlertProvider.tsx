import { createContext, useContext } from "react";

const AlertContext = createContext({});

const AlertProvider = () => {
  const dataToSend = {};
  return <AlertContext.Provider value={{ dataToSend }}></AlertContext.Provider>;
};
export default AlertProvider;

export const useAlertContext = () => {
  return useContext(AlertContext);
};
