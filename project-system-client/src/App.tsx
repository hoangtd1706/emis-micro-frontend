import * as React from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Projects from './pages/Projects';

registerAllModules();


export function App() {
  return <BrowserRouter>
    <Link to={"/project_system"} >Project he</Link>
    <Routes>
      <Route path="project_system" element={<Projects />} />
    </Routes>
  </BrowserRouter>;
}
