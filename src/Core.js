import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./style/index.css";
const Solicitudes = () => <div>Componente Solicitudes</div>;
const Servicios = () => <div>Componente servicios</div>;
const Chat = () => <div>Componente chat</div>;
const Perfil = () => <div>Componente perfil</div>;
class Core extends Component {
	render() {
		const { path } = this.props.match;

		return (
			<div>
				<h1>Hey welcome home!</h1>
				<div className="links">
					<Link to={`${path}/solicitudes`} className="link">
						Solicitudes
          </Link>
					<Link to={`${path}/servicios`} className="link">
						Servicios
          </Link>
					<Link to={`${path}/chat`} className="link">
						Chat
          </Link>
					<Link to={`${path}/perfil`} className="link">
						Perfil
          </Link>
				</div>
				<div className="tabs">
					<Switch>
						<Route path={`${path}/solicitudes`} exact component={Solicitudes} />
						<Route path={`${path}/servicios`} component={Servicios} />
						<Route path={`${path}/chat`} component={Chat} />
						<Route path={`${path}/perfil`} component={Perfil} />
					</Switch>
				</div>
			</div>
		);
	}
}
export default Core;
