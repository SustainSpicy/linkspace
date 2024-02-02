import { FaPlus } from "react-icons/fa6";
import CardWrapper from "./CardWrapper";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
interface UserStatus {
  username: { type: string | null; default: null };
  links: string[];
}
interface OnbordingProps extends UserStatus {
  handleUsernameVerify: (username: string) => {};
}
const Onboarding = ({
  links,
  username,
  handleUsernameVerify,
}: OnbordingProps) => {
  const [error, setError] = useState();
  const [index, setIndex] = useState(0);
  const [usernameInput, setUsernameInput] = useState("");

  const handleNextSlide = () => {
    if (index < 2) return setIndex((prev) => prev + 1);
  };
  const handlePrevSlide = () => {
    if (index >= 0) return setIndex((prev) => prev - 1);
  };

  const handleUserNameChange = (e: any) => {
    e.preventDefault();
    setUsernameInput(e.target.value);
  };
  const handleVerify = () => {
    const isUsernameValid = handleUsernameVerify(usernameInput);
    if (isUsernameValid && !links.length) {
      return handleNextSlide();
    } else {
      // check what type of link is there
    }
  };
  const onBoadingSlides: { [key: number]: JSX.Element } = {
    0: (
      <>
        <label
          htmlFor="password"
          className="block mb-2 pl-1 text-sm font-medium text-gray-900"
        >
          Set Username
        </label>

        <input
          type="text"
          id="username"
          className="default_button "
          value={usernameInput}
          onChange={handleUserNameChange}
          onBlur={handleVerify}
          required
        />
        <div className="flex items-center justify-end w-full gap-4 cursor-pointer">
          <span
            onClick={handleNextSlide}
            className="flex items-center hover:underline"
          >
            Next <FaChevronRight className="" fontSize={18} />
          </span>
        </div>
      </>
    ),
    1: (
      <>
        <label
          htmlFor="password"
          className="block mb-2 pl-1 text-sm font-medium text-gray-900"
        >
          Add Header
        </label>

        <button
          type="button"
          className="text-white  flex justify-center items-center gap-2 bg-[#177095] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  p-2   "
          onClick={handleNextSlide}
        >
          Add New Header{" "}
        </button>
        <div className="flex items-center justify-between  gap-4 cursor-pointer">
          <span
            onClick={handlePrevSlide}
            className="flex items-center hover:underline"
          >
            <FaChevronLeft className="cursor-pointer " fontSize={18} />
            Prev
          </span>{" "}
          <span
            onClick={handleNextSlide}
            className="flex items-center hover:underline"
          >
            Next <FaChevronRight className="cursor-pointer" fontSize={18} />
          </span>
        </div>
      </>
    ),
    2: (
      <>
        <label
          htmlFor="password"
          className="block mb-2 pl-1 text-sm font-medium text-gray-900"
        >
          Add Link
        </label>
        <button
          type="button"
          className="text-white  flex justify-center items-center gap-2 bg-[#177095] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  p-2   "
          onClick={handleNextSlide}
        >
          Add New Link
        </button>
        <div
          onClick={handlePrevSlide}
          className="flex items-center justify-start  gap-4 cursor-pointer"
        >
          <span className="flex items-center hover:underline">
            <FaChevronLeft className="cursor-pointer " fontSize={18} />
            Prev
          </span>{" "}
        </div>
      </>
    ),
  };

  return (
    <CardWrapper className="bg-white bg-opacity-50 px-4 py-4 ">
      <h2 className="mb-4 text-xl">Onboarding</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: "100%" }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{ x: "-100%" }}
        >
          <div className="flex flex-col gap-4">{onBoadingSlides[index]}</div>
        </motion.div>
      </AnimatePresence>
    </CardWrapper>
  );
};

export default Onboarding;
