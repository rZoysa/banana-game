import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Game_summary } from "../components/game_summary";
import "ldrs/bouncy";
import MathChallengePopup from "../components/extra_challenge_popup";
import { motion } from "motion/react";

const GameModule = () => {
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [solution, setSolution] = useState("");
  const [lives, setLives] = useState(5);
  const [difficulty, setDifficulty] = useState("Bash");
  const [difficultyKeyword, setDifficultyKeyword] = useState("easy");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [incorrectStreak, setIncorrectStreak] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false); // Game Over state to trigger the popup
  const [loading, setLoading] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showMathChallenge, setShowMathChallenge] = useState(false);
  const [progress, setProgress] = useState(1);
  const [initialTimer, setInitialTimer] = useState();

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const selectedDifficulty = query.get("difficulty") || "Bash";
    setDifficulty(selectedDifficulty);

    switch (selectedDifficulty) {
      case "Bash":
        setLives(5);
        setDifficultyKeyword("easy");
        setCountdown(30);
        setInitialTimer(30);
        break;
      case "Blitz":
        setLives(4);
        setDifficultyKeyword("medium");
        setCountdown(20);
        setInitialTimer(20);
        break;
      case "Frenzy":
        setLives(3);
        setDifficultyKeyword("hard");
        setCountdown(10);
        setInitialTimer(10);
        break;
      default:
        setLives(5);
        setCountdown(30);
        setInitialTimer(30);
    }
  }, [location.search]);

  const fetchBananaData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://marcconrad.com/uob/banana/api.php?out=json&base64=no"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      if (!data.question || !data.solution) {
        throw new Error("Invalid data received from API");
      }
      setImageUrl(data.question);
      setSolution(data.solution);
      console.log("Correct Answer:", data.solution);
    } catch (error) {
      console.error("Error fetching banana data:", error);
      // setError("Failed to load banana data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadNewQuestion = async () => {
    if (lives === 0) {
      setGameOver(true); // Set the game to over if lives are zero
      return;
    }
    await fetchBananaData();
    setFeedbackMessage("");
    resetTimer(); // Reset the timer when a new question loads.
  };

  useEffect(() => {
    if (lives > 0) {
      loadNewQuestion();
    }
  }, [lives]);

  useEffect(() => {
    if (gameOver || showMathChallenge) {
      return;
    }

    if (countdown === 0) {
      handleTimerEnd(); // Handle timer reaching zero.
    } else {
      // Stop timer when game is over
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, gameOver, showMathChallenge]);

  const resetTimer = () => {
    if (gameOver) return; // Don't reset the timer if the game is over
    switch (difficulty) {
      case "Bash":
        setCountdown(30);
        break;
      case "Blitz":
        setCountdown(20);
        break;
      case "Frenzy":
        setCountdown(10);
        break;
      default:
        setCountdown(30);
    }
  };

  const handleTimerEnd = () => {
    if (lives > 0) {
      setLives((prev) => prev - 1); // Deduct a life when time runs out.
      setIncorrectStreak(0); // Reset incorrect streak.

      if (lives === 1) {
        setGameOver(true); // Trigger game over immediately when lives hit zero
      }
    }
  };

  const handleAnswerClick = async (answer) => {
    if (gameOver) return; // Prevent answering when the game is over
    if (!imageUrl || !solution) {
      console.error("Banana data or answer is missing", imageUrl);
      setFeedbackMessage("Error! Unable to process answer.");
      return;
    }

    if (answer.toString() === solution.toString()) {
      setScore((prev) => prev + 1);
      setFeedbackMessage("Correct! 🎉");
      setIncorrectStreak(0);
      setQuestionsAnswered((prev) => prev + 1);
    } else {
      setFeedbackMessage("Incorrect! ❌");
      setIncorrectStreak((prev) => prev + 1);

      if (incorrectStreak + 1 >= 2) {
        setLives(lives - 1);
        setIncorrectStreak(0);
      }
    }

    if (lives === 1) {
      setGameOver(true); // Trigger game over immediately when lives hit zero
    } else if ((questionsAnswered + 1) % 5 === 0) {
      setShowMathChallenge(true); // Show popup every 10 questions
    } else {
      setTimeout(() => {
        loadNewQuestion();
      }, 1000);
    }
  };

  const restartGame = () => {
    setGameOver(false); // Hide the Game Over popup
    setScore(0);
    setError(null);
    setFeedbackMessage("");
    setLives(difficulty === "Bash" ? 5 : difficulty === "Blitz" ? 4 : 3);
    setIncorrectStreak(0);
    resetTimer();
    loadNewQuestion();
  };

  const getLivesImage = () => {
    switch (difficulty) {
      case "Bash":
        return "/Bash.png";
      case "Blitz":
        return "/Blitz.png";
      case "Frenzy":
        return "/Frenzy.png";
      default:
        return "/Bash.png";
    }
  };

  const closeSummary = () => {
    setGameOver(false);
  };

  const handleMathChallengeSuccess = () => {
    setScore((prev) => prev + 5); // Add 5 points for solving correctly
  };

  const closeMathChallengePopup = () => {
    setShowMathChallenge(false);
    loadNewQuestion(); // Continue game after the popup
  };

  useEffect(() => {
    const newProgress = countdown / initialTimer; // Assuming the timer starts from 60 seconds
    setProgress(newProgress);    
  }, [countdown, initialTimer]);

  return (
    <div className="flex justify-center items-center h-screen w-screen text-black">
      {showMathChallenge && (
        <MathChallengePopup
          onClose={closeMathChallengePopup}
          onSuccess={handleMathChallengeSuccess}
        />
      )}
      <div className="relative bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-8/12 h-5/6 flex flex-col items-center">
        <div className="text-center mt-4">
          <h1 className="text-5xl font-extrabold text-black mb-2">
            BANANA QUIZ GAME
          </h1>
          <h2 className="text-3xl font-bold text-black mb-4 underline">
            {difficulty === "Bash"
              ? "Banana Bash"
              : difficulty === "Blitz"
              ? "Banana Blitz"
              : "Banana Frenzy"}
          </h2>
        </div>

        <div className="w-full">
          <div className="flex justify-between w-full px-10 items-center">
            <div>
              <h1 className="text-xl font-bold">Lives:</h1>
            </div>
            <div>
              <p className="font-bold text-4xl font-itim text-black text-center select-none">
                Score: {score}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center font-itim select-none">
                <p className="text-black font-bold font-itim text-4xl">
                  Timer:
                </p>
                <svg
                  id="progress"
                  width="75"
                  height="55"
                  viewBox="10 20 75 55"
                  className="top-4 left-4"
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="20"
                    className={`${
                      countdown > 3 ? "text-black" : "text-red-600"
                    } stroke-current `}
                    strokeDasharray={2 * Math.PI * 20} //Circumference of the circle
                    strokeDashoffset={2 * Math.PI * 20 * (1 - progress)}
                    fill="none"
                    strokeWidth="8"
                    transform="rotate(-90 50 50)"
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 20 * (1 - progress),
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />

                  <text
                    x="50"
                    y="50"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-black font-bold text-2xl fill-current"
                  >
                    {countdown}
                  </text>
                </svg>
              </div>
              {/* <h1 className="text-xl font-bold">Time Left:</h1>
              <h1 className="text-xl font-bold">{countdown}s</h1> */}
            </div>
          </div>
          <div className="relative">
            <div className="flex space-x-2 ml-10">
              {Array.from({ length: lives }, (_, index) => (
                <img
                  key={index}
                  disabled={!imageUrl || !solution || loading}
                  src={getLivesImage()}
                  alt="Life"
                  className="w-12 h-15"
                />
              ))}
            </div>
            {feedbackMessage && (
              <p
                className={`text-4xl font-bold text-center absolute top-1/4 left-1/2 transform -translate-x-1/2 ${
                  feedbackMessage === "Correct! 🎉"
                    ? `text-green-800`
                    : `text-red-800`
                }`}
              >
                {feedbackMessage}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center flex-grow">
          {loading ? (
            <div>
              <l-bouncy size={55} speed={1.8} color={"black"}></l-bouncy>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Banana"
              className="w-11/12 object-fill z-0"
            />
          )}
        </div>

        <div className="mt-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : imageUrl ? (
            <p className="text-lg font-medium">Select The Correct Answer</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4 mb-2">
          {Array.from({ length: 10 }, (_, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`rounded-full w-12 h-12 bg-[#A8A8A87A] text-black hover:bg-amber-600 transition-colors duration-300 bg-opacity-45`}
            >
              {index}
            </button>
          ))}
        </div>

        <div className="mt-auto mb-4 flex flex-col items-center">
          <Link to="/Difficulty">
            <button
              onClick={restartGame}
              type="submit"
              className="rounded-full w-24 h-10 bg-emerald-600 text-white text-xl hover:bg-white hover:text-emerald-600 py-2 transition-colors duration-300"
            >
              Restart
            </button>
          </Link>
        </div>

        <div className="absolute top-4 left-4">
          <Link to="/Difficulty">
            <img src="back.png" alt="Back" />
          </Link>
        </div>
      </div>

      {gameOver && (
        // <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
        //   <div className="bg-white p-8 rounded-lg text-center">
        //     <h2 className="text-4xl font-bold text-red-600">Game Over!</h2>
        //     <p className="mt-4 text-xl text-gray-800">
        //       You have lost all your lives. Try again!
        //     </p>
        //     <button
        //       onClick={restartGame}
        //       className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg"
        //     >
        //       Restart Game
        //     </button>
        //   </div>
        // </div>

        <Game_summary
          onClose={closeSummary}
          score={score}
          restartGame={restartGame}
          difficulty={difficultyKeyword}
        />
      )}
    </div>
  );
};

export default GameModule;
