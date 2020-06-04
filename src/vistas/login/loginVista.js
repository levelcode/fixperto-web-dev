import React from 'react';
import axios from 'axios';
import Alerta from "../../componentes/alertaVista";
import { validateEmail } from "../../constantes/funciones_auxiliares";
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showAlert: false, textoAlert: "", email: "", password: "" };
	}
	login = () => {
		if (this.state["email"] !== "" && this.state["password"] !== "") {
			if (!validateEmail(this.state["email"])) {
				this.setState({ showAlert: true, textoAlert: "Correo inválido, por favor verifíquelo" })
			}
			else {
				axios.post('https://server.fixperto.creactive.com.co/seguridad/login', {
					email: this.state["email"], password: this.state["password"]
				})
					.then(responseJson => {
						if (responseJson.success && responseJson["user"].length) {
							this.setState({ showAlert: true, textoAlert: "OKOK" })
						}
					})
					.catch((error) => {
						alert("ERROR")
						if (error.message === 'Timeout' || error.message === 'Network request failed') {

						}
					})
			}
		}
		else { this.setState({ showAlert: true, textoAlert: "Existen campos vacios" }); }
	}
	render() {
		const { email, password, showAlert, textoAlert } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<form className="w3-container">
					<div className="w3-row w3-section">
						<div className="w3-col" style={{ width: 50 + "px" }}><i className="w3-xxlarge fa fa-envelope-o"></i></div>
						<div className="w3-rest">
							<input className="w3-input w3-border w3-round-large" name="email" type="text" placeholder="Email" required
								value={email}
								onChange={(e) => this.setState({ email: e.target.value })}
							/>
						</div>
					</div>
					<div className="w3-row w3-section">
						<div className="w3-col" style={{ width: 50 + "px" }}><i className="w3-xxlarge fa fa-envelope-o"></i></div>
						<div className="w3-rest">
							<input className="w3-input w3-border w3-round-large" name="password" type="password" placeholder="Contraseña" required
								value={password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
						</div>
					</div>
					<div className="w3-center">
						<button type="button"
							className="w3-button w3-hover-indigo w3-indigo w3-round-large"
							style={{ width: 250 + "px" }}
							onClick={(e) => {
								if (email !== '' && password !== '') { e.preventDefault(); this.login() }
								else {
									this.setState({ showAlert: true, textoAlert: "Existen campos vacios" })
								}
							}}
						>INGRESAR</button>
					</div>
				</form>
			</React.Fragment >
		);
	}
}

export default Login;