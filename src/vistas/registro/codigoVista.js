import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
import httpClient from "../../constantes/axios";
class CodigoSms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "",
			showAlert: false,
			code_number: "",
			isModalVisibleShangePhone: false,
			new_phone: "",
			showCahngePhone: false
		}
	}
	enviar = () => {
		var user = JSON.parse(localStorage.getItem("@USER"));
		let vacios = [];
		if (this.state["code_number"] === "") { vacios.push("  *Código de verificación"); }
		if (vacios.length === 0) {
			let me = this;
			axios({
				method: 'post',
				url: httpClient.urlBase + '/seguridad/validatePhone',
				data: {
					id: user["id"],
					code_number: this.state["code_number"],
					cliente: (user["type"] === "cliente") ? 1 : 0
				}, headers: { Accept: 'application/json' }
			})
				.then(function (responseJson) {
					responseJson = responseJson['data'];
					if (responseJson.success) {
						if (responseJson.validate) {
							if (user["type"] === "independiente" || user["type"] === "empresa") {
								localStorage.setItem("@USER", JSON.stringify({ type: user["type"], id: user["id"], typeId: user["typeId"], avatar: user["avatar"], name: user["name"], token: user["token"], photo: user["photo"], notification: (user["notification"] === 1) ? true : false, notification_chat: (user["notification_chat"] === 1) ? true : false, codigo: user["codigo"], cant_fitcoints: user["cant_fitcoints"], planId: user["planId"], planPrice: user["planPrice"], planUri: user["planUri"], planEnd: user["planEnd"], planStatus: user["planStatus"] }));
								if (me.props["history"]["location"]["to"]) {
									me.props["history"]["push"](me.props["history"]["location"]["to"]);
								} else {
									if (user["type"] === "empresa") { me.props["history"]["push"]("empresa1"); }
									else { me.props["history"]["push"]("independiente1"); }
								}
							}
							else {
								localStorage.setItem("@USER", JSON.stringify({ type: user["type"], id: user["id"], typeId: user["typeId"], avatar: user["avatar"], name: user["name"], token: user["token"], photo: user["photo"], notification: (user["notification"] === 1) ? true : false, notification_chat: (user["notification_chat"] === 1) ? true : false }));
								me.props["history"]["push"]("fixperto/servicios");
							}
						}
						else { return me.setState({ showAlert: true, textoAlert: "Código incorrecto, inténtelo nuevamente" }); }
					}
				})
				.catch(function (response) {
					//me.setState({ showAlert: true, textoAlert: "Problemas de conexión." });
				});
		}
		else {
			return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() });
		}
	}
	reenviar = () => {
		var user = JSON.parse(localStorage.getItem("@USER"));
		let me = this;
		axios({
			method: 'post',
			url: httpClient.urlBase + '/seguridad/reenviarCode',
			data: {
				id: user["id"],
				type: user["type"]
			}, headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		})
			.then(function (responseJson) {
				responseJson = responseJson['data'];
				if (responseJson.success) {
					me.setState({ showAlert: true, textoAlert: "Se le ha enviado nuevamente el código" });
				}
			})
			.catch(function (response) {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión." });
			});
	}
	validatePhone = phone => { let reg = /^[0-9]{7,10}$/; return reg.test(phone); };
	shangePhone = () => {
		let me = this;
		if (this.state['new_phone'] !== '') {
			if (this.validatePhone(this.state["new_phone"])) {
				var user = JSON.parse(localStorage.getItem("@USER"));
				axios({
					method: 'post',
					url: httpClient.urlBase + '/seguridad/shangePhone',
					data: {
						user: user["id"],
						type: user["type"],
						phone: this.state["new_phone"]
					},
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				})
					.then(function (responseJson) {
						responseJson = responseJson['data'];
						if (responseJson.success) {
							me.setState({ showCahngePhone: false, showAlert: true, textoAlert: "El teléfono ha sido cambiado" });
						}
						else {
							me.setState({ showAlert: true, textoAlert: "Ha ocurrido un problema inténtelo nuevamente" });
						}
					})
					.catch(function (response) {
						me.setState({ showAlert: true, textoAlert: "Problemas de conexión." });
					});
			}
		} else { me.setState({ showAlert: true, textoAlert: "Ingresa un número de teléfono" }); }
	}
	render() {
		const { textoAlert, showAlert, code_number, new_phone } = this.state;
		return (
			<React.Fragment>

				<Header />

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="container">

					<div className="codigo container_web">

						{this.state.showCahngePhone ? (
							<div className="w3-row"  >
								<hr></hr>
								<h1 className="titleRegister">Cambiar teléfono</h1>
								<div className="w3-row cont_cod">

									<input className="w3-round-large" type="number" value={new_phone} min={0} maxLength={10}
										onChange={(e) => this.setState({ new_phone: e.target.value })} />

								</div>

								<p className="p_btn">
									<button className="w3-button btn" style={{width : 40 + "%"}}
										onClick={(e) => {
											e.preventDefault();
											this.shangePhone();
										}}>Cambiar telefono
									</button>
								</p>

								<p className="p_btn">
									<button className="w3-button btn_cerrar"
										onClick={(e) => {
											e.preventDefault();
											this.setState({ showCahngePhone: false });
										}}>REGRESAR
									</button>
								</p>
							</div>
						) : (

								<div>
									<h1 className="titleRegister">Ya estás registrado ahora, <br /> verifiquemos tu cuenta</h1>

									<p>Ingresa el código de verificación que se te envio a tu equipo </p>

									<div className="w3-row cont_cod">

										<input className="w3-round-large" type="number" value={code_number} min={0} maxLength={4}
											onChange={(e) => this.setState({ code_number: e.target.value })} />

									</div>

									<div className="w3-row">
										<p className="p_btn">
											<button className="w3-button btn" style={{width : 40 + "%"}}
												onClick={(e) => {
													e.preventDefault();
													this.enviar();
												}}>VERIFICAR CUENTA
										</button>
										</p>

										<p>No recibiste el código 
										<a href="#" onClick={(e) => {
												e.preventDefault();
												this.reenviar();
											}}> Reenviar</a></p>

										<p>
											<a href="#" onClick={(e) => {
												e.preventDefault();
												this.setState({ showCahngePhone: true });
											}}>CAMBIAR TELÉFONO</a>
										</p>
									</div>

								</div>

							)}

					</div>
				</div>

			</React.Fragment >
		);
	}
}

export default CodigoSms;