import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CustomCardProps {
  children: ReactNode;
  className?: String;
}
const CardWrapper = ({ className, children }: CustomCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className={`${className} w-fit rounded-2xl overflow-hidden shadow-md `}
    >
      {children}
    </motion.div>
  );
};

export default CardWrapper;
