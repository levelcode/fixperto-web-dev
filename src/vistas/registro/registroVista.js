import React from 'react';
import Alerta from "../../componentes/alertaVista";
import FileUpload from "../../componentes/fileUpload";
import httpClient from "../../constantes/axios";
import axios from "axios";
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
import { Link } from "react-router-dom";
import { validateEmail, validateName, validatePhone, fechaAutorizada } from "../../constantes/funciones_auxiliares";
class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			btnActive: false, textoAlert: "", showAlert: false, photo: "", name: "", email: "", birth_date: "", gender: 1, phone: "", password: "", repeat_password: "", term_condition: false, politicas_privacidad: false, clear: true
		}
	}
	componentDidMount() {
		var user = (localStorage.getItem("@USER")) ? JSON.parse(localStorage.getItem("@USER")) : {};
		if (Object.keys(user).length > 0) {
			localStorage.setItem("@USER", JSON.stringify({})); this.props["history"]["push"]("/ingreso");
		}
	}
	formatDate = date => {
		let today = new Date(date);
		let fecha = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
		return fecha;
	}
	convertDateTime = date => {
		var fecha = new Date(date);
		return fecha.toISOString().split('T')[0] + ' ' + fecha.toTimeString().split(' ')[0];
	}
	gender_type = [{ id: 1, denomination: 'Masculino' }, { id: 2, denomination: 'Femenino' }];
	continuar = () => {
		let vacios = [];
		//if (this.state["photo"] === "") { vacios.push("  *Foto"); }
		if (this.state["name"] === "") { vacios.push("  *Nombre y apellidos"); }
		if (this.state["email"] === "") { vacios.push("  *Correo"); }
		if (this.state["birth_date"] === "") { vacios.push("  *Fecha de nacimiento"); }
		if (this.state["phone"] === "") { vacios.push("  *Teléfono"); }
		if (this.state["password"] === "") { vacios.push("  *Contraseña"); }
		if (this.state["term_condition"] === false) { vacios.push("  *Términos y condiciones"); }
		if (this.state["politicas_privacidad"] === false) { vacios.push("  *Política y privacidad"); }
		if (!vacios.length) {
			for (var i = 0; i < this.state["phone"].length; i++) {
				if (this.state["phone"].charAt(i) === "e")
					return this.setState({ showAlert: true, textoAlert: "Teléfono inválido, por favor verifíquelo" });
			}
			if (this.state["password"] !== this.state["repeat_password"]) {
				return this.setState({ showAlert: true, textoAlert: "Contraseña distinta a su confirmación" });
			}
			if (this.state["password"].length <= 5) {
				return this.setState({ showAlert: true, textoAlert: "La contraseña debe de tener más de 6 caracteres" });
			}
			else if (!validateEmail(this.state["email"])) {
				return this.setState({ showAlert: true, textoAlert: "Correo inválido, por favor verifíquelo" });
			}
			else if (!validatePhone(this.state["phone"])) {
				return this.setState({ showAlert: true, textoAlert: "Teléfono inválido, por favor verifíquelo" });
			}
			else if (!validateName(this.state["name"])) {
				return this.setState({ showAlert: true, textoAlert: "Nombre y apellido, por favor verifíquelo" });
			}
			else {
				const createFormData = () => {
					const data = new FormData();
					data.append("token", "web");
					Object.keys(this.state).forEach(key => {
						switch (key) {
							case "photo":
								if (this.state["photo"] !== "")
									data.append("documentos", this.state["photo"]);
								break;
							case "name":
								data.append("name", this.state["name"]);
								break;
							case "email":
								data.append("email", this.state["email"]);
								break;
							case "birth_date":
								if (this.state["birth_date"] !== "")
									data.append("birth_date", this.convertDateTime(this.state["birth_date"]));
								break;
							case "phone":
								data.append("phone", this.state["phone"]);
								break;
							case "password":
								data.append("password", this.state["password"]);
								break;
							case "gender":
								data.append("gender", this.state["gender"]);
								break;
							default:
								break;
						}
					});
					return data;
				};
				this.setState({ btnActive: true });
				let me = this;
				axios({
					method: 'post',
					url: httpClient.urlBase + '/seguridad/addCliente',
					data: createFormData(), headers: { Accept: 'application/json' }
				}).then(function (response) {
					let responseJson = response["data"];
					if (responseJson["success"]) {
						localStorage.setItem("@USER", JSON.stringify({ tokenAuth: responseJson.user.tokenAuth, userId: responseJson.user.id, id: responseJson.user.id, typeId: responseJson.user.typeId, type: "cliente", avatar: responseJson.user.avatar, notification: true, notification_chat: true, name: me.state["name"], email: me.state["email"], token: me.state["token"], code_number: responseJson.user.code_number }));
						me.props["history"]["push"]("codigosms");
					} else {
						if (responseJson["existe"]) {
							me.setState({ btnActive: false, showAlert: true, textoAlert: "Ya existe un usuario con ese correo." });
						}
					}
				}).catch(function (response) {
					me.setState({ btnActive: false });
					if (response.message === 'Timeout' || response.message === 'Network request failed') {
						me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
					}
				});
			}
		} else {
			return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() });
		}
	}
	render() {
		const { btnActive, textoAlert, showAlert, name, email, birth_date, gender, phone, password, repeat_password, term_condition, politicas_privacidad, clear } = this.state;
		return (
			<React.Fragment>
				<Header />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="container_web">
					<div className="formRegister">
						<h1 className="titleRegister">Ingresa tus datos</h1>
						<p>Eres muy importante para nosotros, regálanos tus datos de contacto.</p>
						<div className="w3-center img_upl">
							<FileUpload id="id_foto_cliente" clear={clear} onChange={(photo) => { this.setState({ photo, clear: false }) }} />
						</div>
						<form className="w3-container">
							<label>Nombre y apellido*</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={name}
								onChange={(e) => this.setState({ name: e.target.value })} />
							<label>Correo*</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={email}
								onChange={(e) => this.setState({ email: e.target.value })} />
							<label>Fecha de nacimiento*</label>
							<input className="w3-input w3-border w3-round-large size200" type="date" value={birth_date}
								max={fechaAutorizada()}
								onChange={(e) => this.setState({ birth_date: e.target.value })} />
							<label>Género*</label>
							<div>
								<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="gender"
									value={gender} onChange={(e) => this.setState({ gender: e.target.value })}>
									{this.gender_type.map((gender_type, key) => (
										<option key={key} value={gender_type.id} >{gender_type.denomination}</option>
									))}
								</select>
							</div>
							<label>Teléfono*</label>
							<input className="w3-input w3-border w3-round-large" type="number" value={phone}
								onChange={(e) => {
									if (e.target.value !== "e")
										this.setState({ phone: e.target.value })
								}} />
							<label>Contraseña*</label>
							<div className="w3-row">
								<div className="w3-col" style={{ width: 99 + "%" }}>
									<input id="myPass" className="w3-input w3-border w3-round-large" type="password" value={password}
										onChange={(e) => this.setState({ password: e.target.value })} />
								</div>
								<div className="w3-rest" style={{ cursor: "pointer", width: 1 + "px" }} onClick={() => {
									var x = document.getElementById("myPass");
									if (x.type === "password") { x.type = "text"; } else { x.type = "password"; }
								}}>
									<img src="../../assets/iconos/show_hide_password.png"
										style={{ width: 30 + "px", height: 20 + "px", position: "absolute", marginTop: 10, marginLeft: -45 }}
										alt="Mostrar" />
								</div>
							</div>
							<label>Repetir contraseña*</label>
							<div className="w3-row">
								<div className="w3-col" style={{ width: 99 + "%" }}>
									<input id="myRep_Pass" className="w3-input w3-border w3-round-large" type="password" value={repeat_password}
										onChange={(e) => this.setState({ repeat_password: e.target.value })} />
								</div>
								<div className="w3-rest" style={{ cursor: "pointer", width: 1 + "px" }} onClick={() => {
									var x = document.getElementById("myRep_Pass");
									if (x.type === "password") { x.type = "text"; } else { x.type = "password"; }
								}}>
									<img src="../../assets/iconos/show_hide_password.png"
										style={{ width: 30 + "px", height: 20 + "px", position: "absolute", marginTop: 10, marginLeft: -45 }}
										alt="Mostrar" />
								</div>
							</div>
							<p style={{ textAlign: "left", marginLeft: 0, fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 10, fontFamily: 'Montserrat' }}>Nota: * (Campo obligatorio)</p>
							<p style={{ textAlign: "left", marginLeft: 0, fontSize: 15 }}>
								<input className="w3-check" type="checkbox" value={term_condition}
									onChange={(e) => this.setState({ term_condition: !term_condition })} />
								<label className="labelCheck">Haciendo click en esta casilla estoy aceptando <Link to="/terminos" target="_blank">Términos y conciones.</Link> </label>
							</p>
							<p style={{ textAlign: "left", marginLeft: 0, fontSize: 15 }}>
								<input className="w3-check" type="checkbox" value={politicas_privacidad}
									onChange={(e) => this.setState({ politicas_privacidad: !politicas_privacidad })} />
								<label className="labelCheck">Bajo la política y privacidad <Link to="/politicas" target="_blank">autorizo el uso de mis datos personales.</Link>  </label>
							</p>
							<p><button className="w3-button btn" disabled={btnActive}
								onClick={(e) => {
									e.preventDefault();
									this.continuar();
								}}>Continuar</button></p>
						</form>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default Registro;