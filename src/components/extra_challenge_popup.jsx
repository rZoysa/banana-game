import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MathChallengePopup = ({ onClose, onSuccess }) => {
  const [timeLeft, setTimeLeft] = useState(100);
  const [solution, setSolution] = useState(null);
  const [displayQuestion, setDisplayQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const generateMathEquation = () => {
      const operators = ["+", "-", "*", "/"];
      const randomOperator = () => operators[Math.floor(Math.random() * operators.length)];

      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const num3 = Math.floor(Math.random() * 10) + 1;
      const num4 = Math.floor(Math.random() * 10) + 1;

      const equation = `${num1} ${randomOperator()} ${num2} ${randomOperator()} ${num3} ${randomOperator()} ${num4}`;
      const calculatedSolution = eval(equation).toFixed(2); // Calculate solution

      // Replace "*" with "x" for display
      const displayEquation = equation.replace(/\*/g, "x");

      setDisplayQuestion(displayEquation);
      setSolution(parseFloat(calculatedSolution));

      // Generate options including the correct solution
      const generatedOptions = [parseFloat(calculatedSolution)];
      while (generatedOptions.length < 4) {
        const randomOption = parseFloat((Math.random() * 20 - 10).toFixed(2));
        if (!generatedOptions.includes(randomOption)) {
          generatedOptions.push(randomOption);
        }
      }

      // Shuffle options
      setOptions(generatedOptions.sort(() => Math.random() - 0.5));
    };

    generateMathEquation();

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [onClose]);

  useEffect(() => {
    if (timeLeft === 0) {
      onClose(); // Close popup when time runs out
    }
  }, [timeLeft, onClose]);

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
    setShowFeedback(true);

    setTimeout(() => {
      if (selectedOption === solution) {
        onSuccess(); // Add points if correct
      } else {
        setErrorMessage("Incorrect answer! No points awarded.");
      }
      onClose(); // Close popup after showing feedback
    }, 1000);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg">
        <h2 className="text-2xl font-bold">Solve This Equation to Get Extra 5 Points!</h2>
        <p className="text-lg mt-2">{displayQuestion}</p>
        <p className="text-gray-600">Time Left: {timeLeft}s</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`py-2 px-4 rounded-lg text-white 
                ${
                  showFeedback
                    ? option === solution
                      ? "bg-green-500"
                      : selectedOption === option
                      ? "bg-red-500"
                      : "bg-gray-400"
                    : "bg-emerald-600 hover:bg-yellow-600"
                }`}
              disabled={showFeedback} // Disable buttons after selection
            >
              {option}
            </button>
          ))}
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

MathChallengePopup.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MathChallengePopup;
