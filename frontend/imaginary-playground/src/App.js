import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MiddlePage from "./pages/MiddlePage/MiddlePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import HomePage from "./pages/HomePage/HomePage";

import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import KidsInfoPage from "./pages/KidsInfoPage/KidsInfoPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import KidsInfoCreatePage from "./pages/KidsInfoPage/KidsInfoCreatePage";
import Mypage from "./pages/UserPage/Mypage";
import QnaListPage from "./pages/QnaPage/QnaListPage";
import QnaCreatePage from "./pages/QnaPage/QnaCreatePage";
import QnaDetailPage from "./pages/QnaPage/QnaDetailPage";
import { useEffect } from "react";
import Ocean from "./pages/ocean";
import Jungle from "./pages/jungle";
import Map from "./pages/map";
import Universe from "./pages/universe";
import JungleBackground from "./components/jungle/JungleBackground";
import OceanCopy from "./pages/OceanCopy";
import Test_yjh from "./pages/Test_yjh";
import OceanCopyIntro from "./pages/OceanCopyIntro";
import JungleIntro from "./pages/JungleIntro";
import UniverseIntro from "./pages/UniverseIntro";
import UniverseOutro from "./components/universeOutro/UniverseOutro";
import Christmas from "./pages/Christmas";
import "../src/App.css";

// let persistor = persistStore(store);
function App() {
  //const dispatch = useDispatch();
  useEffect(() => {
    //console.log(currentUser);
    // //비동기로 유저 정보 불러옴 그 후 토큰저장
  }, []);

  return (
    <div className="App">
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
          <Route path="/qnadetailpage" element={<QnaDetailPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/ocean" element={<Ocean />} />
          <Route path="/jungle" element={<Jungle />} />
          <Route path="/jungle-intro" element={<JungleIntro />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/universe-intro" element={<UniverseIntro />} />
          <Route path="/universe-outro" element={<UniverseOutro />} />
          <Route path="/junglebackground" element={<JungleBackground />} />
          <Route path="/ocean-copy" element={<OceanCopy />} />
          <Route path="/ocean-intro" element={<OceanCopyIntro />} />
          <Route path="/test-yjh" element={<Test_yjh />} />
          <Route path="/christmas" element={<Christmas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
