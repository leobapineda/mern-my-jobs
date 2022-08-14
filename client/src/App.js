import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing } from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<h1>register</h1>} />
        <Route path="*" element={<h1>Error not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
