import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen text-black relative">
      <img
        src="bottom-right.png"
        alt=""
        className="select-none absolute bottom-0 right-0"
      />

      <div className="relative bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-7/12 h-4/6 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-black absolute top-8 text-center underline">
          User Profile
        </h1>

        <img
          src="top-right.png"
          alt=""
          className="select-none absolute -top-20 -right-16"
        />
        <img
          src="top-left.png"
          alt=""
          className="select-none absolute -top-28 -left-60"
        />
        <div className="absolute top-14 left-28 mt-4 ml-4">
          <Link to="/Home">
            <img src="back.png" alt="Back" />
          </Link>
        </div>

        <div className="w-full mt-20 text-center">
          <form className="flex flex-col items-center">
            <div className="flex w-3/6">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <div className="flex w-3/6">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <div className="flex w-3/6">
              <input
                type="text"
                id="dateofbirth"
                placeholder="Date Of Birth"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <div className="flex w-3/6">
              <input
                type="tel"
                id="phonenumber"
                placeholder="Phone Number"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <div className="flex w-3/6">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <div className="flex w-3/6">
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                className="border rounded-3xl p-2 mb-2 shadow-md border-solid border-[#777777] w-full opacity-50 h-12"
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-full w-24 h-10 m-4 bg-emerald-600 text-white text-xl hover:bg-white hover:text-emerald-600 py-2 transition-colors duration-300"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
