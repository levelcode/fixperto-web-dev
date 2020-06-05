import React from 'react';
class Beneficios extends React.Component {
	componentDidMount() { }
	render() {
		return (
			<React.Fragment>

				<div className="container">
					<div class="w3-bar w3-border w3-card-4 ey seccion_nav">
						<div  className="w3-row container_web">
							<div className="w3-col s12 m6">
								<div className="img_logo">
									<img src="./assets/fixperto1.png" className="w3-round" alt="Norway" />
								</div>
							</div>

							<div className="w3-col s12 m6">
								<div className="text_nav">
									<p>Iniciar sesion</p>
									<button className="w3-button "
									onClick={(e) => {
										e.preventDefault();
										this.continuar();
									}}>Registrate</button>
								</div>
							</div>
						</div>
					</div>

					<div className="beneficios">
                        <h1 className="titleRegister">Beneficios</h1>
						<div className="w3-row">

							<div className="w3-col  s12 m4">
								<div className="w3-row">
									<div className="w3-col s12">
										<img src="./assets/beneficio1.png" className="w3-round" alt="Norway" />
									</div>

									<div className="col s12 text_ben">
										<p>Cotizaciones gratis e ilimitadas.</p>
										<p>Hasta 5 fixpertos disponibles en tu zona para atender tu servicio.</p>
									</div>
								</div>
							</div>

							<div className="w3-col  s12 m4">
								<div className="w3-row">
									<div className="w3-col s12">
										<img src="./assets/beneficio2.png" className="w3-round" alt="Norway" />
									</div>

									<div className="col s12 text_ben">
										<p>Sistema de valoración (Reviews) para la mejor elección.</p>
										<p>Fixperto te acompañará en el proceso realizado por la plataforma</p>
									</div>
								</div>
							</div>

							<div className="w3-col  s12 m4">
								<div className="w3-row">
									<div className="col s12">
										<img src="./assets/beneficio3.png" className="w3-round" alt="Norway" />
									</div>

									<div className="w3-col s12 text_ben">
										<p>Cuenta personalizada, control e historial de tus servicios.</p>
										<p>Validamos los datos personales y judiciales del experto.</p>
									</div>
								</div>
							</div>

						</div>

						<div className="w3-row">
							<p className="p_btn"><button className="w3-button btn"
								onClick={(e) => {
									e.preventDefault();
									this.continuar();
								}}>Continuar</button></p>
						</div>

					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default Beneficios;