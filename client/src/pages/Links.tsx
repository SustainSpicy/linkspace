import { FaPlus } from "react-icons/fa6";
import AlertBar from "../components/AlertBar";
import { BsViewStacked } from "react-icons/bs";
import { FaBoxArchive } from "react-icons/fa6";
import { BsChevronCompactRight } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoGrabber } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import Toggle from "../components/Toggle";
const Links = () => {
  return (
    <div className="w-full">
      <div className="relative grid grid-cols-1  sm:grid-cols-3">
        <div className=" col-span-2 bg-gray-400 min-w-0 min-h-screen p-2 flex items-start justify-end">
          <div className="max-w-[800px] lg:max-w-[828px] w-full  mt-[100px] sm:px-6">
            <AlertBar text={"Your Page is live: "} btnLabel={"Copy URL"} />

            <button
              type="button"
              className="text-white w-full flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-3.5  mb-2 "
            >
              <FaPlus /> Link
            </button>

            <div className="flex justify-between py-2 ">
              <button
                type="button"
                className="text-white flex justify-center items-center gap-2 hover:underline  font-medium rounded-3xl text-sm px-5 py-3.5  mb-2 "
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

            <main className="flex justify-between items-center mb-6 gap-2  rounded-2xl bg-white shadow-2xl p-6">
              <GoGrabber />
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="flex items-center gap-2">
                  Tittle <CiEdit className="cursor-pointer" />
                </h2>
                <p className="flex items-center gap-2">
                  Descritions <CiEdit className="cursor-pointer" />
                </p>
                <div className="flex gap-2 p-2">
                  <RiDeleteBinLine fontSize={20} />
                  <RiDeleteBinLine fontSize={20} />
                  <RiDeleteBinLine fontSize={20} />
                  <RiDeleteBinLine fontSize={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4 items-end">
                <div className="flex  items-center  gap-2 mb-2">
                  <IoShareOutline fontSize={20} />
                  <Toggle />
                </div>
                <RiDeleteBinLine fontSize={20} />
              </div>
            </main>
          </div>
        </div>
        <div className=" bg-gray-300 min-w-0 min-h-screen flex justify-start">
          <div className="max-w-[400px] w-[20rem]  mt-[100px] sm:px-6">
            <div className=" mb-6 min-h-[80%]  rounded-2xl bg-white shadow-2xl p-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
