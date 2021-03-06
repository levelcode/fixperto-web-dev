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
			data: { id: props["request"] }, headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
		}).then(function (responseJson) {
			if (responseJson["data"]["success"]) { setRequest(responseJson["data"]["request"]); setActualizar(false); }
			else { setTextoAlert("Ha ocurrido un erro, intente nuevamente"); setShowAlert(true); }
		}).catch(function (error) {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				setTextoAlert("Problemas de conexión."); setShowAlert(true);
			}
		});
	}
	if (props["show"] && actualizar) { getRequest(); }
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
			<div className="w3-modal w3-text-black solicitudes" style={{ display: (props["show"]) ? "flex" : "none" }}>
				<div className="w3-modal-content w3-animate-top w3-round-large modal_solicitud" >
					<div className="w3-container  detalle_solic">
						<span onClick={() => { setActualizar(true); props["close"](); }}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
						<br />
						<div className="w3-section w3-row">
							<div className="w3-cell w3-col s12 m4">
								<div className=" icon_card_detalle_modal">
									{(request.icon) ?
										<img src={request.icon} className="imagen-solicitud  " alt="Imagen" />
										: <img src="../../../../assets/icon.png" className=" " alt="Imagen" />
									}
								</div>
							</div>
							<div className="w3-cell w3-col s12 m8">
								{
									request["emergency"] === 1 &&
									<div className="w3-margin-bottom">
										<div className="w3-cell w3-container">
											<img src="../../../../assets/iconos/emergencia.png" className="imagen-icono" alt="Imagen" style={{ marginTop: -13 }} />
										</div>
										<p className="w3-cell text_blue">Servicio de emergencia</p>
									</div>
								}
								<div className="w3-margin-bottom w3-container">
									<b className="w3-cell text_blue">{request["service"]}</b>
									<p className="w3-cell">/{request["category"]}</p>
								</div>
								<div className="w3-margin-bottom">
									<div className="w3-cell  w3-container">
										<img src="../../../../assets/iconos/ubicacion.png" className="imagen-icono" alt="Imagen" />
									</div>
									<p className="w3-cell"> <b className="text_blue">Ubicación</b> {request["zone"]}</p>
								</div>
								<div className="w3-margin-bottom">
									<div className="w3-cell  w3-container">
										<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
									</div>
									<p className="w3-cell"> <b className="text_blue">Fecha solicitud</b> {request["registry_date"]}</p>
								</div>
								<div className="w3-margin-bottom w3-container">
									<b className="w3-cell text_blue">Descripción: </b>
									<p className="w3-cell w3-container">{request["description"]}</p>
								</div>
								<div className="w3-margin-bottom w3-container">
									<b className="w3-cell text_blue">Dirección: </b>
									<p className="w3-cell w3-container">{(request["address"]) ? request["address"] : "Pendiente"}</p>
								</div>
							</div>
						</div>
						{request["photos"] && request["photos"].length > 0 && <div className="w3-section w3-center"><b>Fotos</b></div>}
						<div className="w3-row-padding">
							{request["photos"] && request["photos"].length > 0 && request["photos"].map((photo, key) => (
								<div className="w3-quarter" key={key}>
									<img src={"https://api.fixperto.com/uploads/requests/" + photo["image"]} className="imagen-experto" alt="Foto" style={{ marginBottom: 10 }}></img>
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