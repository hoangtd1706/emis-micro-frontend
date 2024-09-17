"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.App = void 0;
var React = require("react");
require("handsontable/dist/handsontable.full.min.css");
var registry_1 = require("handsontable/registry");
var react_router_dom_1 = require("react-router-dom");
var Projects_1 = require("./pages/Projects");
var styled_components_1 = require("styled-components");
var Main_1 = require("./pages/mod/Main");
var Order_1 = require("./pages/sale/Order");
registry_1.registerAllModules();
function App() {
    return (React.createElement(WrapStl, null,
        React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement(react_router_dom_1.Routes, null,
                React.createElement(react_router_dom_1.Route, { index: true, element: React.createElement(Projects_1["default"], null) }),
                React.createElement(react_router_dom_1.Route, { path: "mod", element: React.createElement(Main_1["default"], null) }),
                React.createElement(react_router_dom_1.Route, { path: "projects/:project_code/sale" },
                    React.createElement(react_router_dom_1.Route, { index: true, element: React.createElement(Order_1["default"], null) }))))));
}
exports.App = App;
var WrapStl = styled_components_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: block;\n  height: 100%;\n  width: 100%;\n  padding: 12px;\n  overflow: hidden;\n  overflow-y: auto;\n"], ["\n  display: block;\n  height: 100%;\n  width: 100%;\n  padding: 12px;\n  overflow: hidden;\n  overflow-y: auto;\n"])));
var templateObject_1;
