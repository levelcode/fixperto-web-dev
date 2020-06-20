import React from 'react';
import Alerta from "../../componentes/alertaVista";
import { validateEmail, validateName, validatePhone, fechaAutorizada } from "../../constantes/funciones_auxiliares";
import axios from "axios";
import httpClient from "../../constantes/axios";


class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			textoAlert			: "", 
			showAlert			: false, 
			buttonDisabled		: false, 
			isModalVisible		: false, 
			id					: "", 
			typeId				: "", 
			name				: "", 
			email				: "", 
			birth_date			: "", 
			gender				: "", 
			phone				: "",
			user 				: []
		}
	}

	componentDidMount() {
	
		var user = JSON.parse(localStorage.getItem("@USER"))

        this.state['user'].push(user)

		this.getInformation()
	}

	getInformation = () => {
		var id = this.state['user'][0]['id']
		var me = this
        axios({
            method: 'post',
            url: httpClient.urlBase + '/cliente/getInformation',
			data : { id : id },
            headers: { Accept: 'application/json' },
        })
        .then(function (responseJson) {
            var datos = responseJson['data']['customer']
			me.setState({
				id			: datos["id"],
				name 		: datos["name"],
				email		: datos["email"],
				birth_date	: (datos["birth_date"]) ? me.fechaAutorizada(datos["birth_date"]) : "",
				gender		: datos["gender"],
				phone		: datos["phone"].toString(),
				typeId		: datos["typeId"],
			})

        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
        })
	}

	formatDate = date => {
		let today = new Date(date); return today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
	}

	convertDateTimeUpdate(date) {
		console.log(date);
		
		var from = date.split("/"); return new Date(from[2], from[1] - 1, from[0]); 
	}

	fechaAutorizada = (fecha) => {
		var fecha = fecha.split('/');
		return fecha[2] + "-" + fecha[1] + "-" + fecha[0];
	}

	convertDateTime = (date) => {
		var fecha = new Date(date); return fecha.toISOString().split('T')[0] + ' ' + fecha.toTimeString().split(' ')[0];
	}

	gender_type = [
		{ 
			id: 1, 
			denomination: 'Masculino' 
		}, 
		{ 
			id: 2, 
			denomination: 'Femenino' 
		}	
	];
	
	toggleModal = () => { this.setState({ isModalVisible: !this.state["isModalVisible"] }); }


	validateEmail = email => { 
		let reg = /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; return reg.test(email.trim()); 
	};

	validateName = name => { 
		let reg = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/; return reg.test(name); 
	
	}

	validatePhone = phone => { 
		let reg = /^[0-9]{7,10}$/; return reg.test(phone); 
	}

	guardar = () => {
		if (this.state["name"] === "" || this.state["email"] === "" || this.state["birth_date"] === ""
			|| this.state["gender"] === "" || this.state["phone"] === "") {
			return this.setState({ showAlert: true, textoAlert: "Existen campos vacios" });
		}
		else if (!this.validateEmail(this.state["email"])) {
			return this.setState({ showAlert: true, textoAlert: "Correo inválido, por favor verifíquelo" });
		}
		else if (!this.validatePhone(this.state["phone"])) {
			return this.setState({ showAlert: true, textoAlert: "Teléfono inválido, por favor verifíquelo" });
		}
		else if (!this.validateName(this.state["name"])) {
			return this.setState({ showAlert: true, textoAlert: "Nombre y apellido, por favor verifíquelo" });
		}
		else {
			
			this.setState({ buttonDisabled: true });
			var me = this
			axios({
				method: 'post',
				url: httpClient.urlBase + '/cliente/modInformation',
				data : { 
					id			: me.state["id"],
					typeId		: me.state["typeId"],
					name		: me.state["name"],
					email		: me.state["email"],
					birth_date	: me.convertDateTime(this.state["birth_date"]),
					gender		: me.state["gender"],
					phone		: me.state["phone"]
				},
				headers: { Accept: 'application/json' },
			})
			.then(function (responseJson) {
				var responseJson = responseJson['data']
				me.setState({ buttonDisabled: false });

				if (responseJson.success) {
					me.setState({ showAlert: true, textoAlert: "Se ha guardado la informaición" });
					
				}else { 
					if (responseJson.existe) { 
						this.toggleModal(); 
					} 
				}

			})
			.catch((error) => {
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			})
		}
	}

	render() {

		const { textoAlert, showAlert, name, email, birth_date, gender,  phone } = this.state;

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
                                        value={gender} onChange={(e) => this.setState({ gender: e.target.value })}>
                                        {this.gender_type.map((gender_type, key) => (
                                            <option key={key} value={gender_type.id} >{gender_type.denomination}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label>Teléfono*</label>
							    <input className="w3-input w3-border w3-round-large" type="number" value={phone}
								onChange={(e) => this.setState({ phone: e.target.value })} />
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