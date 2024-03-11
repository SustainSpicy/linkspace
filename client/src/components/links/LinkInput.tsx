import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";

interface InputProps {
  text: string;
  id: string;
  inputName: string;
  saveChanges: (data: {}) => void;
}
const LinkInput = ({ text, inputName, saveChanges }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(true);
  };
  const handleBlur = (e: any) => {
    saveChanges({ [e.target.name]: e.target.value });
    setActive(false);
  };

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //   saveChanges({ title });
      setActive(false);
    }
  };

  if (active) {
    return (
      <input
        ref={inputRef}
        type="text"
        name={inputName}
        id={inputName}
        className="w-full p-0 bg-transparent border-none outline-none focus:outline-none !important"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  }
  return (
    <div className="flex items-center gap-2">
      <h2
        className="flex items-center gap-2 cursor-pointer font-semibold text-gray-500"
        onClick={handleActive}
      >
        {text || inputName}
      </h2>

      <CiEdit className="cursor-pointer" />
    </div>
  );
};

export default LinkInput;
