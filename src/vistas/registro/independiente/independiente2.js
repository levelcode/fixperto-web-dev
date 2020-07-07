import React from 'react';
import Alerta from "../../../componentes/alertaVista";
import Header from "../../../componentes/header";
import Cobertura from "../../../componentes/cobertura";
import Footer from "../../../componentes/footer";
class Independiente2 extends React.Component {
	constructor(props) { super(props); this.state = { showAlert: false, textoAlert: "", regionsSelected: [] }; }
	addRegion = (elemento) => {
		this.setState(prevState => ({ regionsSelected: [...prevState["regionsSelected"].concat(elemento)] }));
	}
	removeRegion = (elemento) => {
		let regionsSelected = this.state["regionsSelected"];
		var i = regionsSelected.indexOf(elemento);
		if (i !== -1) { regionsSelected.splice(i, 1); }
		if (regionsSelected.length > 0) this.setState({ regionsSelected });
		else this.setState({ regionsSelected: [] });
	}
	continuar = () => {
		if (this.state["regionsSelected"].length) {
			let informacion = this.props["history"]["location"]["informacion"];
			let regions = [];
			for (let index = 0; index < this.state["regionsSelected"].length; index++) {
				regions.push(this.state["regionsSelected"][index]["id"]);
			}
			informacion["regions"] = regions;
			this.props["history"]["push"]({ pathname: "independiente3", informacion });
		}
	}
	render() {
		const { showAlert, textoAlert, regionsSelected } = this.state;
		return (
			<React.Fragment>
				<Header />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="container_web">
					<h1 className="titleRegister">Paso 3 de 5</h1>
					<h3 className="w3-center" style={{margin : 0}}>Cobertura</h3>
					<div className="w3-margin-bottom w3-center">
						<label>Elige las ciudades donde ofreces tus servicios*</label>
						<Cobertura selectedRegion={regionsSelected}
							add={(elemento) => { this.addRegion(elemento); }}
							remove={(elemento) => { this.removeRegion(elemento); }} />
					</div>
					<div>
						<button style={{width : 50 + "%" , marginLeft : 25 + "%"}} className={(regionsSelected.length) ? "w3-button btn " : "w3-button btn w3-disabled"}
							onClick={() => { this.continuar(); }}>Continuar</button>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default Independiente2;