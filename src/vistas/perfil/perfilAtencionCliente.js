import React from 'react';
import axios from "axios";
import httpClient from "../../constantes/axios";
class PerfilAtencionCliente extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false, show_add: false, show_view: false,
			user: JSON.parse(localStorage.getItem("@USER")), status: [], types: [], tickets: [],
			description: "", type: 1, name_user: "", response: "",
			ticket: { id: "", type_customer_support: "", status: "", date_registry: "", descriptions: [], answers: [] }
		}
	}
	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("@USER"));
		this.setState({ user, name_user: user["name"] }); this.getDatasCustomerSupport();
	}
	getDatasCustomerSupport = () => {
		var me = this; var id = this.state['user']['id'];
		axios({
			method: 'post',
			url: httpClient.urlBase + '/seguridad/getDatasCustomerSupport',
			data: { user: id },
			headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
		}).then(function (responseJson) {
			responseJson = responseJson['data'];
			if (responseJson.success) {
				me.setState({
					show_view: false, status: responseJson.status, types: responseJson.types, tickets: responseJson.tickets,
				});
			} else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un problema, inténtelo nuevamente" }); }
		}).catch((error) => {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		})
	}
	getDataCustomerSupport = (id) => {
		var me = this;
		axios({
			method: 'post',
			url: httpClient.urlBase + '/seguridad/getDataCustomerSupport',
			data: { id },
			headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
		}).then(function (responseJson) {
			responseJson = responseJson['data'];
			if (responseJson.success) {
				me.setState({ ticket: responseJson.ticket, show_add: true });
			} else {
				me.setState({ showAlert: true, textoAlert: "Ha ocurrido un problema, inténtelo nuevamente" });
			}
		}).catch((error) => {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		})
	}
	crearTicket = () => {
		if (this.state["type"] === 0 || this.state["description"] === "") {
			this.setState({ showAlert: true, textoAlert: "Debe seleccionar el departamento y dar una descripción de su problema" });
		} else {
			var me = this; var id = this.state['user']['id'];
			axios({
				method: 'post',
				url: httpClient.urlBase + '/seguridad/addDataCustomerSupport',
				data: { user: id, type_customer_support: this.state["type"], description: this.state["description"] },
				headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
			}).then(function (responseJson) {
				responseJson = responseJson['data'];
				if (responseJson.success) { me.setState({ description: "", type: 1 }); me.getDatasCustomerSupport(); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un problema, inténtelo nuevamente" }); }
			}).catch((error) => {
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			})
		}
	}
	responderTicket = () => {
		if (this.state["response"] === "") { this.setState({ showAlert: true, textoAlert: "De una respuesta" }); }
		else {
			var me = this;
			axios({
				method: 'post',
				url: httpClient.urlBase + '/seguridad/responseDataCustomerSupport',
				data: { id: me.state["ticket"]["id"], response: me.state["response"] },
				headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
			}).then(function (responseJson) {
				responseJson = responseJson['data'];
				if (responseJson.success) { me.setState({ show_add: false }); me.getDatasCustomerSupport(); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un problema, inténtelo nuevamente" }); }
			}).catch((error) => {
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			})
		}
	}
	closedTicket = id => {
		var me = this;
		axios({
			method: 'post',
			url: httpClient.urlBase + '/seguridad/hideDataCustomerSupport',
			data: { id },
			headers: { Accept: 'application/json', "Access-Token": JSON.parse(localStorage.getItem("@USER"))["tokenAuth"] }
		}).then(function (responseJson) {
			responseJson = responseJson['data'];
			if (responseJson.success) {
				me.setState({ description: "", showAlert: true, textoAlert: "Se ha generado el ticket" });
				me.getDatasCustomerSupport();
			} else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un problema, inténtelo nuevamente" }); }
		}).catch((error) => {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		})
	}
	render() {
		const { show_add, types, tickets, description, type, ticket, response, name_user } = this.state;
		return (
			<React.Fragment>
				<div className="info_perfil_atencion">
					<div className="w3-modal w3-text-black" style={{ display: (show_add) ? "flex" : "none", zIndex: 10 }}>
						<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large" style={{ width: 50 + '%', marginTop: 0 }}>
							<div className="w3-container w3-center" >
								<span onClick={() => this.setState({ show_add: false })}
									className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
								<br />
								<div className="w3-margin-top w3-margin-bottom">
									<h1 className="titleRegister">Detalle del ticket</h1>
									<p style={{ textAlign: "left" }}> <span className="text_blue">Id: </span> {ticket.id} </p>
									<p style={{ textAlign: "left" }}> <span className="text_blue">Estado: </span> {ticket.status} </p>
									<p style={{ textAlign: "left" }}> <span className="text_blue">Fecha: </span> {ticket.date_registry} </p>
									<p style={{ textAlign: "left" }}> <span className="text_blue">Cliente: </span> {name_user} </p>
									<p style={{ textAlign: "left" }}> <span className="text_blue">Tipo Soporte: </span> {ticket.type_customer_support} </p>
									<p style={{ textAlign: "left" }}> <span className="text_blue">Descripciones: </span> </p>
									<ul>
										{this.state.ticket['descriptions'].map((i, key) => (
											<li key={key} style={{ textAlign: "left" }}>{i.description}</li>
										))}
									</ul>
									{ticket["answers"].length > 0 && <div>
										<p style={{ textAlign: "left" }}> <span className="text_blue">Respuestas: </span> </p>
										<ul>
											{this.state.ticket['answers'].map((i, key) => (
												<li key={key} style={{ textAlign: "left" }}>{i.response}</li>
											))}
										</ul>
									</div>
									}
									<p style={{ textAlign: "left" }}> <span className="text_blue">Responder Ticket: </span></p>
									<input className="w3-input w3-border w3-round-large" type="text" value={response}
										onChange={(e) => this.setState({ response: e.target.value })} />
								</div>
								<div className="w3-margin-bottom">
									<div style={{ marginRight: 20 }}
										onClick={() => { this.responderTicket(); }}
										className="w3-button btn_oferta w3-round-large">Responder</div>
									<div onClick={() => this.setState({ show_add: false })}
										className="w3-button btn_cancel w3-round-large">Cerrar</div>
								</div>
							</div>
						</div>
					</div>
					<div className="">
						<h1 className="titleRegister">Nuevo Ticket</h1>
						<p className=" w3-padding">Por favor, diligencia el siguiente formulario y proporcionemos los datos mas precisos posible, para que podamos atender su solicitud rápidamente </p>
						<div className="w3-container">
							<label>Tipo soporte*</label>
							<div>
								<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="gender"
									value={type} onChange={(e) => this.setState({ type: e.target.value })}>
									{types.map((tp, key) => (
										<option key={key} value={tp.id} >{tp.denomination}</option>
									))}
								</select>
							</div>
							<label>Comentario*</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={description}
								onChange={(e) => this.setState({ description: e.target.value })} />
							<div className="btn_atencion_cliente">
								<button className="w3-button btn"
									onClick={() => { this.crearTicket(); }}>Enviar</button>
							</div>
						</div>
					</div>
					<div className="table_atencion">
						<h1 className="titleRegister">Mis tickets</h1>
						<table className=" w3-table-all w3-margin-bottom">
							<thead>
								<tr className="w3-red">
									<th>Id</th>
									<th>Tipo soporte</th>
									<th>Estado</th>
									<th>Fecha</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
								{tickets.map((item, key) => (
									<tr key={key} style={{ cursor: "pointer" }}>
										<td onClick={() => { this.getDataCustomerSupport(item.id) }}>{item.id}</td>
										<td onClick={() => { this.getDataCustomerSupport(item.id) }}>{item.type_customer_support}</td>
										<td onClick={() => { this.getDataCustomerSupport(item.id) }}>{item.status}</td>
										<td onClick={() => { this.getDataCustomerSupport(item.id) }}										>{item.date_registry}</td>
										<td><img src="../../../assets/iconos/eliminar.png" alt="Eliminar"
											style={{ width: 20, height: 20, alignItems: "center" }} onClick={() => {
												this.closedTicket(item.id)
											}} /></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default PerfilAtencionCliente;