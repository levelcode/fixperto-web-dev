import React from "react";
import httpClient from "../../../constantes/axios";
import Alerta from "../../../componentes/alertaVista";
import Solicitud from "../../../componentes/solicitud";
import Experto from "../../../componentes/experto";
import Calificar from "../../../componentes/calificar";
import VerOferta from "../../../componentes/verOferta";
import axios from "axios";
class DetalleCompletado extends React.Component {
	constructor(props) { super(props); this.state = { isVerOfertaVisible: false, calificado: false, id: "", isCalificarVisible: false, isSolicitudVisible: false, showAlert: false, textoAlert: "", request: {}, expert: {}, user: JSON.parse(localStorage.getItem("@USER")) }; }
	componentDidMount() { this.getRequest(""); }
	UNSAFE_componentWillReceiveProps(next_props) {
		if (next_props["request"] !== "" && next_props["request"] !== this.state["id"]) { this.getRequest(next_props["request"]); }
	}
	getRequest = (id) => {
		let me = this;
		if (id !== "")
			return axios({
				method: 'post', url: httpClient.urlBase + '/cliente/getRequestCompleted',
				data: { id }, headers: { Accept: 'application/json' }
			})
				.then(function (responseJson) {
					if (responseJson["data"]["success"]) { me.setState({ id, request: responseJson["data"].request, expert: responseJson["data"].expert }); }
					else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
				})
				.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
		else { me.setState({ request: {} }); }
	}
	verDetalle = () => { this.setState({ isSolicitudVisible: true }); }
	calificar = () => { this.setState({ isCalificarVisible: true }); }
	closeCalificar = (status = "") => {
		if (status === "") { return; }
		else if (status) {
			this.setState({
				isCalificarVisible: false, calificado: true,
				showAlert: true, textoAlert: "El experto ha sido calificado"
			});
		}
		else { this.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
	}
	closeVerOferta = (status = "") => {
		if (status === "") { this.setState({ isVerOfertaVisible: false }); }
	}
	render() {
		const { isVerOfertaVisible, calificado, isSolicitudVisible, isCalificarVisible, showAlert, textoAlert, request, expert, id } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<Solicitud show={isSolicitudVisible} request={id} close={() => this.setState({ isSolicitudVisible: false })} />
				<Calificar show={isCalificarVisible} calificador={id} experto={expert} close={(status) => this.closeCalificar(status)} />
				<VerOferta show={isVerOfertaVisible} expert={expert["id"]} request={request["id"]} type="completed" close={(status) => this.closeVerOferta(status)} />
				{id === this.props["request"] && <div>
					<div className="detalle_solic">
						<div className="w3-cell">
							<div className="w3-card icon_card_detalle">
								{(request.icon) ?
									<img src={request.icon} className="imagen-solicitud  " alt="Imagen" />
									: <img src="../../../../assets/icon.png" className="  " alt="Imagen" />
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
								<p className="w3-cell"> <b className="text_blue"> Fecha de inicio:</b> {request["registry_date"]}</p>
							</div>
							<div className="w3-margin-bottom">
								<div className="w3-cell  w3-container">
									<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell"> <b className="text_blue">Fecha de completado:</b> {(request["completed_date"]) ? request["completed_date"] : "Pendiente"}</p>
							</div>
							<div className="w3-margin-bottom" style={{ cursor: "pointer" }} onClick={() => this.verDetalle()}>
								<div className="w3-cell w3-container">
									<img src="../../../../assets/iconos/mas.png" className=" imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell text_blue_cl">Ver detalle</p>
							</div>
						</div>
					</div>
					<div className="w3-section experto_vista">
						<div className="divider w3-row">
							<div className="w3-col s3">
								<div className="divider_line"></div>
							</div>
							<div className="w3-col s6">
								<h3>Fixperto® contratado</h3>
							</div>
							<div className="w3-col s3">
								<div className="divider_line"></div>
							</div>
						</div>
						<div className="section_experto" >
							<Experto experto={expert} history={this.props["history"]} />
							<div className="w3-cell-row w3-row">
								<div className="w3-cell w3-button btn_chat w3-col m5 "
									onClick={() => {
										this.props["navigation"].navigate("Chat", {
											chat: { to: expert, user: this.state["user"], request: request["id"], type: "cliente", offert: true }
										})
									}}>Chat
								</div>
								<div className=" w3-cell w3-button btn_oferta w3-col m7"
									onClick={() => {
										this.setState({ isVerOfertaVisible: true })
									}}>Ver Oferta
								</div>
							</div>
						</div>
						{!calificado && <div className="w3-button w3-block btn_reportar w3-section"
							onClick={() => { this.calificar() }}>Calificar experto</div>}
					</div>
				</div>}
			</React.Fragment >
		);
	}
}
export default DetalleCompletado;



