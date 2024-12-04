import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Profile_btn from "./profile_btn";

const Home = () => {
  const userId = localStorage.getItem("userId");

  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    if (userId) {
      // User is logged in
      setShowBackButton(false);
    } else {
      // User is not logged in
      setShowBackButton(true);
    }
  }, [userId]);

  return (
    <div className="flex justify-center items-center h-screen w-screen text-black">
      <div className="relative bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-7/12 h-4/6 flex justify-center items-center">
        <ul className="list-disc text-6xl font-itim font-bold text-black ml-10 inline-block select-none z-20">
          <li className="transition-all hover:scale-125 m-7 w-fit ">
            <motion.div
              className="box text-4xl underline"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/difficulty">Play Now</Link>
            </motion.div>
          </li>

          <li className="transition-all hover:scale-125 m-7 w-fit">
            <motion.div
              className="box text-4xl underline"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/ScoreBoard">Score Board</Link>
            </motion.div>
          </li>
          <li className="transition-all hover:scale-125 m-7 w-fit">
            <motion.div
              className="box text-4xl underline"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/Instructions">Instructions</Link>
            </motion.div>
          </li>
        </ul>
      </div>
      <div className="absolute top-40 right-96 mt-6 mr-5">
        <Profile_btn />
      </div>

      {showBackButton && (
        <div className="absolute top-44 left-28 mt-6 ml-80">
          <Link to="/">
            <img src="back.png" alt="" />
          </Link>
        </div>
      )}

      <img
        src="pic3.png"
        alt=""
        className="select-none absolute -bottom-32 -left-12 z-0"
      />
      <div></div>
    </div>
  );
};

export default Home;
