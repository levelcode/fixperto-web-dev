import React from 'react';
import Login from "../login/loginVista";
import HeaderInicio from "../../componentes/headerInicio";
class Ingreso extends React.Component {
	constructor(props) { super(props); this.state = {}; }
	render() {
		return (
			<React.Fragment>
				<HeaderInicio history={this.props["history"]} />
				<div className="w3-row">
					<div className="w3-quarter w3-container" />
					<div className="w3-half w3-container w3-center">
						<div className="w3-container fondPage w3-text-white w3-round-large w3-margin-top">
							<h1><b>Bienvenido</b></h1>
							<p className="w3-section">Todo lo que necesitas en arreglos para tu <b>casa, oficina y trabajo</b> en un sólo lugar.</p>
							<br />
							<br />
							<Login history={this.props["history"]} />
						</div>
					</div>
					<div className="w3-quarter w3-container" />
				</div>
			</React.Fragment >
		);
	}
}

export default Ingreso;