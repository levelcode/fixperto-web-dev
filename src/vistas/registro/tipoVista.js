import React from 'react';
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
class Tipo extends React.Component {
	constructor(props) { super(props); this.state = {}; }
	render() {
		return (
			<React.Fragment>
				<Header />
				<div className="w3-center">
					<h1>¡Hola!</h1>
					<h3>Elige una opción</h3>
					<div className="w3-container w3-section">
						<h5>¿Necesitas un servicio?</h5>
						<button
							onClick={() => { this.props["history"]["push"]("beneficios"); }}
							className="w3-button w3-block btn w3-round-large">
							<b>Eres cliente</b>
						</button>
					</div>
					<div className="w3-container w3-section">
						<h5>¿Quieres ofrecer un servicio?</h5>
						<button
							onClick={() => { this.props["history"]["push"]("registro-experto"); }}
							className="w3-button w3-block btn w3-round-large">
							<b>Eres independiente</b>
						</button>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default Tipo;