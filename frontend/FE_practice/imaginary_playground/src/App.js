import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ocean from "./pages/ocean";
import Jungle from "./pages/jungle";
import Map from "./pages/map";
import Universe from "./pages/universe";
import JungleBackground from "./components/jungle/JungleBackground";
import OceanCopy from "./pages/OceanCopy";
import Test_yjh from "./pages/Test_yjh";
import OceanCopyIntro from "./pages/OceanCopyIntro";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/ocean" element={<Ocean />} />
          <Route path="/jungle" element={<Jungle />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/junglebackground" element={<JungleBackground />} />
          <Route path="/ocean-copy" element={<OceanCopy />} />
          <Route path="/ocean-intro" element={<OceanCopyIntro />} />
          <Route path="/test-yjh" element={<Test_yjh />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
