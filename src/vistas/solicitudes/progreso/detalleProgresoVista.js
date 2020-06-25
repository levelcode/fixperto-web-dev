import React from "react";
import httpClient from "../../../constantes/axios";
import Alerta from "../../../componentes/alertaVista";
import CancelarSolicitud from "../../../componentes/cancelarSolicitud";
import Solicitud from "../../../componentes/solicitud";
import Experto from "../../../componentes/experto";
import axios from "axios";
class DetalleProgreso extends React.Component {
	constructor(props) { super(props); this.state = { id: "", isCancelVisible: false, isSolicitudVisible: false, showAlert: false, textoAlert: "", request: {}, experts: [], user: JSON.parse(localStorage.getItem("@USER")) }; }
	componentDidMount() { this.getRequest(""); }
	UNSAFE_componentWillReceiveProps(next_props) {
		if (next_props["request"] !== "" && next_props["request"] !== this.state["id"]) { this.getRequest(next_props["request"]); }
	}
	getRequest = (id) => {
		let me = this;
		if (id !== "")
			return axios({
				method: 'post', url: httpClient.urlBase + '/cliente/getRequestProgress',
				data: { id }, headers: { Accept: 'application/json' }
			})
				.then(function (responseJson) {
					if (responseJson["data"]["success"]) { me.setState({ id, request: responseJson["data"].request, experts: responseJson["data"].experts }); }
					else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
				})
				.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
		else { me.setState({ request: {} }); }
	}
	verDetalle = () => { this.setState({ isSolicitudVisible: true }); }
	cancelRequest = () => { this.setState({ isCancelVisible: true }); }
	closeCancelar = (status) => { this.setState({ isCancelVisible: false }); this.props["back"](status); }
	render() {
		const { isSolicitudVisible, isCancelVisible, showAlert, textoAlert, request, experts, id } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<CancelarSolicitud show={isCancelVisible} id={id} close={(status) => this.closeCancelar(status)} />

				<Solicitud show={isSolicitudVisible} request={id} close={() => this.setState({ isSolicitudVisible: false })} />
				
				{id === this.props["request"] && <div>
					<div className="w3-section detalle_solic">
						<div className="w3-cell">
							<div className=" icon_card_detalle">
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
								<p className="w3-cell">{request["zone"]}</p>
							</div>
							<div className="w3-margin-bottom">
								<div className="w3-cell  w3-container">
									<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell">Fecha de inicio: {request["registry_date"]}</p>
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
							<h3>Fixpertos Postulados</h3>
							</div>
							<div className="w3-col s3">
								<div className="divider_line"></div>
							</div>
						</div>
						{experts.map((experto, i) => (
							<div className="section_experto" key={i}>
								<Experto experto={experto} history={this.props["history"]} />
								<div className="w3-cell-row w3-row">
									<div className="w3-cell w3-button btn_chat w3-col m5"
										onClick={() => {
											this.props["navigation"].navigate("Chat", {
												chat: { to: experto, user: this.state["user"], request: request["id"], type: "cliente", offert: true, typeOffert: "progress" }
											})
										}}>Chat
									</div>
									<div className=" w3-cell w3-button btn_oferta w3-col m7"
										onClick={() => {
											this.props["navigation"].navigate("VerOferta", {
												expert: experto["id"], request: request["id"], type: "progress"
											})
										}}>Ver Oferta
								</div>
								</div>
							</div>
						))}
					</div>
					<div className="w3-block  btn_cancelar_solic "
						onClick={() => { this.cancelRequest() }}>CANCELAR SOLICITUD
				    </div>
				</div>}
			</React.Fragment >
		);
	}
}
export default DetalleProgreso;



