import { HiInformationCircle } from "react-icons/hi";
import CardWrapper from "./CardWrapper";

interface AlertProps {
  text: String;
  btnLabel: String;
  onClick?: () => void;
}
const AlertBar = ({ text, btnLabel, onClick }: AlertProps) => {
  return (
    <CardWrapper className="flex items-center p-4 text-sm text-[#177095]  bg-blue-200 ">
      <HiInformationCircle size={20} className="mr-2" />
      <span className="sr-only">Info</span>
      <div className="w-full flex justify-between">
        <div className="flex flex-col justify-center">
          <span className="font-medium block"> {text}</span>
          <span className="font-medium">Alert! </span>
        </div>

        {btnLabel && (
          <button
            className="text-white  flex justify-center items-center gap-2 bg-[#177095] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-3.5   "
            onClick={onClick}
          >
            {btnLabel}
          </button>
        )}
      </div>
    </CardWrapper>
  );
};

export default AlertBar;
