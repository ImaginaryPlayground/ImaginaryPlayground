import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ocean from "./pages/ocean";
import Jungle from "./pages/jungle";
import Map from "./pages/map";
import Universe from "./pages/universe";
import Test from "./pages/Test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/ocean" element={<Ocean />} />
          <Route path="/jungle" element={<Jungle />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
