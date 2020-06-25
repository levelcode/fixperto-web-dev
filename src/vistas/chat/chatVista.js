import React from 'react';
import { GiftedChat, Send } from 'react-web-gifted-chat';
import httpClient from "../../constantes/axios";
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
class Chat extends React.Component {
	constructor(props) { super(props); this.state = { chats: [], showChat: false, showAlert: false, textoAlert: "", messages: [], }; }
	componentWillMount() {
		this.getChats();
		this.setState({
			messages: [
				{
					id: 1,
					text: 'Hello developer',
					createdAt: new Date(),
					user: {
						id: 2,
						name: 'React'
					},
				},
			],
		});
	}
	getChats = () => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/seguridad/getChats',
			data: { user: JSON.parse(localStorage.getItem("@USER"))["id"] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) {
					me.setState({ chats: responseJson["data"].chats });
				}
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	onSend(messages = []) {
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}));
	}
	showChat = () => { this.setState({ showChat: true }); }
	render() {
		const { showAlert, textoAlert, chats, showChat } = this.state;
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
							<li key={key} className="w3-bar" style={{ cursor: "pointer" }} onClick={() => { this.showChat() }}>
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
						messages={this.state.messages}
						onSend={(messages) => this.onSend(messages)}
						user={{ id: 1, }}
						placeholder="Mensaje..."
					/>
				</div>}
			</React.Fragment>
		);
	}
}

export default Chat;