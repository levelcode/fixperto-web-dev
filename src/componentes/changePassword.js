import React, { useState } from "react";
import { validateEmail } from "../constantes/funciones_auxiliares";
import Alerta from "./alertaVista";
import httpClient from "../constantes/axios";
import axios from "axios";
const ChangePassword = (props) => {
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert, setTextoAlert] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [new_pass, setNew_pass] = useState("");
	const changePassword = () => {
		if (!props["change"]) {
			if (email === "") { setTextoAlert("Por favor introduzca el correo"); setShowAlert(true); }
			else if (!validateEmail(email)) { setTextoAlert("Correo inválido. Por favor verifíquelo"); setShowAlert(true); }
			else {
				return axios({
					method: 'post',
					url: httpClient.urlBase + '/seguridad/olvidoPassword',
					data: { email: email }, headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
				})
					.then(function (response) {
						let responseJson = response["data"];
						if (responseJson["success"]) {
							if (responseJson.emailSend === true) {
								setTextoAlert("Le fue enviado su nueva contraseña al correo especificado");
								setShowAlert(true);
								setEmail("");
								props["close"]();
							}
							else {
								setTextoAlert("Ha ocurrido un problema, inténtelo nuevamente");
								setShowAlert(true);
							}
						}
						else {
							if (responseJson.noExiste) {
								setTextoAlert("No existe registro con el correo especificado, por favor revíselo");
								setShowAlert(true);
							}
							else {
								setTextoAlert("Ha ocurrido un problema, inténtelo nuevamente");
								setShowAlert(true);
							}
						}
					})
			}
		} else {
			if (pass === "") { setTextoAlert("Por favor introduzca la contraseña"); setShowAlert(true); }
			else if (pass === "" || new_pass === "") { setTextoAlert("Por favor introduzca la confirmación de la contraseña"); setShowAlert(true); }
			else if (pass !== new_pass) { setTextoAlert("Contraseñas distintas. Por favor verifiquélas"); setShowAlert(true); }
			else {
				return axios({
					method: 'post',
					url: httpClient.urlBase + '/seguridad/shangePassword',
					data: { id: props["id"], pass: pass, new_pass: new_pass }, headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
				})
					.then(function (response) {
						let responseJson = response["data"];
						if (responseJson["success"]) {
							if (responseJson.emailSend === true) {
								setTextoAlert("Contraseña cambiada");
								setShowAlert(true);
								setPass("");
								setNew_pass("");
								props["close"]();
							}
							else {
								setTextoAlert("Ha ocurrido un problema, inténtelo nuevamente");
								setShowAlert(true);
							}
						}
						else {
							if (responseJson.passIncorrecto) {
								setTextoAlert("Contraseña actual incorrecta, por favor corríjala");
								setShowAlert(true);
							}
							else {
								setTextoAlert("Ha ocurrido un problema, inténtelo nuevamente");
								setShowAlert(true);
							}
						}
					})
			}
		}
	}
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
			<div className="w3-modal w3-text-black" style={{ display: (props["show"]) ? "flex" : "none" }}>
				<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large" style={{ width: 25 + '%' }}>
					<div className="w3-container w3-center w3-margin-top w3-margin-bottom">
						<span onClick={props["close"]}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
						<br />
						<b>Por favor ingrese:</b>
						<div className="w3-margin-top w3-margin-bottom w3-left-align">
							{(props["change"])
								? <div>
									<label>Contraseña actual*</label>
									<input className="w3-input w3-border w3-round-large w3-margin-bottom" type="password" value={pass}
										onChange={(e) => setPass(e.target.value)} />
									<label>Nueva contraseña*</label>
									<input className="w3-input w3-border w3-round-large" type="password" value={new_pass}
										onChange={(e) => setNew_pass(e.target.value)} />
								</div>
								: <div>
									<label>Correo*</label>
									<input className="w3-input w3-border w3-round-large" type="text" value={email}
										onChange={(e) => setEmail(e.target.value)} />
								</div>
							}
						</div>
						<div onClick={changePassword}
							className="w3-button w3-indigo w3-hover-indigo w3-round-large">Aceptar</div>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default ChangePassword;