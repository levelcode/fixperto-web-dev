import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import httpClient from "../../constantes/axios";
class CambiarPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = { textoAlert: "", showAlert: false, pass: "", new_pass: "", confirm: "", buttonDisabled: false, user: {} }
	}
	componentDidMount() { this.setState({ user: JSON.parse(localStorage.getItem("@USER")) }); }
	limpiarCampos() { this.setState({ pass: '', new_pass: '', confirm: '' }); }
	enviar() {
		if (this.state["pass"] === "" || this.state["new_pass"] === "" || this.state["confirm"] === "") {
			return this.setState({ showAlert: true, textoAlert: "Existe campo vacío" });
		}
		else if (this.state["new_pass"].length <= 5) {
			return this.setState({ showAlert: true, textoAlert: "La contraseña debe de tener más de 6 caracteres" });
		}
		else if (this.state["new_pass"] !== this.state["confirm"]) {
			return this.setState({ showAlert: true, textoAlert: "Nueva contraseña distinta de su confirmación" });
		}
		else {
			this.setState({ buttonDisabled: true });
			var id = this.state['user']['id'];
			var me = this;
			axios({
				method: 'post',
				url: httpClient.urlBase + '/seguridad/shangePassword',
				data: { id: id, pass: me.state["pass"], new_pass: me.state["new_pass"] },
				headers: { Accept: 'application/json' }
			}).then(function (responseJson) {
				responseJson = responseJson['data']
				me.setState({ buttonDisabled: false });
				if (responseJson.emailSend === true) {
					me.setState({ showAlert: true, textoAlert: "Contraseña cambiada" });
				} else {
					me.setState({ showAlert: true, textoAlert: "Ha ocurrido un problema, inténtelo nuevamente" });
				}
				me.limpiarCampos();
			}).catch((error) => {
				me.setState({ buttonDisabled: false });
				me.limpiarCampos();
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			})
		}
	}
	render() {
		const { textoAlert, showAlert, pass, new_pass, confirm } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="">
					<div className="info_perfil_comp">
						<h1 className="titleRegister">Cambiar Contraseña</h1>
						<div className="w3-container">
							<div className="w3-row">
								<label>Contraseña actual*</label>
								<div className="w3-col" style={{ width: 99 + "%" }}>
									<input id="myPerfil_Pass" className="w3-input w3-border w3-round-large" type="password" value={pass}
										onChange={(e) => this.setState({ pass: e.target.value })} />
								</div>
								<div className="w3-rest" style={{ cursor: "pointer", width: 1 + "px" }} onClick={() => {
									var x = document.getElementById("myPerfil_Pass");
									if (x.type === "password") { x.type = "text"; } else { x.type = "password"; }
								}}>
									<img src="../../assets/iconos/show_hide_password.png"
										style={{ width: 30 + "px", height: 20 + "px", position: "absolute", marginTop: 10, marginLeft: -45 }}
										alt="Mostrar" />
								</div>
							</div>
							<div className="w3-row">
								<label>Nueva Contraseña*</label>
								<div className="w3-col" style={{ width: 99 + "%" }}>
									<input id="myPerfil_NewPass" className="w3-input w3-border w3-round-large" type="password" value={new_pass}
										onChange={(e) => this.setState({ new_pass: e.target.value })} />
								</div>
								<div className="w3-rest" style={{ cursor: "pointer", width: 1 + "px" }} onClick={() => {
									var x = document.getElementById("myPerfil_NewPass");
									if (x.type === "password") { x.type = "text"; } else { x.type = "password"; }
								}}>
									<img src="../../assets/iconos/show_hide_password.png"
										style={{ width: 30 + "px", height: 20 + "px", position: "absolute", marginTop: 10, marginLeft: -45 }}
										alt="Mostrar" />
								</div>
							</div>
							<div className="w3-row">
								<label>Repetir Contraseña*</label>
								<div className="w3-col" style={{ width: 99 + "%" }}>
									<input id="myPerfil_RepPass" className="w3-input w3-border w3-round-large" type="password" value={confirm}
										onChange={(e) => this.setState({ confirm: e.target.value })} />
								</div>
								<div className="w3-rest" style={{ cursor: "pointer", width: 1 + "px" }} onClick={() => {
									var x = document.getElementById("myPerfil_RepPass");
									if (x.type === "password") { x.type = "text"; } else { x.type = "password"; }
								}}>
									<img src="../../assets/iconos/show_hide_password.png"
										style={{ width: 30 + "px", height: 20 + "px", position: "absolute", marginTop: 10, marginLeft: -45 }}
										alt="Mostrar" />
								</div>
							</div>
							<p><button className="w3-button btn" onClick={() => { this.enviar(); }}>Guardar</button></p>
						</div>
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default CambiarPassword;