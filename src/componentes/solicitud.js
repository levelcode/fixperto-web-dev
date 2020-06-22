import React, { useState } from "react";
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
const Solicitud = (props) => {
	const [actualizar, setActualizar] = useState(true);
	const [request, setRequest] = useState({});
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert, setTextoAlert] = useState("");
	const getRequest = () => {
		return axios({
			method: 'post', url: httpClient.urlBase + '/seguridad/getRequest',
			data: { id: props["request"] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { setRequest(responseJson["data"]["request"]); setActualizar(false); }
				else { setTextoAlert("Ha ocurrido un erro, intente nuevamente"); setShowAlert(true); }
			})
			.catch(function (response) { setTextoAlert("Problemas de conexión."); setShowAlert(true); });
	}
	if (props["show"] && actualizar) { getRequest(); }
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
			<div className="w3-modal w3-text-black" style={{ display: (props["show"]) ? "flex" : "none" }}>
				<div className="w3-modal-content w3-animate-top w3-round-large" style={{ width: 50 + '%' }}>
					<div className="w3-container w3-margin-top w3-margin-bottom">
						<span onClick={() => { setActualizar(true); props["close"](); }}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
						<br />
						<div className="w3-section w3-card">
							<div className="w3-cell">
								<div className="">
									{(request.icon) ?
										<img src={request.icon} className="imagen-solicitud  w3-margin-left w3-margin-top" alt="Imagen" />
										: <img src="../../../../assets/icon.png" className=" w3-margin-left w3-margin-top" alt="Imagen" />
									}
								</div>
							</div>
							<div className="w3-cell">
								{
									request["emergency"] === 1 &&
									<div className="w3-margin-bottom">
										<div className="w3-cell w3-container">
											<img src="../../../../assets/iconos/emergencia.png" className="imagen-icono" alt="Imagen" />
										</div>
										<p className="w3-cell">Servicio de emergencia</p>
									</div>
								}
								<div className="w3-margin-bottom w3-container">
									<b className="w3-cell">{request["service"]}</b>
									<p className="w3-cell">/{request["category"]}</p>
								</div>
								<div className="w3-margin-bottom">
									<div className="w3-cell  w3-container">
										<img src="../../../../assets/iconos/ubicacion.png" className="imagen-icono" alt="Imagen" />
									</div>
									<p className="w3-cell">{request["zone"]}</p>
								</div>
								<div className="w3-margin-bottom">
									<div className="w3-cell  w3-container">
										<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
									</div>
									<p className="w3-cell">registro: {request["registry_date"]}</p>
								</div>
								<div className="w3-margin-bottom w3-container">
									<b className="w3-cell">Descripción: </b>
									<p className="w3-cell w3-container">{request["description"]}</p>
								</div>
								<div className="w3-margin-bottom w3-container">
									<b className="w3-cell">Dirección: </b>
									<p className="w3-cell w3-container">{(request["address"]) ? request["address"] : "Pendiente"}</p>
								</div>
							</div>
						</div>
						{request["photos"] && request["photos"].length > 0 && <div className="w3-section w3-center"><b>Fotos</b></div>}
						<div className="w3-row-padding">
							{request["photos"] && request["photos"].length > 0 && request["photos"].map((photo, key) => (
								<div className="w3-quarter" key={key}>
									<img src={"https://api.fixperto.com/uploads/requests/" + photo["image"]} className="imagen-experto" alt="Foto"></img>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default Solicitud;