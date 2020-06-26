import React from 'react';
import { GiftedChat, Send } from 'react-web-gifted-chat';
import httpClient from "../../constantes/axios";
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import socket from "../../constantes/socket";
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: [], messages: [], request: "", to: "", offert: "", action: "",
			showChat: false, showAlert: false, textoAlert: "",
		};
		this.onReceivedMessage = this.onReceivedMessage.bind(this);
		this.onSend = this.onSend.bind(this);
		this._storeMessages = this._storeMessages.bind(this);
		socket.on('message', (messages, de, request, type, user, action) => {
			this.onReceivedMessage(messages, de, request, type, user, action)
		});
	}
	componentDidMount() { this.getChats(); }
	getChats = () => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/seguridad/getChats',
			data: { user: JSON.parse(localStorage.getItem("@USER"))["id"] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { me.setState({ chats: responseJson["data"].chats }); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
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
		let me = this;
		socket.emit('message', messages[0], me.state["to"]["userId"], me.state["request"], "cliente",
			JSON.parse(localStorage.getItem("@USER")), (me.props["action"]) ? me.props["action"] : "");
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
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { me.setState({ messages: responseJson["data"].messages }); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	showChat = (datos) => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/fixperto/getExpert',
			data: { id: datos["typeId"] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) {
					me.setState({ showChat: true, to: responseJson["data"].result, request: datos["request"], offert: datos["offert"], action: datos["action"] });
					me.getMessages(datos["request"], responseJson["data"]["result"]["userId"]);
				}
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	render() {
		const { showAlert, textoAlert, chats, showChat, messages } = this.state;
		var user = { id: JSON.parse(localStorage.getItem("@USER"))["id"] || -1 };
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="w3-margin-bottom">
					<div className="w3-cell" style={{ width: 35 + "px" }}>
						<img src="../../assets/chats.png" alt="Norway" />
					</div>
					<h2 className="w3-cell w3-margin-left">Chat</h2>
				</div>
				<div className="w3-cell margin-bottom" style={{ width: 30 + "vw" }}>
					<ul className="w3-ul w3-card-2">
						{chats.map((chat, key) => (
							<li key={key} className="w3-bar" style={{ cursor: "pointer" }} onClick={() => { this.showChat(chat) }}>
								<div className="w3-cell">
									<img src={
										(chat.type === "profesional") ? "https://api.fixperto.com/uploads/registros/profesional/" + chat["avatar"] :
											"https://api.fixperto.com/uploads/registros/empresa/" + chat["avatar"]
									}
										className="w3-circle w3-hide-small imagen-icono" alt="Icono" />
								</div>
								<div className="w3-cell w3-container">
									<span className="w3-large">{chat["name"]}</span><br />
									<span>{chat["denomination"]}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
				{showChat && <div className="w3-cell" style={{ width: 70 + "vw", height: 70 + "vh" }}>
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
				</div>}
			</React.Fragment>
		);
	}
}
export default Chat;