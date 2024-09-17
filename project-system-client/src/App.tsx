import * as React from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Projects from './pages/Projects';
import { styled } from 'styled-components';
import ProjectsMod from './pages/mod/Main';
import Orders from './pages/sale/Order';

registerAllModules();

export function App() {
  return (
    <WrapStl>
      <HashRouter>
        <Routes>
          <Route index element={<Projects />} />
          <Route path="mod" element={<ProjectsMod />} />
          <Route path="projects/:project_code/sale">
            <Route index element={<Orders />} />
            {/* <Route path="status" element={<Status />} /> */}
            {/* <Route path="ipc" element={<Payments />} /> */}
            {/* <Route path="compare" element={<Compare />} /> */}
            {/* <Route path="detail" element={<Detail />} /> */}
            {/* <Route path="schedule" element={<Schedule />} /> */}
            {/* <Route path="confirmation" element={<BillConfirmation />} /> */}
          </Route>
        </Routes>
      </HashRouter>
    </WrapStl>)
}


const WrapStl = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  padding: 12px;
  overflow: hidden;
  overflow-y: auto;
`