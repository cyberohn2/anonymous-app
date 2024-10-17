import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import Message from "./components/Message"
import Profile from "./components/Profile"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return (
    <div className=" font-Inter bg-[#2b2b2b] max-w-[810px] min-h-[100vh] lg:min-h-[90vh]">
      <Router>
        {/* static components */}
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/message" element={<Message />}></Route>
          <Route exact path="/user-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
