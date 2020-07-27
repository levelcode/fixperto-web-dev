import React, { useState } from "react";
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
const CancelarSolicitud = ({ show, id, close }) => {
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert, setTextoAlert] = useState("");
	const [cancellations, setCancellations] = useState([]);
	const [texto, setTexto] = useState("");
	const [type, setType] = useState(1);
	const getCancelType = () => {
		return axios({
			method: 'post',
			url: httpClient.urlBase + '/seguridad/getCancelType',
			headers: { Accept: 'application/json' }
		}).then(function (responseJson) {
			if (responseJson["data"]["success"]) { setCancellations(responseJson["data"].cancellations); }
			else { setTextoAlert("Ha ocurrido un error intente nuevamente"); setShowAlert(true); }
		}).catch(function (error) {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				setTextoAlert("Problemas de conexión."); setShowAlert(true);
			}
		});
	}
	if (!cancellations.length) { getCancelType(); }
	const cancelar = () => {
		return axios({
			method: 'post',
			url: httpClient.urlBase + '/cliente/cancelRequest',
			data: { texto: texto, type: type, id },
			headers: { Accept: 'application/json' }
		}).then(function (responseJson) {
			if (responseJson["data"]["success"]) { close(true); }
			else { close(false); }
		}).catch(function (error) {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				setTextoAlert("Problemas de conexión."); setShowAlert(true);
			}
		});
	}
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
			<div className="w3-modal w3-text-black" style={{ display: (show) ? "flex" : "none" }}>
				<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large  modal_problem">
					<div className="w3-container w3-margin-top w3-margin-bottom">
						<span onClick={() => close()}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
						<br />
						<label>Motivo del problema*</label>
						<div>
							<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="type"
								value={type} onChange={(e) => setType(e.target.value)}>
								{cancellations.map((cancellation, key) => (
									<option key={key} value={cancellation.id} >{cancellation.denomination}</option>
								))}
							</select>
						</div>
						<div>
							<label>Cuéntanos por qué cancelas*</label>
							<textarea className="w3-input w3-border w3-round-large w3-margin-bottom" value={texto}
								onChange={(e) => setTexto(e.target.value)} />

						</div>
						<div className="w3-center">
							<button onClick={cancelar} disabled={false}
								className={(type === "" || texto === "") ? "w3-button w3-disabled w3-block w3-round-large w3-indigo " : "w3-button w3-block btn w3-round-large"}>Enviar</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default CancelarSolicitud;