import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; 
// import store from "./Redux/Store/Store/Store";

import Login from "./Components/Login";
import Register from "./Components/Register"; 
import SetupPassword from "./Components/SetupPassword";
import CompleteProfile from "./Components/CompleteProfile";
import MainPage from "./Components/MainPage";
import ResetPassword from "./Components/ResetPassword";
import Account from "./Components/Account";
import Security from "./Components/Security";
import Support from "./Components/Support";
import Billing from "./Components/Billing";
import CreateTicket from "./Components/CreateTicket";
import SupportTicketDetails from "./Components/SupportTicketDetails";

function App() {
  return (
    // <Provider store={store}>
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
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/security" element={<Security />} />
            <Route path="/support" element={<Support />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/support/create" element={<CreateTicket />} />
            <Route path="/support/details/:id" element={<SupportTicketDetails />} />

          </Routes>
        </div>
      </Router>
    // </Provider>
  );
}

export default App;
