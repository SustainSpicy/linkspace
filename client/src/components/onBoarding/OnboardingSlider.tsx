import React, { ChangeEvent, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface OnboardingSliderProps {
  // usernameInput: string;
  // handleUserNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // handleVerify: () => void;
  slides: JSX.Element[];
  onBoardingStatus: { valid: boolean | null; msg: string };
}

const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  slides,
  onBoardingStatus,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? 0 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const handleNextSlide = () => {
    console.log(onBoardingStatus.valid);

    if (onBoardingStatus.valid) {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? slides.length - 1 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: "30%" }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              ease: "easeInOut",
              duration: 0.3, // Adjust the duration as needed
              //   delay: 0.5,
            },
          }}
          exit={{ opacity: 0, y: "-30%" }}
          className="flex flex-col gap-4 min-h-24 px-4"
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center bg-white justify-between  p-2 z-30 gap-4 cursor-pointer">
        <button
          disabled={currentIndex === 0}
          onClick={() => {
            handlePrevSlide();
          }}
          className="flex items-center hover:underline disabled:text-gray-600 disabled:cursor-not-allowed "
        >
          <FaChevronLeft className=" " fontSize={18} />
          Prev
        </button>{" "}
        <button
          disabled={
            !onBoardingStatus.valid || currentIndex === slides.length - 1
          }
          onClick={() => {
            handleNextSlide();
          }}
          className={`flex items-center hover:underline cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed 
        `}
        >
          Next <FaChevronRight className="" fontSize={18} />
        </button>
      </div>
    </>
  );
};

export default OnboardingSlider;
