import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";

import "../src/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/login" element={<LoginPage />} />
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
