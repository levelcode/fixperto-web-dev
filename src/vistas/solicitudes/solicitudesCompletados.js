import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import httpClient from "../../constantes/axios";
import SolicitudCompletado from "./completado/completadoVista";
class SolicitudesCompletado extends React.Component {
	constructor(props) {
		super(props);
		this.state = { textoAlert: "", showAlert: false, requests: [], request: "", solicitud: {}, show_request: false }
	}
	componentDidMount() { this.getRequests(); }
	getRequests = () => {
		var me = this;
		axios({
			method: 'post',
			url: httpClient.urlBase + '/cliente/getRequestsCompleted',
			data: { id: JSON.parse(localStorage.getItem("@USER"))["typeId"] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				responseJson = responseJson['data'];
				if (responseJson.success) { me.setState({ requests: responseJson.requests }); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, por favor pruebe nuevamente" }); }
			})
			.catch((error) => {
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			})
	}
	back = (status = "") => {
		if (status === "") { return; }
		else if (status) { this.setState({ show_request: false, showAlert: true, textoAlert: "Experto calificado" }); this.getRequests(); }
		else { this.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, por favor pruebe nuevamente" }); }
	}
	selectSolicitud = solicitud => { this.setState({ solicitud, request: solicitud.id, show_request: true }) };
	deselectSolicitud = () => { this.setState({ show_request: false }) };
	render() {
		const { textoAlert, showAlert, requests, request, show_request, solicitud } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="solicitudes" style={{ display: (!show_request) ? "block" : "none" }} >
					<div className="info_perfil_config">
						<h1 className="titleRegister">Completados</h1>
						<div className="w3-row serv">
							{
								requests.length > 0 && requests.map((item, key) => (
									<div className="cont_srv w3-row" key={key}>
										<div className="w3-col s2 m3 ">
											{(item.icon) ?
												<img src={item.icon} className="img_serv" alt="Imagen" />
												: <img src="../../../assets/iconos/alert_icon.png" className="img_serv" alt="Imagen" />
											}
										</div>
										<div className="w3-col s10 m7 ">
											{
												item.emergency === 1 && <div >
													<p className="text_blue_dark">
														<img src="../../../assets/iconos/emergencia.png" style={{ width: 18, height: 18, marginTop: -8, marginRight: 10 }} alt="Imagen" />
                                                        Solicitud de emergencia
                                                    </p>
												</div>
											}
											<p> <span className="text_blue_dark">{item.service}</span> / {item.category} </p>
											<p>{item.fixperto}</p>
											<p>Fecha completado : {item.registry_date}</p>
											{
												item.emergency === 1 &&
												<p className="text_blue_dark">
													Tiempo de respuesta: {item.response_time}
												</p>
											}
											<p style={{ cursor: "pointer" }} onClick={() => { this.selectSolicitud(item) }}>
												<img src="../../assets/iconos/mas.png" className="img_mas" alt="star"></img>
                                                Ver más
                                            </p>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</div>
				<div className="" style={{ display: (show_request) ? "block" : "none" }}>
					<div className=" w3-cell-row">
						<div className="w3-cell w3-cell-middle" style={{ width: 35 + "px", cursor: "pointer" }}
							onClick={() => { this.deselectSolicitud() }}>
							<img src="../../../assets/iconos/atras30.png" alt="Norway" />
						</div>
						<h2 className="w3-cell w3-center">Solicitud</h2>
					</div>
					<SolicitudCompletado request={request} solicitud={solicitud} back={(status) => this.back(status)} />
				</div>
			</React.Fragment >
		);
	}
}
export default SolicitudesCompletado;