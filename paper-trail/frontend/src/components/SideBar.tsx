import React from "react";
import { motion, type Variants } from "framer-motion";

// parent container variants (controls stagger)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // gap between each child animation
      delayChildren: 0.2, // delay before first animation starts
    },
  },
};

// each child animates left → right
const item: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SideBar() {
  return (
    <motion.div
      className="flex flex-col gap-12 p-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="">
        <motion.button
          variants={item}
          className="flex roboto p-2 rounded-lg text-white md:text-3xl font-light bg-cyan-400 cursor-pointer"
        >
          + Note
        </motion.button>
      </div>
      {/* SIDE MENU */}
      <motion.div variants={item}>
        <motion.div
          variants={item}
          className=" w-full outfit flex flex-col bg-white rounded-lg items-left p-2 gap-2"
        >
          <motion.h1
            variants={item}
            className="flex items-center justify-center font-semibold text-xl"
          >
            Menu
          </motion.h1>
          {["Dashboard", "My Notes", "Shared Notes", "Logout"].map(
            (menu, i) => (
              <motion.button
                key={i}
                variants={item}
                className="p-2 bg-gray-300 rounded-xl text-black font-medium cursor-pointer"
              >
                {menu}
              </motion.button>
            )
          )}
        </motion.div>
      </motion.div>

      {/* ACTIVITY */}
      <motion.div variants={item}>
        <motion.div
          variants={item}
          className="outfit flex flex-col bg-white rounded-lg items-left p-2 gap-2"
        >
          <motion.h1
            variants={item}
            className="flex items-center justify-center font-semibold text-xl"
          >
            Activity
          </motion.h1>
          {[
            "Edited Note-1 @ 6:30PM",
            "Edited Note-2 @ 7:30PM",
            "Edited Note-3 @ 8:30PM",
            "Edited Note-4 @ 9:30PM",
          ].map((activity, i) => (
            <motion.button
              key={i}
              variants={item}
              className="p-2 bg-gray-300 rounded-xl text-black font-medium cursor-pointer"
            >
              {activity}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SideBar;
