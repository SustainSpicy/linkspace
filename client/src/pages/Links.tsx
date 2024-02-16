import { FaPlus } from "react-icons/fa6";
// import AlertBar from "../components/AlertBar";
import { BsViewStacked } from "react-icons/bs";
import { FaBoxArchive } from "react-icons/fa6";
import { BsChevronCompactRight } from "react-icons/bs";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { GoGrabber } from "react-icons/go";
// import { CiEdit } from "react-icons/ci";
// import { IoShareOutline } from "react-icons/io5";
// import Toggle from "../components/Toggle";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
// import Onboarding from "../components/Onboarding";
import { PrivateApi } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { logout } from "../redux/slice/userSlice";

// interface UserStatus {
//   username: { type: string | null; default: null };
//   links: string[];
// }
const Links = () => {
  // const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const currentUser = useSelector((state: RootState) => state.user);

  const getCurrentUserProfile = async (email: string) => {
    try {
      const { status, data } = await PrivateApi.get("/profile/" + email);
      if (status === 200) {
        return data;
      }
    } catch (error: any) {
      // console.log(error);
      return error;
    }
  };

  useEffect(() => {
    console.log(isFirstLogin);

    const fetchData = async () => {
      try {
        const result = await getCurrentUserProfile(currentUser.email);
        // console.log("result ", result);
        setIsFirstLogin(result);
      } catch (error) {}
    };
    fetchData();
  }, [currentUser]);

  // const handleUsernameVerify = async (username: string) => {
  //   try {
  //     const { status, data } = await PublicApi.get("/profile/" + username);
  //     if (status === 200) {
  //       return data;
  //     }
  //   } catch (error: any) {
  //     console.log(error.response.data.msg);
  //   }
  // };
  return (
    <div className="w-full">
      <div className="relative grid grid-cols-1 sm:grid-cols-3">
        <div className=" col-span-2 bg-gray-400 min-w-0 min-h-screen p-2 flex items-start justify-end">
          <div className="relative flex flex-col justify-start gap-4 max-w-[800px] lg:max-w-[828px] w-full  mt-[100px] sm:px-6">
            {/* {isFirstLogin?.username ? (
              <AlertBar
                text={`Your Page is live: ${isFirstLogin?.username}`}
                btnLabel={"Copy URL"}
              />
            ) : (
              // <Onboarding
              //   {...isFirstLogin}
              //   handleUsernameVerify={handleUsernameVerify}
              // />
            )} */}
            <button
              type="button"
              className="text-white w-full flex justify-center items-center gap-2 bg-[#177095] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-3.5  mb-2 "
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

            {/* <main className="flex justify-between items-center mb-6 gap-2  rounded-2xl bg-white shadow-2xl p-6">
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
            </main> */}
            <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>Terms of Service</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union
                    enacts new consumer privacy laws for its citizens, companies
                    around the world are updating their terms of service
                    agreements to comply.
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation
                    (G.D.P.R.) goes into effect on May 25 and is meant to ensure
                    a common set of data rights in the European Union. It
                    requires organizations to notify users as soon as possible
                    of high-risk data breaches that could personally affect
                    them.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setOpenModal(false)}>I accept</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal>
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
