import React from 'react';
import httpClient from "../../constantes/axios";
import ChangePassword from "../../componentes/changePassword";
import Alerta from "../../componentes/alertaVista";
import { validateEmail } from "../../constantes/funciones_auxiliares";
import axios from "axios";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showChangePassword: false, showAlert: false, textoAlert: "", email: "", password: "" };
	}
	registrarme = () => { this.props["history"]["push"]("beneficios"); }
	login = () => {
		if (this.state["email"] !== "" && this.state["password"] !== "") {
			if (!validateEmail(this.state["email"])) {
				this.setState({ showAlert: true, textoAlert: "Correo inválido, por favor verifíquelo" })
			}
			else {
				let me = this;
				return axios({
					method: 'post',
					url: httpClient.urlBase + '/seguridad/login',
					data: { email: this.state["email"], password: this.state["password"] }, headers: { Accept: 'application/json' }
				})
					.then(function (response) {
						let responseJson = response["data"];
						if (responseJson["success"] && responseJson["user"].length) {
							var user = responseJson["user"][0];
							localStorage.setItem("@USER", JSON.stringify({ insured: 1, evaluation: (user["evaluation"]) ? user["evaluation"] : 0, userId: user["id"], type: user["type"], id: user["id"], typeId: user["typeId"], avatar: user["avatar"], name: user["name"], email: user["email"], token: user["token"], photo: user["photo"], notification: (user["notification"] === 1) ? true : false, notification_chat: (user["notification_chat"] === 1) ? true : false }));
							if (user["validate_number"] === 0) { me.props["history"]["push"]("codigosms"); }
							else { me.props["history"]["push"]("fixperto/servicios"); }
						}
						else {
							me.setState({ showAlert: true, textoAlert: "Correo o contraseña incorrecta, inténtelo nuevamente" });
						}
					})
					.catch(function (response) {
						me.setState({ showAlert: true, textoAlert: "Problemas de conexión." });
					});
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
				<form  className="form-ancho">
					<div className="w3-margin-bottom">
						<input className="w3-input w3-border icon-email" name="email" type="text" placeholder="Email" required
							value={email} onChange={(e) => this.setState({ email: e.target.value })} />
					</div>
					<br />
					<div className="w3-margin-bottom icons">
						<input className="w3-input w3-border  icon-clave" name="password" type="password" placeholder="Contraseña" required
							value={password} onChange={(e) => this.setState({ password: e.target.value })} />
					</div>
					<br />
					<div className="w3-row cursor">
						<div className="w3-col w3-margin-bottom" style={{ width: 48 + "%" }}>
							<div className="w3-button w3-block w3-hover-blue w3-round blue padd-cinco"
								onClick={(e) => {
									if (email !== '' && password !== '') { e.preventDefault(); this.login() }
									else { this.setState({ showAlert: true, textoAlert: "Existen campos vacios" }) }
								}}>INGRESAR
								</div>
						</div>
						<div className="w3-col cursor" style={{ width: 4 + "%" }}><p /></div>
						<div className="w3-col w3-margin-bottom" style={{ width: 48 + "%" }}>
							<div className=" w3-block w3-border blue-border w3-round text-blue padd-cinco"
								style={{ backgroundColor: "#273861" }} onClick={() => { this.registrarme() }}>REGISTRARME</div>
						</div>
					</div>
					<div className="w3-section">
						<b className="text-blue-contrasena textLink" onClick={() => { this.setState({ showChangePassword: true }) }}>¿Olvidaste tu contraseña?</b>
					</div>
				</form>
			</React.Fragment >
		);
	}
}

export default Login;