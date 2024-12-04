import { Link } from "react-router-dom";

const GameModule = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen text-black">
      <div className="relative bg-[#A8A8A87A] bg-opacity-45 rounded-3xl w-7/12 h-4/6 flex flex-col justify-center items-center">
        
        <div className="text-center -mt-96">
          <h1 className="text-5xl font-extrabold text-black mb-2">BANANA QUIZ GAME</h1>
          <h2 className="text-3xl font-bold text-black mb-2 underline">Banana Bash</h2>
         <h1 className="text-xl font-bold text-black mr-96 ">Lives:</h1>
    <h1 className="text-xl font-bold text-black -mt-5 ml-96 ">Time Left:</h1>
          <div className="absolute top-40 left-2 -mt-32 ml-8">
           <Link to="/Home">
          <img src="back.png" alt="" />
           </Link>

 

    <div className="flex justify-center items-center space-x-4 mt-96 ml-56 ">
  {Array.from({ length: 10 }, (_, index) => (
    <button
      key={index}
      className="rounded-full w-12 h-12 bg-[#A8A8A87A] text-black hover:bg-amber-600 transition-colors duration-300 bg-opacity-45"
    >
      {index}
    </button>
  ))}
</div>

         </div>
        </div>         
    </div >


    <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 ">
 <Link to="/Home">
            <button
              type="submit"
              className="rounded-full w-24 h-10 m- bg-emerald-600 text-white text-xl  hover:bg-white hover:text-emerald-600 py-2 transition-colors duration-300 "
            >
              Restart
            </button>
            </Link>

    </div>
    </div>
  )
}

export default GameModule
