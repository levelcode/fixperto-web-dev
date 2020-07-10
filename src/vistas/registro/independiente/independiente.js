import React from 'react';
import Alerta from "../../../componentes/alertaVista";
import Header from "../../../componentes/header";
import Footer from "../../../componentes/footer";
import FileUpload from "../../../componentes/fileUpload";
import { Link } from "react-router-dom";
import { validateEmail, validateName, validateNumber, validatePhone, fechaAutorizada } from "../../../constantes/funciones_auxiliares";
import httpClient from "../../../constantes/axios";
import axios from "axios";
class Independiente extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAlert: false, textoAlert: "", term_condition: false, politicas_privacidad: false, experiencia: 1,
			type: "numeric", photo: "", name: "", email: "", identification_type: 1, number: "", birth_date: "",
			gender: 1, fotocopy: "", phone: "", password: "", repeat_password: "", coupon: false, coupon_number: "", clear: true, clearF: true
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
	identification_type = [{ id: 1, denomination: 'Cédula de ciudadanía' }, { id: 2, denomination: 'Pasaporte' }, { id: 3, denomination: 'Cédula de extranjería' }];
	gender_type = [{ id: 1, denomination: 'Masculino' }, { id: 2, denomination: 'Femenino' }];
	experiencia = [{ id: 1, denomination: 'Menos de un año' }, { id: 2, denomination: 'Un año' }, { id: 3, denomination: 'De 2 a 3 años' }
		, { id: 4, denomination: 'De 3 a 5 años' }, { id: 5, denomination: 'De 5 a 10 años' }, { id: 6, denomination: 'Más de 10 años' }];
	continuar = () => {
		let vacios = [];
		if (this.state["photo"] === "") { vacios.push("  *Foto"); }
		if (this.state["fotocopy"] === "") { vacios.push("  *Fotocopia de identificación"); }
		if (this.state["name"] === "") { vacios.push("  *Nombre y Apellidos"); }
		if (this.state["email"] === "") { vacios.push("  *Correo"); }
		if (this.state["number"] === "") { vacios.push("  *Número de identificación"); }
		if (this.state["phone"] === "") { vacios.push("  *Teléfono"); }
		if (this.state["birth_date"] === "") { vacios.push("  *Fecha de nacimiento"); }
		if (this.state["password"] === "") { vacios.push("  *Contraseña"); }
		if ((this.state["coupon"] === true && this.state["coupon_number"] === "")) { vacios.push("  *Cupón"); }

		if (this.state["term_condition"] === false) {
			vacios.push("  *Términos y condiciones");
		}

		if (this.state["politicas_privacidad"] === false) {
			vacios.push("  *Politicas y privacidad");
		}

		if (!vacios.length) {
			if (this.state["password"] !== this.state["repeat_password"]) {
				return this.setState({ showAlert: true, textoAlert: "Contraseña distinta a su confirmación" });
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
			else if (this.state["identification_type"] !== 2 && !validateNumber(this.state["number"])) {
				return this.setState({ showAlert: true, textoAlert: "Número de identificación inválido, por favor verifíquelo" });
			}
			else {
				var codigo = Math.random().toString(36).substring(10, 15) + Math.random().toString(36).substring(12, 15);
				const createFormData = () => {
					const data = new FormData();
					data.append("token", "web");
					data.append("code", codigo);
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
							case "identification_type":
								data.append("identification_type", this.state["identification_type"]);
								break;
							case "number":
								data.append("number", this.state["number"]);
								break;
							case "birth_date":
								data.append("birth_date", this.convertDateTime(this.state["birth_date"]));
								break;
							case "gender":
								data.append("gender", this.state["gender"]);
								break;
							case "fotocopy":
								if (this.state["fotocopy"] !== "")
									data.append("documentos", this.state["fotocopy"]);
								break;
							case "experiencia":
								data.append("experiencia", this.state["experiencia"]);
								break;
							case "phone":
								data.append("phone", this.state["phone"]);
								break;
							case "password":
								data.append("password", this.state["password"]);
								break;
							case "coupon": if (this.state["coupon"] === true)
								data.append("coupon", this.state["coupon_number"]);
								break;
							default:
								break;
						}
					});
					return data;
				};
				let me = this;
				axios({
					method: 'post',
					url: httpClient.urlBase + '/fixpertoProfesional/addProfesional',
					data: createFormData(), headers: { Accept: 'application/json' }
				})
					.then(function (response) {
						let responseJson = response["data"];
						if (responseJson["success"]) {
							localStorage.setItem("@USER", JSON.stringify({ active: 0, insured: 1, plan: 0, userId: responseJson.user.id, id: responseJson.user.id, typeId: responseJson.user.typeId, avatar: responseJson.user.avatar, name: me.state["name"], email: me.state["email"], token: "web", notification: true, notification_chat: true, codigo: responseJson.user.codigo, cant_fitcoints: responseJson.user.fitcoints, type: "independiente", planId: responseJson.user.planId, planUri: "regalo", planEnd: responseJson.user.planEnd, planPrice: false, planStatus: "active", code_number: responseJson.user.code_number }));
							me.props["history"]["push"]("codigosms");
						} else {
							if (responseJson["existe"]) {
								me.setState({ showAlert: true, textoAlert: "Ya existe un usuario con ese correo." });
							}
						}
					})
					.catch(function (response) {
						me.setState({ showAlert: true, textoAlert: "Problemas de conexión." });
					});
			}
		} else {
			return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() });
		}
	}
	render() {
		const { showAlert, textoAlert, name, email, identification_type, number, birth_date, gender, experiencia,
			phone, password, repeat_password, term_condition, politicas_privacidad, coupon, coupon_number, clear, clearF } = this.state;
		return (
			<React.Fragment>
				<Header />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="container_web">
					<div className="formRegister">
						<h1 className="titleRegister">Paso 1 de 5</h1>
						<div className="w3-center img_upl">
							<FileUpload id="photo" clear={clear} onChange={(photo) => { this.setState({ photo, clear: false }) }} />
						</div>
						<div className="w3-container">
							<label>Nombre y apellido*</label>
							<input className="w3-input w3-border w3-round-large w3-margin-bottom" type="text" value={name}
								onChange={(e) => this.setState({ name: e.target.value })} />
							<label>Correo*</label>
							<input className="w3-input w3-border w3-round-large w3-margin-bottom" type="text" value={email}
								onChange={(e) => this.setState({ email: e.target.value })} />
							<label>Tipo de Identificación*</label>
							<div>
								<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="identification_type"
									value={identification_type} onChange={(e) => this.setState({ identification_type: e.target.value })}>
									{this.identification_type.map((type, key) => (
										<option key={key} value={type.id} >{type.denomination}</option>
									))}
								</select>
							</div>
							<label>Número de Identificación*</label>
							<input className="w3-input w3-border w3-round-large w3-margin-bottom" type="number" value={number}
								onChange={(e) => this.setState({ number: e.target.value })} />
							<label>Fecha de nacimiento*</label>
							<input className="w3-input w3-border w3-round-large size200 w3-margin-bottom" type="date" value={birth_date}
								max={fechaAutorizada()}
								onChange={(e) => this.setState({ birth_date: e.target.value })} />
							<label>Género*</label>
							<div>
								<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="gender"
									value={gender} onChange={(e) => this.setState({ gender: e.target.value })}>
									{this.gender_type.map((gender, key) => (
										<option key={key} value={gender.id} >{gender.denomination}</option>
									))}
								</select>
							</div>
							<div className="w3-margin-bottom"><label>Fotocopia del documento de identificación*</label></div>
							<div className="w3-center img_upl" style={{ width: 23 + "%" }}>
								<FileUpload clear={clearF} id="fotocopy" onChange={(fotocopy) => { this.setState({ fotocopy, clearF: false }) }} />
							</div>
							<label>Experiencia*</label>
							<div>
								<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="experiencia"
									value={experiencia} onChange={(e) => this.setState({ experiencia: e.target.value })}>
									{this.experiencia.map((experiencia, key) => (
										<option key={key} value={experiencia.id} >{experiencia.denomination}</option>
									))}
								</select>
							</div>
							<div className="w3-margin-bottom">
								<label>Teléfono*</label>
								<input className="w3-input w3-border w3-round-large" type="number" value={phone}
									onChange={(e) => this.setState({ phone: e.target.value })} />
							</div>
							<label>Contraseña*</label>
							<div className="w3-row w3-margin-bottom">
								<div className="w3-col" style={{ width: 99 + "%" }}>
									<input id="myPass" className="w3-input w3-border w3-round-large" type="password" value={password}
										onChange={(e) => this.setState({ password: e.target.value })} />
								</div>
								<div className="w3-rest" style={{ cursor: "pointer", width: 5 + "px" }} onClick={() => {
									var x = document.getElementById("myPass");
									if (x.type === "password") { x.type = "text"; } else { x.type = "password"; }
								}}>
									<img src="../../../assets/iconos/show_hide_password.png"
										style={{ width: 30 + "px", height: 20 + "px", position: "absolute", marginTop: 10, marginLeft: -45 }}
										alt="Mostrar" />
								</div>
							</div>

							<label>Repetir contraseña*</label>
							<div className="w3-row w3-margin-bottom">
								<div className="w3-col" style={{ width: 99 + "%" }}>
									<input id="myRep_Pass" className="w3-input w3-border w3-round-large" type="password" value={repeat_password}
										onChange={(e) => this.setState({ repeat_password: e.target.value })} />
								</div>
								<div className="w3-rest" style={{ cursor: "pointer", width: 5 + "px" }} onClick={() => {
									var x = document.getElementById("myRep_Pass");
									if (x.type === "password") { x.type = "text"; } else { x.type = "password"; }
								}}>
									<img src="../../../assets/iconos/show_hide_password.png"
										style={{ width: 30 + "px", height: 20 + "px", position: "absolute", marginTop: 10, marginLeft: -45 }}
										alt="Mostrar" />
								</div>
							</div>

							<p style={{ textAlign: "left", marginLeft: 0, fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 10, fontFamily: 'Montserrat' }}>Nota: * (Campo obligatorio)</p>

							<input className="w3-check w3-margin-bottom" type="checkbox" value={coupon}
								onChange={(e) => { this.setState({ coupon: (e.target.value === "false") ? true : false }) }} />
							<label className="labelCheck">¿Tienes un cupón de referido?</label>
							{coupon && <div>
								<label>Cupón*</label>
								<input className="w3-input w3-border w3-round-large w3-margin-bottom" type="text" value={coupon_number}
									onChange={(e) => this.setState({ coupon_number: e.target.value })} />
							</div>}
							<div className="w3-margin-bottom">
								<input className="w3-check" type="checkbox" value={term_condition}
									onChange={(e) => this.setState({ term_condition: e.target.value })} />
								<label className="labelCheck">Haciendo click en esta casilla estoy aceptando <Link to="/terminos" target="_blank">Términos y conciones.</Link> </label>
							</div>

							<div className="w3-margin-bottom">
								<input className="w3-check" type="checkbox" value={politicas_privacidad}
									onChange={(e) => this.setState({ politicas_privacidad: e.target.value })} />
								<label className="labelCheck">Bajo la política y privacidad  <Link to="/politicas" target="_blank">autorizo el uso de mis datos personales.</Link> </label>
							</div>

							<div>
								<button className="w3-button btn w3-block"
									onClick={(e) => { e.preventDefault(); this.continuar(); }}>Continuar</button>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default Independiente;