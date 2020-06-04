import React from 'react';
import Login from "../login/loginVista";
import Ingreso from "../ingreso/ingresoVista";

import { Link } from "react-router-dom"; import { Route, Switch } from "react-router";
class Perfil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() { }

	olvidoPassword = () => {
	}
	render() {
		return (
			<React.Fragment>
				<div className="w3-container w3-margin-top">
					<div className="w3-sidebar w3-bar-block" style={{ width: 20 + "%" }}>
						<Link to="/perfil/login" className="w3-bar-item w3-button w3-border w3-teal">Login</Link>
						<Link to="/perfil/registro" className="w3-bar-item w3-button w3-border w3-teal">Ingreso</Link>

					</div>
					<div className="w3-container" style={{ marginLeft: 20 + '%' }}>
						<Switch>
							<Route path="/perfil/login" component={Login} />
							<Route path="/perfil/registro" component={Ingreso} />
						</Switch>
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default Perfil;



