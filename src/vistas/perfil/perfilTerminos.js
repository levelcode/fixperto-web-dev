import React from 'react';
import Alerta from "../../componentes/alertaVista";

class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false,  notificaciones: "", notificaciones_chat: ""
		}
	}

	render() {

		const { textoAlert, showAlert, notificaciones, notificaciones_chat } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="info_perfil_config">
						<h1 className="titleRegister">Notificaciones</h1>

                        <p>Al desactivar las notificaciones no recibirás de primera mano las ofertas de servicios</p>

                        <div className="check_config">
                            <input class="w3-check" type="checkbox" value={notificaciones} />
                            <label>Notificaciones</label>
                        </div>

                        <hr></hr>

                        <div className="check_config">
                            <input class="w3-check" type="checkbox" value={notificaciones_chat} />
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

export default Registro;