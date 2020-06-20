import React from 'react';
import Login from "../login/loginVista";
import HeaderInicio from "../../componentes/headerInicio";
import Footer from "../../componentes/footer";
class Ingreso extends React.Component {
	constructor(props) { super(props); this.state = {}; }
	render() {
		return (
			<React.Fragment>
				<HeaderInicio history={this.props["history"]} />
				<div className="fondPage">
					<div className="w3-row w3-margin-bottom padd-general">
						<div className="w3-quarter w3-container" />
						<div className="">
							<div className="w3-container fondPage w3-text-white w3-round-large padd-general text-ingreso">
								<h1><b>Bienvenido</b></h1>
								<p className="margin-tb">Todo lo que necesitas en arreglos para tu <b>casa, oficina y trabajo</b> en un sólo lugar.</p>
								<br />
								<Login history={this.props["history"]} />
							</div>
						</div>
						<div className="w3-quarter w3-container" />
					</div>
					<Footer />
				</div>
			</React.Fragment >
		);
	}
}

export default Ingreso;