import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import homeRoutes from "../1-pages/0-home/routes";
import productRoutes from "../1-pages/1-product/routes";

const allRoutes = [].concat(homeRoutes, productRoutes);

export default (
  <HashRouter>
    <Switch>
      {allRoutes.map(item => <Route key={item.path} exact {...item} />)}
    </Switch>
  </HashRouter>
);
