import { NavLink, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home";
import PageNotFound from "./Components/PageNotFound";
import Product from "./Components/Product";

const App = () => (
  <>
    <div className="flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={Product} path="/product" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
