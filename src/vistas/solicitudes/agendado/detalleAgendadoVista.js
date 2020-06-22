import React from "react";
import httpClient from "../../../constantes/axios";
import Alerta from "../../../componentes/alertaVista";
import CancelarSolicitud from "../../../componentes/cancelarSolicitud";
import Solicitud from "../../../componentes/solicitud";
import Servicio from "../../../componentes/servicio";
import Problema from "../../../componentes/problema";
import Experto from "../../../componentes/experto";
import axios from "axios";
class DetalleAgendado extends React.Component {
	constructor(props) {
		super(props); this.state = {
			id: "", isCancelVisible: false, isServicioVisible: false, isSolicitudVisible: false, isProblemaVisible: false,
			showAlert: false, textoAlert: "", request: {}, expert: {}, user: JSON.parse(localStorage.getItem("@USER")),
			fecha_agendada: "", fecha_actual: "",
		};
	}
	componentDidMount() { this.getRequest(""); }
	UNSAFE_componentWillReceiveProps(next_props) {
		if (next_props["request"] !== "" && next_props["request"] !== this.state["id"]) { this.getRequest(next_props["request"]); }
	}
	getRequest = (id) => {
		let me = this;
		if (id !== "")
			return axios({
				method: 'post', url: httpClient.urlBase + '/cliente/getRequestScheduled',
				data: { id }, headers: { Accept: 'application/json' }
			})
				.then(function (response) {
					if (response["data"]["success"]) {
						var responseJson = response["data"];
						var aux = responseJson.request["hour"].split(":");
						var from1 = responseJson.request["scheduled_date"].split("/");
						var fecha_agendada = new Date(from1[2], from1[1] - 1, from1[0]);
						fecha_agendada.setDate(fecha_agendada.getDate() - 1);
						fecha_agendada.setHours(aux[0]);
						fecha_agendada.setMinutes(aux[1]);
						fecha_agendada.setSeconds(aux[2]);
						var fecha_actual = new Date(responseJson.request["date"]);
						me.setState({ id, request: responseJson.request, expert: responseJson.expert, fecha_agendada, fecha_actual });
					}
					else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
				})
				.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
		else { me.setState({ request: {} }); }
	}
	rechazar = () => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/cliente/refuseOffert',
			data: { expert: me.state["expert"].id, request: me.state["request"].id }, headers: { Accept: 'application/json' }
		})
			.then(function (response) {
				if (response["data"]["success"]) { me.props["backRechazar"](true); }
				else { me.props["backRechazar"](false); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });

	}
	verDetalle = () => { this.setState({ isSolicitudVisible: true }); }
	servicio = () => { this.setState({ isServicioVisible: true }); }
	problema = () => { this.setState({ isProblemaVisible: true }); }
	closeProblema = (status) => { this.setState({ isProblemaVisible: false }); this.props["backProblema"](status); }
	cancelRequest = () => { this.setState({ isCancelVisible: true }); }
	closeCancelar = (status) => { this.setState({ isCancelVisible: false }); this.props["backCancelar"](status); }
	render() {
		const { fecha_actual, fecha_agendada, isSolicitudVisible, isServicioVisible, isProblemaVisible, isCancelVisible, showAlert, textoAlert, request, expert, id, user } = this.state;
		let disable = (fecha_actual !== "" && fecha_agendada !== "") ? (fecha_actual.getTime() < fecha_agendada.getTime()) ? "" : "w3-disabled" : "";
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<CancelarSolicitud show={isCancelVisible} id={id} close={(status) => this.closeCancelar(status)} />
				<Solicitud show={isSolicitudVisible} request={id} close={() => this.setState({ isSolicitudVisible: false })} />
				<Servicio show={isServicioVisible} expert={expert["id"]} request={id} type="accepted" close={() => this.setState({ isServicioVisible: false })} />
				<Problema show={isProblemaVisible} request={id} user={user.id} type_user={user.type} typeId={user.typeId} close={(status) => this.closeProblema(status)} />
				{id === this.props["request"] && <div>
					<div className="w3-card">
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
								<p className="w3-cell">Fecha de inicio: {request["registry_date"]}</p>
							</div>
							<div className="w3-margin-bottom">
								<div className="w3-cell  w3-container">
									<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell">Fecha agendada: {(request["scheduled_date"]) ? request["scheduled_date"] : "Pendiente"}</p>
							</div>
							<div className="w3-margin-bottom" style={{ cursor: "pointer" }} onClick={() => this.verDetalle()}>
								<div className="w3-cell w3-container">
									<img src="../../../../assets/iconos/mas.png" className=" imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell">Ver detalle</p>
							</div>
						</div>
					</div>
					<h1 className="w3-section w3-center titleRegister">Fixperto® contratado</h1>
					<div className="w3-section">
						<div className="w3-card" >
							<Experto experto={expert} history={this.props["history"]} />
							<div className="w3-cell-row">
								<div className="w3-cell w3-button w3-hover-teal w3-teal"
									onClick={() => {
										this.props["navigation"].navigate("Chat", {
											chat: { to: expert, user: this.state["user"], request: request["id"], type: "cliente", offert: true }
										})
									}}>Chat
								</div>
							</div>
						</div>
						<h3 className="w3-center w3-section">
							Recuerda que todos los servicios solo se pueden cancelar hasta 24 horas antes
						</h3>
						<div className="w3-button w3-hover-blue w3-blue  w3-section"
							onClick={() => {
								this.verServicio()
							}}>
							Ver servicio
						</div>
						<div className={`w3-block w3-button w3-hover-red w3-red w3-section ${disable}`}
							onClick={() => {
								this.rechazar()
							}}>
							Rechazar servicio
						</div>
						<div className={`w3-block w3-button w3-hover-red w3-red w3-section ${disable}`}
							onClick={() => { this.cancelRequest() }}>
							Cancelar solicitud
				        </div>
						<div className="w3-block w3-button w3-hover-red w3-red w3-section"
							onClick={() => { this.problema() }}>
							Reportar problema
				        </div>
					</div>
				</div>}
			</React.Fragment >
		);
	}
}
export default DetalleAgendado;



