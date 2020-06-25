import React from 'react';
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
class VerOferta extends React.Component {
	constructor(props) { super(props); this.state = { showAlert: false, textoAlert: "", offert: {}, solicitud: {} }; }
	UNSAFE_componentWillReceiveProps(next_props) { if (next_props["show"]) { this.getOffert(); } }
	getOffert = () => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/fixperto/getOffert',
			data: { expert: me.props["expert"], request: me.props["request"] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) {
					me.setState({ offert: responseJson["data"].offert, solicitud: responseJson["data"].solicitud });
				}
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	formato = fecha => { if (fecha) { let hora = fecha.split(":"); return hora[0] + "h " + hora[1] + " min"; } else return ""; }
	close = () => { this.props["close"](); }
	aceptar = () => { }
	rechazar = () => { }
	render() {
		const { showAlert, textoAlert, offert, solicitud } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="w3-modal w3-text-black" style={{ display: (this.props["show"]) ? "flex" : "none" }}>
					<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large" style={{ width: 50 + '%' }}>
						<span onClick={() => this.close()}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
						<br />
						{
							(solicitud["emergency"] === 1) &&
							<div className="w3-container w3-section">
								<div className="w3-row w3-margin-bottom">
									<div className="w3-cell">
										<img src="../../../../assets/iconos/emergencia.png" className="imagen-icono" alt="Imagen" />
									</div>
									<p className="w3-cell text_blue">Servicio de emergencia</p>
								</div>
								<div>
									<p className="w3-cell"> <b className="text_blue">Tiempo de respuesta:</b> {this.formato(offert["response_time"])}</p>
								</div>
							</div>
						}
						{
							(offert["status"] === "progress") &&
							<div className="w3-container w3-section">
								<p texto="Antes de aceptar el servicio le recomendamos que su experto ingrese toda la información de la propuesta" />
							</div>
						}
						<h4 className="w3-center">Propuesta del servcio</h4>
						<div className="w3-container">
							<div className="w3-margin-bottom">
								<b className="w3-cell">Descripción: </b>
								<p className="w3-cell">{offert["observations"]}</p>
							</div>
							<div className="w3-margin-bottom">
								<b className="w3-cell">Fecha: </b>
								<p className="w3-cell">{(offert["start_date"]) ? offert["start_date"] : "Pendiente"}</p>
							</div>
							<div className="">
								<b className="w3-cell">Hora: </b>
								<p className="w3-cell">{(offert["hour"]) ? offert["hour"] : "Pendiente"}</p>
							</div>
						</div>
						{
							offert["collaborator"] !== null &&
							<div className="w3-container w3-section">
								<div className="w3-margin-bottom">
									<b>Persona que realizará el trabajo:</b>
								</div>
								<div className="w3-row">
									<div className="w3-cell">
										<img src={"https://api.fixperto.com/uploads/registros/empresa/collaborators/" + offert["col_photo"]} className="imagen-experto" alt="Colaborador" />
									</div>
									<div className="w3-cell w3-container">
										<b className="">{offert["col_name"]}</b>
										<div className="">
											<b className="w3-cell">Cédula: </b>
											<p className="w3-cell">{offert["col_number"]}</p>
										</div>
										<div className="">
											<b className="w3-cell">Teléfono: </b>
											<p className="w3-cell">{offert["col_phone"]}</p>
										</div>
									</div>
								</div>
							</div>
						}
						{
							offert["status"] === "progress" &&
							<div className=" w3-container w3-section">
								<button className="w3-button btn w3-block"
									onClick={() => { this.aceptar(); }}>
									ACEPTAR SERVICIO
					            </button>
								<div className="w3-block btn_cancelar_solic "
									onClick={() => { this.rechazar(); }}>
									RECHAZAR SERVICIO
		                        </div>
							</div>
						}
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default VerOferta;
