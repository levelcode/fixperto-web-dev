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
		var type = (JSON.parse(localStorage.getItem("@USER"))["type"] === "empresa") ? "empresa" : "profesional";
		return (
			<React.Fragment>
				<HeaderExperto history={this.props["history"]} />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="container">

					<div className="perfil">
						<div className="w3-cell-row w3-margin-bottom">
							<div className="w3-cell" style={{ width: 35 + "px" }}>
								<img src="../../assets/solicitudesUp.png" alt="Norway" />
							</div>
							<h2 className="w3-cell text_blue" >Historial de servicios</h2>
						</div>
						<div className="w3-row">

							<div className="w3-col s12 m5">
								<div className="w3-card card_perfil">
									<div className="w3-cell w3-center w3-container">
										<div className="w3-cell w3-section img_fixperto">
											<img className="imagen-experto"
												src={"https://api.fixperto.com/uploads/registros/" + type + "/" + JSON.parse(localStorage.getItem("@USER"))["avatar"]} alt="Imagen">
											</img>
										</div>
										<h4 className="azul-oscuro"><b>¡Hola!</b></h4>
										<h3 className="w3-margin-bottom azul-oscuro" style={{ textTransform: "capitalize", fontSize: 30 }}><b>{JSON.parse(localStorage.getItem("@USER"))["name"]}</b></h3>

										<br></br>

										<hr></hr>

										<br></br>

										<div className="w3-row plan_fixperto">
											<div className="w3-col s4">
												<img src={(JSON.parse(localStorage.getItem("@USER"))["planUri"] === "regalo") ?
													"../../assets/iconos/regalo.png" : (JSON.parse(localStorage.getItem("@USER"))["planUri"] === "oro") ?
														"../../assets/iconos/oro.png" :
														"../../assets/iconos/bronce.png"
												} style={{ width: 60, height: 60, padding: 5, marginTop: 5 }} alt="Plan" />
											</div>
											<div className="w3-col s8 texto_fixperto">
												<p className="text_blue" style={{ textAlign: "left", fontSize: 18 }}>Plan actual:</p>
												<p style={{ color: "#273861", textAlign: "left", fontSize: 16 }}>Plan {(JSON.parse(localStorage.getItem("@USER"))["planUri"] === "regalo") ? "bienvenida" : JSON.parse(localStorage.getItem("@USER"))["planUri"]}</p>
											</div>
										</div>



									</div>
								</div>
							</div>

							<div className="w3-col s12 m7">
								<div className="w3-card card_info">
									<div className="w3-row">
										{services.length > 0 && services.map((item, key) => {
											let myRef = React.createRef();
											let ref = React.createRef();
											return <div key={key} className="w3-card card_fixperto">
												<div className="w3-row">
													<div ref={refs => ref = refs} className="w3-col s1" style={{ cursor: "pointer" }} onClick={() => { this.openStatus(myRef, ref) }}>
														<h1>+</h1>
													</div>
													<div className="w3-col s4">
														<div className="w3-row ">
															{(item.icon) ?
																<img src={item.icon} className="img_serv icon-card" alt="Imagen" />
																: <img src="../../assets/iconos/alert_icon.png" className="imagen-experto" alt="Imagen" />
															}
														</div>
													</div>
													<div className="w3-col s7">
														<p className="text_blue"> <span className="text_blue_dark w3-margin-bottom">{item.denomination}</span> </p>
														{
															item.emergency === 1 && <div >
																<p className="text_blue w3-margin-bottom">
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
													<div className="row">

														<div className="w3-cell w3-container">
															<img src="../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" style={{ marginTop: 10 }} />
														</div>
														<h5 className="w3-cell text_blue w3-padding">Creación de solicitud</h5>
														<div className="w3-white w3-padding">
															<div className="w3-cell w3-container">
																<img src="../..//assets/iconos/activo.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20, position: "relative", left: -15 }} />
															</div>
															<p className="w3-cell">Fecha de inicio: {item["registry_date"]}</p>
														</div>
													</div>
													<div className="">
														<div className="w3-cell w3-container">
															<img src="../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" style={{ marginTop: 10 }} />
														</div>
														<h5 className="w3-cell text_blue w3-padding">Solicitud agendada</h5>
														<div className="w3-white w3-padding">
															<div className="w3-cell w3-container">
																<img src="../../assets/iconos/activo.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20, position: "relative", left: -15 }} />
															</div>
															<p className="w3-cell">Fecha agendada: {(item["start_date"]) ? item["start_date"] : "Pendiente"}</p>
														</div>
													</div>
													<div className="">
														<div className="w3-cell w3-container">
															<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" style={{ marginTop: 10 }} />
														</div>
														<h5 className="w3-cell text_blue w3-padding">Solicitud completada</h5>
														<div className="w3-white w3-padding">
															<div className="w3-cell w3-container">
																<img src="../../../../assets/iconos/activo.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20, position: "relative", left: -15 }} />
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
						</div>
					</div>
				</div>
				<FooterApp />
			</React.Fragment >
		);
	}
}
export default Fixperto;