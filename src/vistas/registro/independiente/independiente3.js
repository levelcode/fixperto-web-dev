import React from 'react';
import Alerta from "../../../componentes/alertaVista";
import Header from "../../../componentes/header";
import Footer from "../../../componentes/footer";
import FileUpload from "../../../componentes/fileUpload";
class Independiente3 extends React.Component {
	constructor(props) { super(props); this.state = { showAlert: false, textoAlert: "", arl: "", date_arl: "", salud_pension: "", date_salud_pension: "" }; }
	convertDateTime = date => {
		var fecha = new Date(date);
		return fecha.toISOString().split('T')[0] + ' ' + fecha.toTimeString().split(' ')[0];
	}
	continuar = () => {
		let informacion = this.props["history"]["location"]["informacion"];
		if (this.state["date_arl"] !== "")
			informacion["date_arl"] = this.convertDateTime(this.state["date_arl"]);
		if (this.state["arl"] !== "")
			informacion["arl"] = this.state["arl"];
		if (this.state["date_salud_pension"] !== "")
			informacion["date_salud_pension"] = this.convertDateTime(this.state["date_salud_pension"]);
		if (this.state["salud_pension"] !== "")
			informacion["salud_pension"] = this.state["salud_pension"];
		this.props["history"]["push"]({ pathname: "completado", informacion });
	}
	render() {
		const { showAlert, textoAlert, date_arl, date_salud_pension } = this.state;
		return (
			<React.Fragment>
				<Header />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="container_web">
					<h1 className="titleRegister">Paso 4 de 5</h1>
					<h3 className="w3-center">Seguridad Social</h3>
					<label>Fecha arl*</label>
					<input className="w3-input w3-border w3-round-large size200 w3-margin-bottom" type="date" value={date_arl}
						max={new Date()}
						onChange={(e) => this.setState({ date_arl: e.target.value })} />
					<div className="w3-center img_upl">
						<FileUpload id="arl" texto="ARL" onChange={(arl) => { this.setState({ arl }); }} />
					</div>
					<label>Fecha salud pensión*</label>
					<input className="w3-input w3-border w3-round-large size200 w3-margin-bottom" type="date" value={date_salud_pension}
						max={new Date()}
						onChange={(e) => this.setState({ date_salud_pension: e.target.value })} />
					<div className="w3-center img_upl">
						<FileUpload id="salud_pension" texto="Salud Pensión" onChange={(salud_pension) => { this.setState({ salud_pension }); }} />
					</div>
					<div>
						<button className="w3-button btn w3-block" onClick={() => { this.continuar(); }}>Continuar</button>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default Independiente3;