import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordFieldType = () => {
    setPasswordFieldType(
      passwordFieldType === "password" ? "text" : "password"
    );
  };

  const handleForgotPassword = async () => {
    setLoading(true); // Set loading state to true when initiating password reset
    setError(null); // Reset any previous errors

    if (email === "") {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Please check your inbox.");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/user-not-found":
          setError("No user found with this email address.");
          break;
        default:
          setError(
            "Failed to send password reset email. Please try again later."
          );
          break;
      }
    } finally {
      setLoading(false); // Set loading state to false after the process completes
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when logging in

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log("User logged in:", user.uid);

      const db = getDatabase(app);
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUserSession(user.uid, userData.username);
      }

      navigate("/home", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/user-disabled":
          setError("Your account has been disabled.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        default:
          setError("An error occurred during login. Please try again later.");
          break;
      }
    } finally {
      setLoading(false); // Set loading state to false when login process finishes
    }
  };

  const setUserSession = (userId, userName) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen text-black">
      <img
        src="bottom-right.png"
        alt=""
        className="select-none absolute bottom-0 right-0"
      />

      <div className="relative bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-7/12 h-4/6 flex justify-center items-center">
        <img
          src="top-right.png"
          alt=""
          className="select-none absolute -top-20 -right-16 "
        />
        <img
          src="top-left.png"
          alt=""
          className="select-none absolute -top-28 -left-60"
        />
        <div className="absolute top-14 left-28 mt-4 ml-4">
          <Link to="/">
            <img src="back.png" alt="" />
          </Link>
        </div>
        <div className="w-full text-center">
          <form className="flex flex-col items-center" onSubmit={handleLogin}>
            <div className="flex rela w-3/6">
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <div className="flex relative w-3/6 justify-center items-center">
              <input
                type={passwordFieldType}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
              <div
                className="absolute right-7 top-4 cursor-pointer"
                onClick={togglePasswordFieldType}
              >
                {passwordFieldType === "password" ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <div>
              <a
                onClick={handleForgotPassword}
                className="text-cyan-600 underline cursor-pointer"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={`bg-emerald-600 text-white px-4 py-2 rounded-md w-1/5 mb-8 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-2.582V20c4.418 0 8-3.582 8-8h-4a3.993 3.993 0 01-3.532 3.984l-.734.147z"
                  ></path>
                </svg>
              ) : (
                "Log In"
              )}
            </button>
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <p className="text-sm text-center">
                Don&apos;t have an account?{" "}
                <Link to="/SignUp" className=" text-cyan-600 underline">
                  SignUp
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
