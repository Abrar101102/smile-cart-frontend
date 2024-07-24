import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import PageNotFound from "./Components/commons/PageNotFound";
import Product from "./Components/Product";
import ProductList from "./Components/ProductList";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path="/products" />
    <Route exact component={Product} path="/products/:slug" />
    <Redirect exact from="/" to="/products" />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
