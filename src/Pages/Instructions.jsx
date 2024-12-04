import { Link } from "react-router-dom";

const Instructions = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen text-black relative">
      <div className="relative bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-7/12 h-5/6 flex flex-col justify-start items-center pt-8">
        <div className="text-center mt-8 overflow-hidden">
          <div className="flex relative">
            <Link to="/Home" className="absolute ml-10">
              <img src="back.png" alt="Back Button" />
            </Link>
            <h1 className="text-4xl font-bold text-black mb-2 underline text-center w-full">
              Instructions
            </h1>
          </div>

          <div className="flex justify-center items-center h-full">
            <div className="text-2xl font-itim text-black overflow-y-auto h-full w-11/12 no-scrollbar text-left">
              <h1 className="md:text-lg lg:text-xl">
                <span className="font-bold text-3xl md:text-xl lg:text-3xl">
                  Objective:
                </span>{" "}
                Find the hidden number in the math equations before time runs
                out and without losing all your lives. Earn extra points with
                random bonus questions!
              </h1>

              <h1 className="md:text-lg">
                <p className="font-bold text-3xl md:text-xl lg:text-3xl">
                  Difficulty Levels:
                </p>
                <div className="ml-16">
                  <ul className="list-disc">
                    <li>
                      <h1>Banana Bash: 5 lives and 30 seconds per question.</h1>
                    </li>
                    <li>
                      <h1>
                        Banana Blitz: 3 lives and 20 seconds per question.
                      </h1>
                    </li>
                    <li>
                      <h1>
                        Banana Frenzy: 3 lives and 15 seconds per question.
                      </h1>
                    </li>
                  </ul>
                </div>
              </h1>

              <h1 className="md:text-lg">
                <p className="font-bold text-3xl md:text-xl lg:text-3xl">
                  PlayGame:
                </p>
                <div className="ml-16">
                  <ul className="list-disc">
                    <li>
                      <h1>
                        Solve math equations with numbers hidden behind bananas.
                        Pick the correct number to score 1 point and move to the
                        next question.
                      </h1>
                    </li>
                    <li>
                      <h1>
                        Every 5 questions, you&apos;ll get a random bonus quiz.
                        Answer correctly: Earn 5 extra points. Answer wrong:
                        Your score stays the same (no penalty).
                      </h1>
                    </li>
                    <li>
                      <h1>
                        Be careful! Picking the wrong number in regular
                        questions or running out of time costs a life.
                      </h1>
                    </li>
                    <li>
                      <h1>
                        The game ends if you lose all your lives or run out of
                        time.
                      </h1>
                    </li>
                  </ul>
                </div>
              </h1>

              <h1 className="md:text-lg ">
                <p className="font-bold text-3xl">Tips:</p>
                <div className="ml-16">
                  <ul className="list-disc">
                    <li>
                      <h1>Focus on the equations to find the right number.</h1>
                    </li>
                    <li>
                      <h1>Keep track of the timer and your remaining lives.</h1>
                      <h1>
                        Bonus quizzes are a great chance to boost your score!
                      </h1>
                    </li>
                  </ul>
                </div>
              </h1>

              <h1 className="md:text-lg ">
                <span className="font-bold text-3xl">Restart: </span>You can
                restart the game anytime by clicking the Restart button.
              </h1>
              <h1 className="text-center text-4xl mt-2 mb-14">
                Challenge yourself, boost your score, and show your math skills
                in the Banana Quiz Game!
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-28 -z-10 left-0 w-full flex justify-between p-4 opacity-10">
        <img src="bg.png" alt="Background Image 1" className="w-1/2" />
        <img src="bg.png" alt="Background Image 2" className="w-1/2" />
      </div>
    </div>
  );
};

export default Instructions;
