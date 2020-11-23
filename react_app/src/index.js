/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import WPISingle from "views/examples/WPISingle.js";
import WPICsv from "./views/examples/WPICsv";
import DroughtTool from "./views/examples/DroughtTool";
import ET from "views/examples/ET";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={props => <Index {...props} />} />
      <Route
        path="/wpi-single"
        render={props => <WPISingle {...props} />}
      />
      <Route
        path="/drought-tool"
        render={props => <DroughtTool {...props} />}
      />
      <Route
        path="/wpi-csv"
        render={props => <WPICsv {...props} />}
      />
      <Route
        path="/et"
        render={props => <ET {...props} />}
      />
      <Redirect from="/" to="/components" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
