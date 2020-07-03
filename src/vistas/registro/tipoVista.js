import React from 'react';
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
class Tipo extends React.Component {
	constructor(props) { super(props); this.state = {}; }
	render() {
		return (
			<React.Fragment>
				<Header />
				<div className="w3-center container_web">
					<h1 className="titleRegister">¡Hola!</h1>
					<h4 className="text_blue">Elige una opción</h4>
					<div className="w3-container w3-section">
						<h5>¿Necesitas un servicio?</h5>
						<button
							onClick={() => { this.props["history"]["push"]("beneficios"); }}
							className="w3-button btn " style={{width : 40 + "%"}}>
							<b>Eres cliente</b>
						</button>
					</div>
					<div className="w3-container w3-section">
						<h5>¿Quieres ofrecer un servicio?</h5>
						<button style={{width : 40 + "%"}}
							onClick={() => { this.props["history"]["push"]("registro-experto"); }}
							className="w3-button btn ">
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