import React from 'react';
import Alerta from "../../componentes/alertaVista";
import FileUpload from "../../componentes/fileUpload";
import { validateEmail, validateName, validatePhone, fechaAutorizada } from "../../constantes/funciones_auxiliares";

class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false, photo: "", name: "", email: "", birth_date: "", gender: 1, phone: "", password: "", repeat_password: "", term_condition: false
		}
	}

	componentDidMount() { }
	gender_type = [{ id: 1, denomination: 'Masculino' }, { id: 2, denomination: 'Femenino' }];
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
		} else {
			return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() });
		}
	}

	render() {

		const { textoAlert, showAlert, photo, name, email, birth_date, gender, phone, password, repeat_password, term_condition } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="container">					

					<div className="formRegister">
						<h1 className="titleRegister">Ingresa tus datos</h1>
						<p>Eres muy importante para nosotros, regálanos tus datos de contacto.</p>

						<div className="w3-center img_upl">
							<FileUpload onChange={(photo) => { this.setState({ photo }) }} />
						</div>

						<form className="w3-container">

							<label>Nombre y apellido*</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={name}
								onChange={(e) => this.setState({ name: e.target.value })} />

							<label>Correo*</label>
							<input className="w3-input w3-border w3-round-large" type="text" value={email}
								onChange={(e) => this.setState({ email: e.target.value })} />

							<label>Fecha de nacimiento*</label>
							<input className="w3-input w3-border w3-round-large size200" type="date" value={birth_date}
								max={fechaAutorizada()}
								onChange={(e) => this.setState({ birth_date: e.target.value })} />

							<label>Género*</label>
							<div>
								<select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="gender"
									value={gender} onChange={(e) => this.setState({ gender: e.target.gender })}>
									{this.gender_type.map((gender_type, key) => (
										<option key={key} value={gender_type.id} >{gender_type.denomination}</option>
									))}
								</select>
							</div>
							

							<label>Teléfono*</label>
							<input className="w3-input w3-border w3-round-large" type="number" value={phone}
								onChange={(e) => this.setState({ phone: e.target.value })} />

							<label>Contraseña*</label>
							<input className="w3-input w3-border w3-round-large" type="password" value={password}
								onChange={(e) => this.setState({ password: e.target.value })} />

							<label>Confirmar contraseña*</label>
							<input className="w3-input w3-border w3-round-large" type="password" value={repeat_password}
								onChange={(e) => this.setState({ repeat_password: e.target.value })} />

							<input className="w3-check" type="checkbox" value={term_condition}
								onChange={(e) => this.setState({ term_condition: e.target.value })} />
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