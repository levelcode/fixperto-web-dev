import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import httpClient from "../../constantes/axios";

const configuracion = [
	{ name: "Notificaciones", action: "notification", value: "notification" },
	{ name: "Notificaciones del chat", action: "chat", value: "notification_chat" },
]

class ConfiguracionVista extends React.Component {

	constructor(props) {
		super(props); 
		this.state = { 
			textoAlert			: "", 
			showAlert			: false, 
			notification_chat	: true, 
			notification		: true,
			user				: []
		}
	}

	componentDidMount() { 
        var user = JSON.parse(localStorage.getItem("@USER"))
        this.state['user'].push(user)
		this.setState({ notification_chat: user["notification_chat"], notification: user["notification"] })

		this.getConfigNotifications()
    }

	setNotificaciones = () => {
		this.setState({ notification: !this.state["notification"] });
		var sta = Object.assign(this.state);
		var id 	= this.state['user'][0]['id']
		var me = this

		axios({
            method: 'post',
            url: httpClient.urlBase + '/seguridad/setNotification',
			data : { 
				id	: id, 
				notification_chat: (sta["notification_chat"] === true) ? 0 : 1
			},
            headers: { Accept: 'application/json' }
        })
        .then(function (responseJson) {
            responseJson = responseJson['data']

            if (!responseJson.success) {
				me.setState({ notification: !this.state["notification"] });
			} else {
				var user = JSON.parse(localStorage.getItem("@USER"))
				user["notification"] = !sta["notification"];
				me.state['user'].push(user)
			}
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
				this.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
        })
	}

	setNotificacionesChat = () => {
		this.setState({ notification_chat: !this.state["notification_chat"] });
		var sta = Object.assign(this.state);
		var id 	= this.state['user'][0]['id']
		var me = this

		axios({
            method: 'post',
            url: httpClient.urlBase + '/seguridad/setNotificationChat',
			data : { 
				id	: id, 
				notification	: (sta["notification"] === true) ? 0 : 1
			},
            headers: { Accept: 'application/json' }
        })
        .then(function (responseJson) {
            responseJson = responseJson['data']

            if (!responseJson.success) {
				me.setState({ notification_chat: !this.state["notification_chat"] })
			} else {
				var user = JSON.parse(localStorage.getItem("@USER"))
				user["notification_chat"] = !sta["notification_chat"];
				me.state['user'].push(user)
			}
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
				this.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
        })
	}

	getConfigNotifications = () => {

		var id 	= this.state['user'][0]['id']
		var me = this

		axios({
            method: 'post',
            url: httpClient.urlBase + '/seguridad/getConfigNotifications',
			data : { 
				id	: id
			},
            headers: { Accept: 'application/json' }
        })
        .then(function (responseJson) {
            responseJson = responseJson['data']

            if (responseJson.success) {
				var result = responseJson.result;

				console.log(result);
				
				me.setState({
					notification: (result["notification"]) ? true : false,
					notification_chat: (result["notification_chat"]) ? true : false
				})
			}
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
				this.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
        })
	}
	

	render() {

		const { textoAlert, showAlert, notificacion, notificaciones_chat } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="info_perfil_config">
						<h1 className="titleRegister">Notificaciones</h1>

                        <p className="w3-padding">Al desactivar las notificaciones no recibirás de primera mano las ofertas de servicios</p>

                        <div className="check_config">
                            <input className="w3-check" type="checkbox" value={notificacion} />
                            <label>Notificacion</label>
                        </div>

                        <hr></hr>

                        <div className="check_config">
                            <input className="w3-check" type="checkbox" value={notificaciones_chat} />
                            <label>Notificaciones del chat</label>
                        </div>

                        <p><button className="w3-button btn"
                        onClick={(e) => {
                            e.preventDefault();
                            this.continuar();
                        }}>Guardar</button></p>

					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default ConfiguracionVista;