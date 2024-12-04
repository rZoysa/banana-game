import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Difficulty = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen text-black">
      <div className="relative bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-7/12 h-4/6 flex justify-center items-center">
        <ul className="list-disc text-6xl font-itim font-bold text-black ml-10 inline-block select-none z-10">
          <li className="transition-all hover:scale-125 m-7 w-fit">
            <motion.div
              className="box text-4xl underline"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/GameModule?difficulty=Bash">Banana Bash</Link>
            </motion.div>
          </li>
          <li className="transition-all hover:scale-125 m-7 w-fit">
            <motion.div
              className="box text-4xl underline"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/GameModule?difficulty=Blitz">Banana Blitz</Link>
            </motion.div>
          </li>
          <li className="transition-all hover:scale-125 m-7 w-fit">
            <motion.div
              className="box text-4xl underline"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/GameModule?difficulty=Frenzy">Banana Frenzy</Link>
            </motion.div>
          </li>
        </ul>
      </div>

      <div className="absolute top-40 left-28 mt-6 ml-80">
        <Link to="/Home">
          <img src="back.png" alt="Back" />
        </Link>
      </div>

      <img
        src="pic3.png"
        alt="Decorative"
        className="select-none absolute -bottom-32 -left-12 z-0"
      />
    </div>
  );
};

export default Difficulty;
