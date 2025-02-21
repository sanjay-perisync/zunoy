import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "./Redux/Store/Store";

import Login from "./Components/Login";
import Register from "./Components/Register"; 
import SetupPassword from "./Components/SetupPassword";
import CompleteProfile from "./Components/CompleteProfile";
import MainPage from "./Components/MainPage";
import ResetPassword from "./Components/ResetPassword";
import Account from "./Components/Account";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setup-password" element={<SetupPassword />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
