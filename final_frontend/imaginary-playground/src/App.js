import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MiddlePage from "./pages/MiddlePage/MiddlePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import HomePage from "./pages/HomePage/HomePage";

import { selectedkidStore } from "./redux/store";
import { Provider } from "react-redux";
import KidsInfoPage from "./pages/KidsInfoPage/KidsInfoPage";

function App() {
  return (
    <div className="App">
      <Provider store={selectedkidStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sadpage" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/middlepage" element={<MiddlePage />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/kidinfoPage" element={<KidsInfoPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
