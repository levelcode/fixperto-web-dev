import React from 'react';
import Alerta from "../../componentes/alertaVista";
import { validateEmail, validateName, validatePhone } from "../../constantes/funciones_auxiliares";

class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false, photo: "", name: "", email: "", birth_date: "",  gender: 1, phone: "", password: "", repeat_password: "", term_condition: false
		}
	}

	componentDidMount() { }

	continuar = () => {
		let vacios = [];
		//if (this.state["photo"] === "") { vacios.push("  *Foto"); }
		if (this.state["name"] === "") { vacios.push("  *Nombre y Apellidos"); }
		if (this.state["email"] === "") { vacios.push("  *Correo"); }
		//if (this.state["birth_date"] === "") { vacios.push("  *Fecha de nacimiento"); }
		if (this.state["phone"] === "") { vacios.push("  *Teléfono"); }
		if (this.state["password"] === "") { vacios.push("  *Contraseña"); }
		if (this.state["term_condition"] === false) { vacios.push("  *Términos y condiciones"); }
		if (!vacios.length) {
			if (this.state["password"] !== this.state["repeat_password"]) {
				return this.setState({ showAlert: true, textoAlert: "Contraseña distinta a su confirmación" });
			}
			else if (!validateEmail(this.state["email"])) {
				return this.setState({ showAlert: true, textoAlert: "Correo inválido, por favor verifíquelo" });
			}
			else if (!validatePhone(this.state["phone"])) {
				return this.setState({ showAlert: true, textoAlert: "Teléfono inválido, por favor verifíquelo" });
			}
			else if (!validateName(this.state["name"])) {
				return this.setState({ showAlert: true, textoAlert: "Nombre y apellido, por favor verifíquelo" });
			}
		}else{
			return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() });
		}
	}

	render() {
		const { textoAlert, showAlert, photo, name, email, birth_date,  gender, phone, password, repeat_password, term_condition } = this.state;
		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="container">
					<div className="formRegister">
						<h1 className="titleRegister">Ingresa tus datos</h1>
						<p>Eres muy importante para nosotros, regálanos tus datos de contacto.</p>
						<form className="w3-container">

							<div className="imgAvatar"></div>
							<div className="iconsAvatar">
								<div>Ca</div>
								<div>Ad</div>
							</div>

							<label>Nombre y apellido</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={name}
							onChange={(e) => this.setState({ name: e.target.value })}/>

							<label>Correo</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={email}
							onChange={(e) => this.setState({ email: e.target.value })}/>

							<label>Fecha de nacimiento</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={birth_date}
							onChange={(e) => this.setState({ birth_date: e.target.value })}/>

							<label>Género</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={gender}
							onChange={(e) => this.setState({ gender: e.target.value })}/>

							<label>Teléfono</label>
							<input className="w3-input w3-border w3-round-large" type="number" value={phone}
							onChange={(e) => this.setState({ phone: e.target.value })}/>

							<label>Contraseña</label>
							<input className="w3-input w3-border w3-round-large" type="password" value={password}
							onChange={(e) => this.setState({ password: e.target.value })}/>

							<label>Confirmar contraseña</label>
							<input className="w3-input w3-border w3-round-large" type="password" value={repeat_password}
							onChange={(e) => this.setState({ repeat_password: e.target.value })} />

							<input class="w3-check" type="checkbox" value={term_condition}
							onChange={(e) => this.setState({ term_condition: e.target.value })}/>
							<label className="labelCheck">Haciendo click en esta casilla estoy aceptando <a href="#">Términos y conciones</a> </label>

							<p><button className="w3-button btn"
								onClick={(e) => {
									e.preventDefault();
									this.continuar();
								}}>Continuar</button></p>

						</form>
					</div>
					
				</div>
			</React.Fragment >
		);
	}
}

export default Registro;