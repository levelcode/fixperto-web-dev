import React from 'react';
import httpClient from "../../constantes/axios";
import Alerta from "../../componentes/alertaVista";
import HeaderExperto from "../../componentes/headerExperto";
import FooterApp from "../../componentes/footerApp";
import axios from "axios";
class Fixperto extends React.Component {
	constructor(props) { super(props); this.state = { services: [], showAlert: false, textoAlert: "" }; }
	componentDidMount() { this.getServices(); }
	getServices = () => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/fixperto/getOffertsCompleted',
			data: { id: JSON.parse(localStorage.getItem("@USER"))["typeId"] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { me.setState({ services: responseJson["data"].services }); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	openStatus = (myRef, ref) => {
		if (myRef.style.display === "none") {
			myRef.style.display = "block";
			ref.removeChild(ref.childNodes[0]);
			var x = document.createElement("h1");
			var textnode = document.createTextNode("-");
			x.appendChild(textnode);
			ref.appendChild(x);
		} else {
			myRef.style.display = "none";
			var y = document.createElement("h1");
			ref.removeChild(ref.childNodes[0]);
			var text = document.createTextNode("+");
			y.appendChild(text);
			ref.appendChild(y);
		}
	}
	render() {
		const { showAlert, textoAlert, services } = this.state;
		return (
			<React.Fragment>
				<HeaderExperto history={this.props["history"]} />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="w3-section w3-container w3-center">
					<div className="w3-cell-row w3-margin-bottom flex-aling">
						<div className="w3-cell" style={{ width: 35 + "px" }}>
							<img src="../../assets/solicitudesUp.png" alt="Norway" />
						</div>
						<h2 className="w3-cell azul-oscuro"><b>Historial de servicios</b></h2>
					</div>
					<div className="w3-row">
						<div className="w3-cell w3-center w3-container">
							<div className="w3-cell w3-section" style={{ width: 20 + "%" }}>
								<img className="imagen-experto"
									src={"https://api.fixperto.com/uploads/registros/" + JSON.parse(localStorage.getItem("@USER"))["type"] + "/" + JSON.parse(localStorage.getItem("@USER"))["avatar"]} alt="Imagen">
								</img>
							</div>
							<h4 className="azul-oscuro"><b>¡Hola!</b></h4>
							<h3 className="w3-margin-bottom azul-oscuro"><b>{JSON.parse(localStorage.getItem("@USER"))["name"]}</b></h3>
						</div>
						<div className="w3-cell w3-container">
							{services.length > 0 && services.map((item, key) => {
								let myRef = React.createRef();
								let ref = React.createRef();
								return <div key={key} className="w3-card w3-margin-bottom w3-row w3-white">
									<div className="w3-section">
										<div ref={refs => ref = refs} className="w3-cell w3-section w3-container" style={{ cursor: "pointer" }} onClick={() => { this.openStatus(myRef, ref) }}><h1 >+</h1></div>
										<div className="w3-cell w3-card">
											<div className="w3-container w3-section">
												{(item.icon) ?
													<img src={item.icon} className="img_serv" alt="Imagen" />
													: <img src="../../assets/iconos/alert_icon.png" className="imagen-experto" alt="Imagen" />
												}
											</div>
										</div>
										<div className="w3-cell w3-container">
											<p> <span className="text_blue_dark w3-margin-bottom">{item.denomination}</span> </p>
											{
												item.emergency === 1 && <div >
													<p className="text_blue_dark w3-margin-bottom">
														<img src="../../assets/iconos/emergencia.png" style={{ width: 18, height: 18, marginTop: -8, marginRight: 10 }} alt="Imagen" />
											Servicio de emergencia
											</p>
												</div>
											}
											<div className="w3-margin-bottom">
												<div className="w3-cell">
													<img src="../../assets/iconos/ubicacion.png" className="imagen-icono" alt="Imagen" />
												</div>
												<p className="w3-cell"> {item["zone"]}</p>
											</div>
										</div>
									</div>
									<div ref={refs => myRef = refs} style={{ display: "none", backgroundColor: "#F0F0F0" }} className="w3-section" >
										<div className="">
											<div className="w3-cell w3-container">
												<img src="../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
											</div>
											<h5 className="w3-cell text_blue">Creación de solicitud</h5>
											<div className="w3-white">
												<div className="w3-cell w3-container">
													<img src="../..//assets/iconos/activo.png" className="imagen-icono" alt="Imagen" />
												</div>
												<p className="w3-cell">Fecha de inicio: {item["registry_date"]}</p>
											</div>
										</div>
										<div className="">
											<div className="w3-cell w3-container">
												<img src="../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
											</div>
											<h5 className="w3-cell text_blue">Solicitud agendada</h5>
											<div className="w3-white">
												<div className="w3-cell w3-container">
													<img src="../../assets/iconos/activo.png" className="imagen-icono" alt="Imagen" />
												</div>
												<p className="w3-cell">Fecha agendada: {(item["start_date"]) ? item["start_date"] : "Pendiente"}</p>
											</div>
										</div>
										<div className="">
											<div className="w3-cell w3-container">
												<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
											</div>
											<h5 className="w3-cell text_blue">Solicitud completada</h5>
											<div className="w3-white">
												<div className="w3-cell w3-container">
													<img src="../../../../assets/iconos/activo.png" className="imagen-icono" alt="Imagen" />
												</div>
												<p className="w3-cell">Fecha completada: {(item["end_date"]) ? item["end_date"] : "Pendiente"}</p>
											</div>
										</div>
									</div>
								</div>
							})}
						</div>
					</div>
				</div>
				<FooterApp />
			</React.Fragment >
		);
	}
}
export default Fixperto;