import React from 'react';
import Alerta from "../../componentes/alertaVista";
import { validateEmail, validateName, validatePhone, fechaAutorizada } from "../../constantes/funciones_auxiliares";

class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false, photo: "", name: "", email: "", birth_date: "", gender: 1, cedula : "", phone: "", password: "", repeat_password: "", term_condition: false
		}
	}

	componentDidMount() { }
	gender_type = [{ id: 1, denomination: 'Masculino' }, { id: 2, denomination: 'Femenino' }];
    educacion_type = [
        { id: 1, denomination: 'Bachiller' },
        { id: 3, denomination: 'Técnologo' }, 
        { id: 4, denomination: 'Profesional' }, 
        { id: 5, denomination: 'Especialista' }, 
        { id: 6, denomination: 'Empírico' }, 
        { id: 7, denomination: 'No aplica' }
    ];
	guardar = () => {
		let vacios = [];
		//if (this.state["photo"] === "") { vacios.push("  *Foto"); }
		if (this.state["name"] === "") { vacios.push("  *Nombre y Apellidos"); }
		if (this.state["email"] === "") { vacios.push("  *Correo"); }
		//if (this.state["birth_date"] === "") { vacios.push("  *Fecha de nacimiento"); }
		if (this.state["phone"] === "") { vacios.push("  *Teléfono"); }
        if (this.state["cedula"] === "") { vacios.push("  *Cedula"); }
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

		const { textoAlert, showAlert, photo, name, email, birth_date, gender, cedula, phone, password, repeat_password, term_condition } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="info_perfil_comp">
						<h1 className="titleRegister">Tus datos</h1>

						<form className="w3-container">

                            <div>
                                <label>Nombre y apellidos*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={name}
								onChange={(e) => this.setState({ name: e.target.value })} />
                            </div>

                            <div>
                                <label>Correo*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={email}
								onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
							

							<div>
                                <label>Fecha de nacimiento*</label>
							    <input className="w3-input w3-border w3-round-large size200" type="date" value={birth_date}
								max={fechaAutorizada()}
								onChange={(e) => this.setState({ birth_date: e.target.value })} />
                            </div>

                            <div>
                                <label>Género*</label>
                                <div>
                                    <select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="gender"
                                        value={gender} onChange={(e) => this.setState({ gender: e.target.gender })}>
                                        {this.gender_type.map((gender_type, key) => (
                                            <option key={key} value={gender_type.id} >{gender_type.denomination}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

							<div>
                                <label>Cedula*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={cedula}
								onChange={(e) => this.setState({ cedula: e.target.value })} />
                            </div>

                            <div>
                                <label>Teléfono*</label>
							    <input className="w3-input w3-border w3-round-large" type="number" value={phone}
								onChange={(e) => this.setState({ phone: e.target.value })} />
                            </div>

							
                            <div>
                                <label>Teléfono*</label>
							    <input className="w3-input w3-border w3-round-large" type="number" value={phone}
								onChange={(e) => this.setState({ phone: e.target.value })} />
                            </div>
                            
							<div>
                                <label>Nivel educacional*</label>
                                <div>
                                    <select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="gender"
                                        value={gender} onChange={(e) => this.setState({ gender: e.target.gender })}>
                                        {this.educacion_type.map((educacion_type, key) => (
                                            <option key={key} value={educacion_type.id} >{educacion_type.denomination}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label>Título profesión*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={email}
								onChange={(e) => this.setState({ email: e.target.value })} />
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