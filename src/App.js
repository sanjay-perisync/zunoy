import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "./Redux/Store/Store";

import Login from "./Components/Login";
import Register from "./Components/Register"; 
import SetupPassword from "./Components/SetupPassword";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setup-password" element={<SetupPassword />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
