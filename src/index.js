import React from "react";
import ReactDOM from "react-dom";
import 'w3-css/w3.css';
import "./style/index.css";
import rutas from "./rutas";
import { Router, Route, Switch } from "react-router";
import * as serviceWorker from './serviceWorker';
const Redirect = require("react-router").Redirect
const historia = require("history").createBrowserHistory();
const routes = (
	<Router history={historia}>
		<Switch>
			{rutas.map((route, i) => (
				<Route key={i} path={route.path} render={(props) => (<route.component {...props} history={historia} rutes={route.sub_routes} />)} />
			))}
			<Redirect from="/" to="/ingreso" />
		</Switch>
	</Router>
);
ReactDOM.render(routes, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();