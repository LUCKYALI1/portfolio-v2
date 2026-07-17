import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SectionWrapper = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

export default SectionWrapper;