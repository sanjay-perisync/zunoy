import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register"; 
import SetupPassword from "./APIconfig/ConstantRootURL/SetupPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setup-password" element={<SetupPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
