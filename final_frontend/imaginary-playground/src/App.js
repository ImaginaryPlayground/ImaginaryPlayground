import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MiddlePage from "./pages/MiddlePage/MiddlePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import HomePage from "./pages/HomePage/HomePage";

import store from "./redux/store";
import { Provider } from "react-redux";
import KidsInfoPage from "./pages/KidsInfoPage/KidsInfoPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import KidsInfoCreatePage from "./pages/KidsInfoPage/KidsInfoCreatePage";
import Mypage from "./pages/UserPage/Mypage";
import QnaListPage from "./pages/QnaPage/QnaListPage";
import QnaCreatePage from "./pages/QnaPage/QnaCreatePage";

let persistor = persistStore(store);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sadpage" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/middlepage" element={<MiddlePage />} />
              <Route path="/adminpage" element={<AdminPage />} />
              <Route path="/kidinfo" element={<KidsInfoPage />} />
              <Route path="/kidinfocreate" element={<KidsInfoCreatePage />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/qnapage" element={<QnaListPage />} />
              <Route path="/qnacreatepage" element={<QnaCreatePage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
