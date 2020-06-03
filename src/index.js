import React from "react";
import ReactDOM from "react-dom";
import 'w3-css/w3.css';
import Core from "./Core";
import Registro from "./vistas/registro/registroVista";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

const routes = (
	<BrowserRouter>
		<Switch>
			<Route path="/home" component={Core} />
			<Route path="/registro" component={Registro} />
			<Redirect from="/" to="/registro" />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));
