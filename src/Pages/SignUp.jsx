import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { app } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [PasswordMismatch, setPasswordMismatch] = useState("");
  const [PasswordSizeError, setPasswordSizeError] = useState("");
  const [UsernameTakenError, setUsernameTakenError] = useState("");
  const [DiasableButton, setDiasableButton] = useState(true);
  const [PasswordInputype, setPasswordInputype] = useState("password");

  const togglePasswordFieldType = () => {
    setPasswordInputype(PasswordInputype === "password" ? "text" : "password");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordMismatch("*Passwords do not match");
    } else {
      setPasswordMismatch("");
    }

    if (e.target.value.length < 6) {
      setPasswordSizeError("Password should be at least 6 characters long");
    } else {
      setPasswordSizeError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordMismatch("*Passwords do not match");
    } else {
      setPasswordMismatch("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch("Passwords do not match");
      return;
    }

    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerify(user);

      const uid = user.uid;

      const dbRef = ref(getDatabase(app));

      await set(child(dbRef, `users/${uid}`), {
        username: username,
        email: email,
        easy: 0,
        medium: 0,
        hard: 0,
      });


      setUserSession(uid, username);
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email address is already in use.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Choose a stronger password.");
          break;
        default:
          setError(
            "An error occurred during registration. Please try again later."
          );
          break;
      }
    }
  };

  const sendEmailVerify = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  const setUserSession = (userId, userName) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  };

  const checkUsernameExists = async (username) => {
    const dbRef = ref(getDatabase(app));
    const usernameRef = child(dbRef, "users");
    const snapshot = await get(usernameRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const usernames = Object.values(userData).map((user) =>
        user.username.toLowerCase()
      );
      if (usernames.includes(username.toLowerCase())) {
        setUsernameTakenError("Username already exists");
      } else {
        setUsernameTakenError("");
      }
    } else {
      setUsernameTakenError("");
    }
  };

  useEffect(() => {
    checkUsernameExists(username);
  }, [username]);

  useEffect(() => {
    if (
      UsernameTakenError !== "" ||
      PasswordSizeError !== "" ||
      PasswordMismatch !== ""
    ) {
      setDiasableButton(false);
    } else {
      setDiasableButton(true);
    }
  }, [PasswordSizeError, PasswordMismatch, UsernameTakenError]);

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
          <form className="flex flex-col items-center" onSubmit={handleSignup}>
            <div className="flex  w-3/6">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
              {UsernameTakenError && (
                <p className="text-red-500">{UsernameTakenError}</p>
              )}
            </div>

            <div className="flex  w-3/6">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <div className="relative w-3/6">
              <input
                type={PasswordInputype}
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
              <div
                className="absolute right-5 top-4 cursor-pointer"
                onClick={togglePasswordFieldType}
              >
                {PasswordInputype === "password" ? <FaEye /> : <FaEyeSlash />}
              </div>

              {PasswordSizeError && (
                <p className="text-red-500">{PasswordSizeError}</p>
              )}
            </div>

            <div className="relative w-3/6">
              <input
                type={PasswordInputype}
                id="confirmpassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
              <div
                className="absolute right-5 top-4 cursor-pointer"
                onClick={togglePasswordFieldType}
              >
                {PasswordInputype === "password" ? <FaEye /> : <FaEyeSlash />}
              </div>
              {PasswordMismatch && (
                <p className="text-red-500">{PasswordMismatch}</p>
              )}
              
            </div>

            <button
              type="submit"
              className={`rounded-full w-24 h-10 m-4 bg-emerald-600 text-white text-xl  hover:bg-white hover:text-emerald-600 py-2 transition-colors duration-300 ${
                !DiasableButton ? "opacity-50" : ""
              }`}
              disabled={!DiasableButton}
            >
              Sign Up
            </button>

            <div>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/Login" className=" text-cyan-600 underline">
                  Sign In
                </Link>
              </p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
