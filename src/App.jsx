import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Difficulty from './Pages/Difficulty'
import User from './Pages/User'
import ScoreBoard from './Pages/ScoreBoard'
import GameModule from './Pages/GameModule'
import Instructions from './Pages/Instructions'
import ExtraQuiz from './Pages/ExtraQuiz'
import Clock from './Pages/Clock'

function App() {
  

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Difficulty" element={<Difficulty/>} />
      <Route path="/User" element={<User/>} />
      <Route path="/ScoreBoard" element={<ScoreBoard/>} />
      <Route path="/GameModule" element={<GameModule/>} />
      <Route path="/Instructions" element={<Instructions/>} />
      <Route path="/ExtraQuiz" element={<ExtraQuiz/>} />
      
    </Routes>
    {/* <Clock/> */}
   </Router>
  )
}

export default App
