import React from "react";
import ReactDOM from "react-dom";
import 'w3-css/w3.css';
import "./style/index.css";
import rutas from "./rutas";
import { Router, Route, Switch } from "react-router";
const Redirect = require("react-router").Redirect
const historia = require("history").createBrowserHistory();
const routes = (
	<Router history={historia}>
		<Switch>
			{rutas.map((route, i) => (
				<Route key={i} path={route.path} render={() => (<route.component history={historia} rutes={route.sub_routes} />)} />
			))}
			<Redirect from="/" to="/ingreso" />
		</Switch>
	</Router>
);
ReactDOM.render(routes, document.getElementById("root"));
