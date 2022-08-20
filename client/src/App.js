import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Error, Dashboard, Register } from "./pages";

function App() {

  // console.log(useGlobalContext());


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
