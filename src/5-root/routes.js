import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import { Layout } from "0-components"
import ARoutes from "../1-pages/0-market-activity-set/routes";
import BRoutes from "../1-pages/1-task-market-analyze/routes";
import CRoutes from "../1-pages/2-warn/routes";

const allRoutes = [].concat(ARoutes, BRoutes, CRoutes);

export default (
  <HashRouter>
    <Layout>
      <Switch>
        {allRoutes.map(item => <Route key={item.path} exact {...item} />)}
      </Switch>
    </Layout>
  </HashRouter>
);
