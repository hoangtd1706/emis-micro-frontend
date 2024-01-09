import * as React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {

  return <div>
    <BrowserRouter>
      <Link to={"/project/a"} >Project A</Link>
      <Link to={"/project/b"} >Project B</Link>
      <Routes>
        <Route path="/project/a" element={<div>home</div>} />
        <Route path="/project/b" element={<div>input</div>} />
      </Routes>
    </BrowserRouter>
  </div>;
}
