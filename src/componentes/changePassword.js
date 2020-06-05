import React, { useState } from "react";
import { validateEmail } from "../constantes/funciones_auxiliares";
import Alerta from "./alertaVista";
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
			else { }
		} else {
			if (pass === "") { setTextoAlert("Por favor introduzca la contraseña"); setShowAlert(true); }
			else if (pass === "" || new_pass === "") { setTextoAlert("Por favor introduzca la confirmación de la contraseña"); setShowAlert(true); }
			else if (pass !== new_pass) { setTextoAlert("Contraseñas distintas. Por favor verifiquélas"); setShowAlert(true); }
			else { }
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
						<button onClick={changePassword}
							className="w3-button w3-indigo w3-hover-indigo w3-round-large">Aceptar</button>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default ChangePassword;