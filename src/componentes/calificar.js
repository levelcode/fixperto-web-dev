import React, { useState } from "react";
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
import Experto from "./experto";
import ReactStars from "react-rating-stars-component";
const Calificar = (props) => {
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert, setTextoAlert] = useState("");
	const [evaluation, setEvaluation] = useState(1);
	const [cost, setCost] = useState(0);
	const [commentary, setCommentary] = useState("");
	const calificar = () => {
		return axios({
			method: 'post',
			url: httpClient.urlBase + '/cliente/ratingExpert',
			data: { evaluation, cost, commentary, calificador: props["calificador"], calificado: props["experto"]["id"] },
			headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { props["close"](true); }
				else { props["close"](false); }
			})
			.catch(function (response) { setTextoAlert("Problemas de conexión."); setShowAlert(true); });
	}
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
			<div className="w3-modal w3-text-black" style={{ display: (props["show"]) ? "flex" : "none" }}>
				<div className="w3-modal-content w3-animate-top w3-round-large" style={{ width: 50 + '%', marginTop : -50 }}>
					<div className="w3-container w3-margin-top w3-margin-bottom">
						<span onClick={() => props["close"]()}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;
						</span>
						<br />
						<div className="w3-section w3-container "><Experto experto={props["experto"]} /></div>
						<div className="w3-section">
							<label className="">¿Cómo te fue con el servicio?*</label>
							<ReactStars
								value={evaluation}
								count={5}
								size={35}
								onChange={(value) => setEvaluation(value)}
							/>
						</div>
						<div>
							<label className="">¿Cuál fue el precio del servicio?</label>
							<div>
								<input className="w3-round-large" type="number" value={cost} min={0}
									onChange={(e) => setCost(e.target.value)} />
							</div>
						</div>
						
						<p className="w3-tiny" >Este valor no es obligatorio pero será de gran utilidad para crear una guía de precios</p>
						<div className="w3-section">
							<label className="">Dejar un comentario*</label>
							<textarea className="w3-input w3-border w3-round-large w3-margin-bottom" value={commentary}
								onChange={(e) => setCommentary(e.target.value)} />
						</div>
					</div>
					<div className="w3-center w3-section w3-container">
						<button onClick={calificar} disabled={false}
							className={(evaluation === 0 || commentary === "") ? "w3-button w3-disabled w3-block w3-round-large w3-indigo " : "w3-button w3-block w3-indigo w3-hover-indigo w3-round-large"}>Enviar</button>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default Calificar;