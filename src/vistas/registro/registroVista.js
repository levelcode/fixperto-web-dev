import React from 'react';
class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: "" };
	}
	componentDidMount() { }

	addCliente = () => {

	}
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="formRegister">
						<h1 className="titleRegister">Ingresa tus datos</h1>
						<p>Eres muy importante para nosotros, regálanos tus datosde contacto.</p>
						<form class="w3-container">

							<label>Nombre y apellido</label>
							<input class="w3-input" type="text"/>

							<label>Correo</label>
							<input class="w3-input" type="text"/>

							<label>Teléfono</label>
							<input class="w3-input" type="text"/>

							<label>Contraseña</label>
							<input class="w3-input" type="text"/>

							<label>Confirmar contraseña</label>
							<input class="w3-input" type="text"/>

							<input class="w3-check" type="checkbox"/>
							<label className="labelCheck">Haciendo click en esta casilla estoy aceptando <a href="#">Términos y conciones</a> </label>

							<p><button class="w3-button btn">Continuar</button></p>

						</form>
					</div>
					
				</div>
			</React.Fragment >
		);
	}
}

export default Registro;