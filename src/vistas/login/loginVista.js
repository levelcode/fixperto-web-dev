import React from 'react';
import httpClient from "../../constantes/axios";
import ChangePassword from "../../componentes/changePassword";
import Alerta from "../../componentes/alertaVista";
import { validateEmail } from "../../constantes/funciones_auxiliares";
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showChangePassword: false, showAlert: false, textoAlert: "", email: "", password: "" };
	}
	registrarme = () => { this.props["history"]["push"]("fixperto/beneficios"); }
	login = () => {
		if (this.state["email"] !== "" && this.state["password"] !== "") {
			if (!validateEmail(this.state["email"])) {
				this.setState({ showAlert: true, textoAlert: "Correo inválido, por favor verifíquelo" })
			}
			else {
				httpClient.post('/seguridad/login', { email: this.state["email"], password: this.state["password"] })
					.then((responseJson) => {
						if (responseJson.success && responseJson["user"].length) {
							this.setState({ showAlert: true, textoAlert: "OKOK" })
						}
					})
			}
		}
		else { this.setState({ showAlert: true, textoAlert: "Existen campos vacios" }); }
	}
	render() {
		const { showChangePassword, email, password, showAlert, textoAlert } = this.state;
		return (
			<React.Fragment>
				<ChangePassword show={showChangePassword} change close={() => this.setState({ showChangePassword: false })} />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<form>
					<div className="w3-margin-bottom">
						<input className="w3-input w3-border w3-round-large" name="email" type="text" placeholder="Email" required
							value={email} onChange={(e) => this.setState({ email: e.target.value })} />
					</div>
					<br />
					<div className="w3-margin-bottom">
						<input className="w3-input w3-border w3-round-large" name="password" type="password" placeholder="Contraseña" required
							value={password} onChange={(e) => this.setState({ password: e.target.value })} />
					</div>
					<br />
					<div className="w3-row">
						<div className="w3-col w3-margin-bottom" style={{ width: 48 + "%" }}>
							<div className="w3-button w3-block w3-hover-blue w3-blue w3-round"
								onClick={(e) => {
									if (email !== '' && password !== '') { e.preventDefault(); this.login() }
									else { this.setState({ showAlert: true, textoAlert: "Existen campos vacios" }) }
								}}>INGRESAR
								</div>
						</div>
						<div className="w3-col" style={{ width: 4 + "%" }}><p /></div>
						<div className="w3-col w3-margin-bottom" style={{ width: 48 + "%" }}>
							<div className="w3-button w3-block w3-hover-blue w3-border w3-border-blue w3-round w3-text-blue"
								style={{ backgroundColor: "#273861" }} onClick={() => { this.registrarme() }}>REGISTRARME</div>
						</div>
					</div>
					<div className="w3-section">
						<b className="w3-text-blue textLink" onClick={() => { this.setState({ showChangePassword: true }) }}>¿Olvidaste tu contraseña?</b>
					</div>
				</form>
			</React.Fragment >
		);
	}
}

export default Login;