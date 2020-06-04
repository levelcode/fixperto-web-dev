import React from 'react';
import Login from "../login/loginVista";
class Ingreso extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: "" };
	}
	componentDidMount() { }

	olvidoPassword = () => {
	}
	render() {
		return (
			<React.Fragment>
				<div className="w3-container w3-center fondPage w3-text-white">
					<br />
					<div className="w3-section" style={{ marginInlineStart: 25 + "%", marginInlineEnd: 25 + "%" }}>
						<h1><b>Bienvenido</b></h1>
						<p className="w3-section">Todo lo que necesitas en arreglos para tu <b>casa, oficina y trabajo</b> en un sólo lugar.</p>
						<br />
						<br />
						<Login />
						<br />
						<br />
						<button className="w3-button w3-indigo w3-border w3-border-blue w3-round-large w3-block w3-text-blue">REGISTRARME</button>
						<div className="w3-section">
							<b className="w3-text-blue textLink" onClick={() => { this.olvidoPassword() }}>¿Olvidaste tu contraseña?</b>
						</div>
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default Ingreso;