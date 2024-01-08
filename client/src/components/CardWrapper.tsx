import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CustomCardProps {
  children: ReactNode;
}
const CardWrapper = ({ children }: CustomCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className="bg-white rounded-lg overflow-hidden shadow-md p-6"
    >
      {children}
    </motion.div>
  );
};

export default CardWrapper;
