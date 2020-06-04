import React from "react";
import ReactDOM from "react-dom";
import 'w3-css/w3.css';
import Core from "./Core";
import Ingreso from "./vistas/ingreso/ingresoVista";
import Registro from "./vistas/registro/registroVista";
import Beneficios from "./vistas/registro/beneficiosVista";
import CodigoSms  from "./vistas/registro/codigoVista";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

const routes = (
	<BrowserRouter>
		<Switch>
			<Route path="/home" component={Core} />
			<Route path="/ingreso" component={Ingreso} />
			<Route path="/registro" component={Registro} />
			<Route path="/beneficios" component={Beneficios} />
			<Route path="/codigosms" component={CodigoSms} />
			<Redirect from="/" to="/ingreso" />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));
