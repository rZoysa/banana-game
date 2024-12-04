import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  limitToLast,
  get,
} from "firebase/database";
import confetti from "canvas-confetti";

const ScoreBoard = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const [scoreboardData, setScoreboardData] = useState([]);
  const [previousTopScore, setPreviousTopScore] = useState(null);
  var userName = localStorage.getItem("userName");

  const fetchScoreboardData = async () => {
    const db = getDatabase();
    const difficultyRef = query(
      ref(db, "users"),
      orderByChild(difficulty),
      limitToLast(10)
    );

    const snapshot = await get(difficultyRef);
    if (snapshot.exists()) {
      const leaderboardData = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        leaderboardData.push({
          username: user.username,
          score: user[difficulty],
        });
      });

      leaderboardData.sort((a, b) => b.score - a.score);

      // Check if the top score has changed
      if (
        leaderboardData[0]?.score !== previousTopScore &&
        leaderboardData[0]?.score > (previousTopScore || 0)
      ) {
        triggerFireworks();
      }

      setScoreboardData(leaderboardData);
      setPreviousTopScore(leaderboardData[0]?.score || 0);
    }
  };

  const triggerFireworks = () => {
    confetti({
      particleCount: 500,
      spread: 200,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    switch (selectedTab) {
      case 1:
        setDifficulty("easy");
        break;
      case 2:
        setDifficulty("medium");
        break;
      case 3:
        setDifficulty("hard");
        break;
      default:
        break;
    }
  }, [selectedTab]);

  useEffect(() => {
    fetchScoreboardData();
  }, [difficulty]);

  return (
    <div
      className="flex justify-center items-center h-screen w-screen text-black relative bg-center"
      style={{
        backgroundImage: "url('bg.png')",
        backgroundSize: "80%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for reducing opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      <div className="relative z-30 bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-7/12 h-5/6 flex flex-col justify-start items-center pt-8">
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-black mb-2 underline">
            Score Table
          </h1>

          <div className="absolute top-40 left-2 -mt-20 ml-8">
            <Link to="/Home">
              <img src="back.png" alt="Back Button" />
            </Link>
          </div>
        </div>

        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setSelectedTab(1)}
            className={`py-2 px-4 rounded-3xl ${
              selectedTab === 1
                ? "bg-emerald-600 text-white text-xl py-2 transition-colors duration-300"
                : "bg-gray-200 text-gray-700 hover:bg-emerald-300 transition-colors duration-300"
            }`}
          >
            Banana Bash
          </button>
          <button
            onClick={() => setSelectedTab(2)}
            className={`py-2 px-4 rounded-3xl ${
              selectedTab === 2
                ? "bg-emerald-600 text-white  text-xl py-2 transition-colors duration-300"
                : "bg-gray-200 text-gray-700 hover:bg-emerald-300 transition-colors duration-300"
            }`}
          >
            Banana Blitz
          </button>
          <button
            onClick={() => setSelectedTab(3)}
            className={`py-2 px-4 rounded-3xl ${
              selectedTab === 3
                ? "bg-emerald-600 text-white  text-xl  py-2 transition-colors duration-300"
                : "bg-gray-200 text-gray-700 hover:bg-emerald-300 transition-colors duration-300"
            }`}
          >
            Banana Frenzy
          </button>
        </div>

        {/* Scoreboard positions */}
        <div className="relative w-full h-1/2 flex justify-between items-center">
          {scoreboardData[1] && (
            <div className="absolute left-1/4 top-20 flex flex-col items-center">
              <div
                className={`bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-full shadow-lg mb-2 ${
                  scoreboardData[1].username === userName
                    ? `bg-blue-400`
                    : `bg-gray-200`
                }`}
              >
                {scoreboardData[1].username}
              </div>
              <img
                src="second.png"
                alt="2nd Place"
                className="select-none w-36 h-36"
              />
            </div>
          )}
          {scoreboardData[0] && (
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div
                className={`bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-full shadow-lg mb-2${
                  scoreboardData[0].username === userName
                    ? `bg-blue-400`
                    : `bg-gray-200`
                }`}
              >
                {scoreboardData[0].username}
              </div>
              <img
                src="first.png"
                alt="1st Place"
                className="select-none w-40 h-40"
              />
            </div>
          )}
          {scoreboardData[2] && (
            <div className="absolute right-1/4 top-20 flex flex-col items-center">
              <div
                className={`text-gray-800 text-center py-2 px-4 rounded-full shadow-lg mb-2 ${
                  scoreboardData[2].username === userName
                    ? `bg-blue-400`
                    : `bg-gray-200`
                }`}
              >
                {scoreboardData[2].username}
              </div>
              <img
                src="third.png"
                alt="3rd Place"
                className="select-none w-36 h-36"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-16 w-full px-8 mb-5">
          {scoreboardData.slice(3, 9).map((user, index) => (
            <div
              key={index}
              className={`flex flex-col items-center bg-gray-200 text-gray-800 py-4 px-6 rounded-lg shadow-md ${
                user.username === userName ? `bg-blue-400` : `bg-gray-200`
              }`}
            >
              <div className="text-lg font-bold">#{index + 4}</div>
              <div className="text-center mt-2">{user.username}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
