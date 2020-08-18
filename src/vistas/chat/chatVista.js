import React from 'react';
import { GiftedChat, Send } from 'react-web-gifted-chat';
import httpClient from "../../constantes/axios";
import Alerta from "../../componentes/alertaVista";
import Experto from "../../componentes/experto";
import VerOferta from "../../componentes/verOferta";
import axios from "axios";
import socket from "../../constantes/socket";
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: [], messages: [], request: "", to: "", action: "",
			showChat: false, showAlert: false, textoAlert: "", isVerOfertaVisible: false,
		};
		this.onReceivedMessage = this.onReceivedMessage.bind(this);
		this.onSend = this.onSend.bind(this);
		this._storeMessages = this._storeMessages.bind(this);
		socket.on('message', (messages, de, request, type, user, action) => {
			this.onReceivedMessage(messages, de, request, type, user, action)
		});
	}
	componentDidMount() {
		this.getChats();
		if (this.props["history"]["location"]["datos"]) {
			this.setState({
				showChat: true,
				to: this.props["history"]["location"]["datos"]["to"],
				request: this.props["history"]["location"]["datos"]["request"],
			})
			this.getMessages(this.props["history"]["location"]["datos"]["request"], this.props["history"]["location"]["datos"]["to"]["userId"]);
		}
	}
	getChats = () => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/seguridad/getChats',
			data: { user: JSON.parse(localStorage.getItem("@USER"))["id"] }, headers: { Accept: 'application/json' }
		}).then(function (responseJson) {
			if (responseJson["data"]["success"]) { me.setState({ chats: responseJson["data"].chats }); }
			else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
		}).catch(function (error) {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		});
	}
	onReceivedMessage(messages, de, request, type, user, action) {
		/*	if (this.state["user"].id !== messages[0]["user"]["_id"]) {
				Notifications.presentLocalNotificationAsync({
					title: "Chat", body: "Nuevo mensaje...",
					data: {
						title: "Chat", texto: "Nuevo mensaje...", fecha: "", tipo: "chat", vista: "Chat",
						vista_data: { chat: { to: user, user: this.state["user"], request, type: this.state["type"], action, de, para: this.state["to"] } }
					},
					ios: { sound: true },
					android: { channelId: 'fixperto-messages' },
				});
			}*/
		this._storeMessages(messages);
	}
	onSend(messages = []) {
		messages[0]["user"]["_id"] = messages[0]["user"]["id"];
		messages[0]["_id"] = messages[0]["id"];
		let me = this;
		socket.emit('message', messages[0], me.state["to"]["userId"], me.state["request"], "cliente",
			JSON.parse(localStorage.getItem("@USER")), (me.props["action"]) ? me.props["action"] : "", me.state["to"], me.state["to"]["token"]);
		this._storeMessages(messages);
	}
	_storeMessages(messages) {
		this.setState((previousState) => { return { messages: GiftedChat.append(previousState["messages"], messages) }; });
	}
	getMessages = (request, to) => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/seguridad/getMessages',
			data: { request, user: JSON.parse(localStorage.getItem("@USER"))["id"], to }, headers: { Accept: 'application/json' }
		}).then(function (responseJson) {
			if (responseJson["data"]["success"]) { me.setState({ messages: responseJson["data"].messages }); }
			else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
		}).catch(function (error) {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		});
	}
	showChat = (datos) => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/fixperto/getExpert',
			data: { id: datos["typeId"] }, headers: { Accept: 'application/json' }
		}).then(function (responseJson) {
			if (responseJson["data"]["success"]) {
				me.setState({ showChat: true, to: responseJson["data"].result, request: datos["request"], action: datos["action"] });
				me.getMessages(datos["request"], responseJson["data"]["result"]["userId"]);
			}
			else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
		}).catch(function (error) {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		});
	}
	closeVerOferta = (status = "") => {
		if (status === "") { this.setState({ isVerOfertaVisible: false }); }
		else if (status === "aceptada") {
			this.setState({ isVerOfertaVisible: false }); this.props["history"]["push"]("solicitud-agendado");
		}
		else if (status === "rechazada") { this.setState({ isVerOfertaVisible: false }); }
	}
	render() {
		const { showAlert, textoAlert, chats, showChat, messages, to, request, isVerOfertaVisible } = this.state;
		var user = { id: JSON.parse(localStorage.getItem("@USER"))["id"] || -1 };
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<VerOferta show={isVerOfertaVisible} expert={to["id"]} request={request} close={(status) => this.closeVerOferta(status)} />
				<div className="container">
					<div className="perfil">
						<div className="w3-cell-row w3-margin-bottom">
							<div className="w3-cell" style={{ width: 35 + "px" }}>
								<img src="../../assets/chats.png" alt="Norway" />
							</div>
							<h2 className="w3-cell text_blue" style={{ position: "relative", left: 10 }}>Chat</h2>
						</div>
						<div className="w3-row">
							<div className="w3-col s12 m5">
								<div className="w3-card card_chat_1">
									<ul className="w3-ul w3-card-2">
										{chats.map((chat, key) => (
											<li key={key} className="w3-bar" style={{ cursor: "pointer" }} onClick={() => { this.showChat(chat) }}>
												<div className="w3-cell">
													<img src={
														(chat.type === "profesional") ? httpClient.urlBase + "/uploads/registros/profesional/" + chat["avatar"] :
															httpClient.urlBase + "/uploads/registros/empresa/" + chat["avatar"]
													}
														className="w3-circle img_chat_icon" alt="Icono" />
												</div>
												<div className="w3-cell w3-container">
													<span className="w3-large text_blue text_name">{chat["name"]}</span><br />
													<span className="text_name">{chat["denomination"]}</span>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="w3-col s12 m7">
								<div className="w3-card card_info">
									{showChat && <div className="w3-row">
										<div className="w3-block w3-button btn_oferta"
											onClick={() => { this.setState({ isVerOfertaVisible: true }) }}>
											Ver servicio
										</div>
										<div className="w3-card section_experto" style={{ padding: 20 }}>
											<Experto experto={to} history={this.props["history"]} />
										</div>
										<div className="w3-row copy">
											<div className="w3-col s3">
												<img src="../../assets/iconos/alert.png" style={{ width: 40, height: 40, position: "relative", left: 30 + "%", top: 15 }} alt="alert"></img>
											</div>
											<div className="w3-col s9">
												<p>Nuestros Fixpertos están atentos a tus necesidades para solucionarlas pronto</p>
											</div>
										</div>
										<div className="" style={{ width: 100 + "%", height: 40 + "vh" }}>
											<GiftedChat
												messages={messages}
												onSend={(messages) => this.onSend(messages)}
												user={user}
												placeholder="Mensaje..."
												renderSend={(props) => {
													return (
														<Send {...props}>
															<div style={{ marginRight: 10, marginBottom: 10 }}>
																<b>Enviar</b>
															</div>
														</Send>
													)
												}}
											/>
										</div>
									</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>

			</React.Fragment>
		);
	}
}
export default Chat;