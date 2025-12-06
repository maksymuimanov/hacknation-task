import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./components/homepage/Home.tsx";
import Citizen from "./components/citizen/Citizen.tsx";
import CivilServant from "./components/civil-servant/CivilServant.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obywatel" element={<Citizen />} />
        <Route path="/urzednik" element={<CivilServant />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
