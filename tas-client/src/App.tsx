import * as React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to={"/tas/a"}>Project A</Link>
        <Link to={"/tas/b"}>Project B</Link>
        <Routes>
          <Route path="/tas/a" element={<div>home</div>} />
          <Route path="/tas/b" element={<div>input</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
