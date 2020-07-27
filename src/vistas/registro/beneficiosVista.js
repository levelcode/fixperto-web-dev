import React from 'react';
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
class Beneficios extends React.Component {
	registrarme = () => { this.props["history"]["push"]("registro"); }
	render() {
		return (
			<React.Fragment>
				<Header />
				<div className="container_web">
					<div className="beneficios">
						<h1 className="titleRegister">Beneficios</h1>
						<div className="w3-row">
							<div className="w3-col  s12 m4">
								<div className="w3-row">
									<div className="w3-col s12">
										<img src="../assets/beneficio1.png" className="w3-round" alt="Norway" />
									</div>

									<div className="col s12 text_ben">
										<p>Consultas gratis e ilimitadas.</p>
									</div>
								</div>
							</div>
							<div className="w3-col  s12 m4">
								<div className="w3-row">
									<div className="w3-col s12">
										<img src="../assets/beneficio2.png" className="w3-round" alt="Norway" />
									</div>
									<div className="col s12 text_ben">
										<p>Sistema de calificación del fixperto por recomendacioens y opiniones de clientes para una mejor elección </p>
									</div>
								</div>
							</div>
							<div className="w3-col  s12 m4">
								<div className="w3-row">
									<div className="col s12">
										<img src="../assets/beneficio3.png" className="w3-round" alt="Norway" />
									</div>
									<div className="w3-col s12 text_ben">
										<p>Cuenta personalizada, control e historial de tus servicios.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="w3-row">
							<p className="p_btn"><button className="w3-button btn"
								onClick={() => { this.registrarme(); }}>Continuar</button></p>
						</div>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default Beneficios;