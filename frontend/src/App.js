import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SignUpForm from './Pages/SignUpForm';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Adminpage from "./Pages/Adminpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Admin" element={<Adminpage />} />

      </Routes>
    </Router>
  );
}

export default App;

