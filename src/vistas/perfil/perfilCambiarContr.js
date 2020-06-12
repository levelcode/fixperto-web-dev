import React from 'react';
import Alerta from "../../componentes/alertaVista";

class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false,  password_ahora: "", password_nueva : "", repeat_password : "" 
		}
	}

	guardar = () => {
		let vacios = [];
		if (this.state["password_ahora"] === "") { vacios.push("  *Contraseña actual"); }
		if (this.state["password_nueva"] === "") { vacios.push("  *Contraseña nueva"); }
		if (this.state["repeat_password"] === "") { vacios.push("  *Repetir contraseña"); }
		if (!vacios.length) {
			if (this.state["password"] !== this.state["repeat_password"]) {
				return this.setState({ showAlert: true, textoAlert: "Contraseña distinta a su confirmación" });
			}
		} else {
			return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() });
		}
	}

	render() {

		const { textoAlert, showAlert, password_ahora, password_nueva, repeat_password  } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="info_perfil_comp">
						<h1 className="titleRegister">Cambiar Contraseña</h1>

						<form className="w3-container">

                            <div>
                                <label>Contraseña actual*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={password_ahora}
								onChange={(e) => this.setState({ password_ahora: e.target.value })} />
                            </div>

                            <div>
                                <label>Nueva Contraseña*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={password_nueva}
								onChange={(e) => this.setState({ password_nueva: e.target.value })} />
                            </div>

                            <div>
                                <label>Repetir Contraseña*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={repeat_password}
								onChange={(e) => this.setState({ repeat_password: e.target.value })} />
                            </div>

                           

							<p><button className="w3-button btn"
								onClick={(e) => {
									e.preventDefault();
									this.guardar();
								}}>Guardar</button></p>

						</form>
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default Registro;