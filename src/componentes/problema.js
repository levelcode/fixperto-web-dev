import React, { useState } from "react";
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
const Problema = ({ show, request, close, user, type_user, typeId }) => {
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert, setTextoAlert] = useState("");
	const [problems, setProblems] = useState([]);
	const [problem, setProblem] = useState("");
	const [type, setType] = useState(1);
	const getProblemsType = () => {
		return axios({
			method: 'post',
			url: httpClient.urlBase + '/seguridad/getProblemType',
			headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { setProblems(responseJson["data"].problems); }
				else { setTextoAlert("Ha ocurrido un error intente nuevamente"); setShowAlert(true); }
			})
			.catch(function (response) { setTextoAlert("Problemas de conexión."); setShowAlert(true); });
	}
	if (!problems.length) { getProblemsType(); }
	const enviar = () => {
		return axios({
			method: 'post',
			url: httpClient.urlBase + '/seguridad/reportProblem',
			data: { problem, type, request, user, type_user, typeId },
			headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { close(true); }
				else { close(false); }
			})
			.catch(function (response) { setTextoAlert("Problemas de conexión."); setShowAlert(true); });
	}
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
			<div className="w3-modal w3-text-black" style={{ display: (show) ? "flex" : "none" }}>
				<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large" style={{ width: 50 + '%' }}>
					<div className="w3-container w3-margin-top w3-margin-bottom">
						<span onClick={() => close()}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
						<br />
						<label>Motivo del problema*</label>
						<div>
							<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="type"
								value={type} onChange={(e) => setType(e.target.value)}>
								{problems.map((pro, key) => (
									<option key={key} value={pro.id} >{pro.denomination}</option>
								))}
							</select>
						</div>
						<div>
							<label>Cuéntanos tu inconveniente*</label>
							<textarea className="w3-input w3-border w3-round-large w3-margin-bottom" value={problem}
								onChange={(e) => setProblem(e.target.value)} />
						</div>
						<div className="w3-center">
							<button onClick={enviar} disabled={false}
								className={(type === "" || problem === "") ? "w3-button w3-disabled w3-block w3-round-large w3-indigo " : "w3-button w3-block w3-indigo w3-hover-indigo w3-round-large"}>Enviar</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default Problema;