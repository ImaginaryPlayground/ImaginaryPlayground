import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ocean from "./pages/ocean";
import Jungle from "./pages/jungle";
import Map from "./pages/map";
import Universe from "./pages/universe";
import JungleBackground from "./components/jungle/JungleBackground";
import OceanCopy from "./pages/OceanCopy";
import OceanCopyIntro from "./pages/OceanCopyIntro";
import JungleIntro from "./pages/JungleIntro";
import UniverseIntro from "./pages/UniverseIntro";
import UniverseOutro from "./components/universeOutro/UniverseOutro";
import Christmas from "./pages/Christmas";
import LoginPage from "./pages/LoginPage";
import OceanMotionTest from "./pages/OceanMotionTest";

import "../src/App.css";
import ChristmasPresentation from "./pages/ChristmasPresentation";

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
          <Route path="/ocean-motion" element={<OceanMotionTest />} />
          <Route path="/christmas" element={<Christmas />} />
          <Route
            path="/christmas-presentation"
            element={<ChristmasPresentation />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
