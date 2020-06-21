import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import httpClient from "../../constantes/axios";

class Registro extends React.Component {

	constructor(props) { 
		super(props); 
		this.state = { 
			textoAlert		: "", 
			showAlert		: false, 
			pass			: "",
			new_pass		: "", 
			confirm			: "", 
			buttonDisabled	: false,
			user 			: [] 
		} 
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("@USER"))
		this.state['user'].push(user)
	}

	limpiarCampos(){
		this.setState({
			pass 		: '',
			new_pass 	: '',
			confirm 	: ''
		})
	}

	enviar() {
		if (this.state["pass"] === "" || this.state["new_pass"] === "" || this.state["confirm"] === "") {
			return this.setState({ showAlert: true, textoAlert: "Existe campo vacío" });
		} else if (this.state["new_pass"] !== this.state["confirm"]) {
			return this.setState({ showAlert: true, textoAlert: "Nueva contraseña distinta de su confirmación" });
		}
		else {
			this.setState({ buttonDisabled: true });
			var id = this.state['user'][0]['id']
			var me = this

			axios({
				method: 'post',
				url: httpClient.urlBase + '/seguridad/shangePassword',
				data : {
					id: id, 
					pass: me.state["pass"], 
					new_pass: me.state["new_pass"]
				},
				headers: { Accept: 'application/json' }
			})
			.then(function (responseJson) {

				responseJson = responseJson['data']
				me.setState({ buttonDisabled: false });

				if (responseJson.emailSend === true) {
					me.setState({ 
						showAlert: true, textoAlert: "Contraseña cambiada" 
					});
				}else { 
					me.setState({ 
						showAlert: true, textoAlert: "Ha ocurrido un problema, inténtelo nuevamente" 
					}); 
				}

				me.limpiarCampos()
			})
			.catch((error) => {
				me.setState({ buttonDisabled: false });
				me.limpiarCampos()
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			})

		}
	}


	render() {

		const { textoAlert, showAlert, pass, new_pass, confirm  } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="info_perfil_comp">
						<h1 className="titleRegister">Cambiar Contraseña</h1>

						<form className="w3-container">

                            <div>
                                <label>Contraseña actual*</label>
							    <input className="w3-input w3-border w3-round-large" type="password" value={pass}
								onChange={(e) => this.setState({ pass: e.target.value })} />
                            </div>

                            <div>
                                <label>Nueva Contraseña*</label>
							    <input className="w3-input w3-border w3-round-large" type="password" value={new_pass}
								onChange={(e) => this.setState({ new_pass: e.target.value })} />
                            </div>

                            <div>
                                <label>Repetir Contraseña*</label>
							    <input className="w3-input w3-border w3-round-large" type="password" value={confirm}
								onChange={(e) => this.setState({ confirm: e.target.value })} />
                            </div>

                           

							<p><button className="w3-button btn"
								onClick={(e) => {
									e.preventDefault();
									this.enviar();
								}}>Guardar</button></p>

						</form>
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default Registro;