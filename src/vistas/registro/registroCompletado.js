import React from 'react';
import Alerta from "../../componentes/alertaVista";
import Header from "../../componentes/header";
import Footer from "../../componentes/footer";
import httpClient from "../../constantes/axios";
import axios from "axios";
class RegistroCompletado extends React.Component {
	constructor(props) { super(props); this.state = { showAlert: false, labeloAlert: "" }; }
	registrar = () => {
		var expert = JSON.parse(localStorage.getItem("@USER"))["typeId"];
		let method = (JSON.parse(localStorage.getItem("@USER"))["type"] === "empresa") ? "/fixpertoEmpresa/addEmpresaContinue" : "/fixpertoProfesional/addProfesionalContinue";
		const createFormData = () => {
			let informacion = this.props["history"]["location"]["informacion"];
			const data = new FormData();
			data.append("expert", expert);
			Object.keys(informacion).forEach(key => {
				switch (key) {
					case "arl":
						data.append("arl", informacion["arl"]);
						break;
					case "salud_pension":
						data.append("salud_pension", informacion["salud_pension"]);
						break;
					case "certifications":
						for (let index = 0; index < informacion["certifications"].length; index++) {
							data.append("certifications", informacion["certifications"][index]["certification"]);
							data.append("certification_type", informacion["certifications"][index]["type"]);
						}
						break;
					case "jobs":
						for (let index = 0; index < informacion["jobs"].length; index++) {
							data.append("jobs", informacion["jobs"][index]["photo"]);
							data.append("jobs_description", informacion["jobs"][index]["name"]);
						}
						break;
					case "regions":
						data.append("regions", JSON.stringify(informacion["regions"]));
						break;
					case "categoriesSelected":
						data.append("categoriesSelected", JSON.stringify(informacion["categoriesSelected"]));
						break;
					default: data.append(key, informacion[key]); break;
				}
			});
			return data;
		}; let me = this;
		axios({
			method: 'post', url: httpClient.urlBase + method,
			data: createFormData(), headers: { Accept: 'application/json' }
		})
			.then(function (response) {
				let responseJson = response["data"];
				if (responseJson["success"]) { me.props["history"]["push"]("fixpertos"); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, por favor pruebe nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	render() {
		const { showAlert, labeloAlert } = this.state;
		return (
			<React.Fragment>
				<Header />
				<Alerta showAlert={showAlert} labeloAlert={labeloAlert} close={() => this.setState({ showAlert: false })} />
				<div className="container_web w3-center">
					<h1 className="titleRegister">Paso 5 de 5</h1>
					<div className="w3-margin-bottom">
						<img src="../../../assets/iconos/regalo.png" style={{ height: 100, width: 119 }} alt="Plan" />
						<div>
							<label>Recibe tu</label>
							<label >Plan Regalo</label>
							<label> de Bienvenida</label>
						</div>
					</div>
					<div className="w3-margin-bottom">
						<h5>Tu plan de bienvenida cuenta con:</h5>
						<div className="">
							<div className="w3-row w3-margin-bottom">
								<div className="w3-cell">
									<img src="../../../assets/iconos/fixcoin.png" className="imgn-icono" style={{ height: 25, width: 25 }} alt="Icono" />
								</div>
								<div className="w3-cell w3-container">
									<label>20 Fixcoins</label>
								</div>
							</div>
							<div className="w3-row">
								<div className="w3-cell">
									<img src="../../../assets/iconos/calendar.png" className="imgn-icono" style={{ height: 25, width: 25 }} alt="Icono" />
								</div>
								<div className="w3-cell w3-container">
									<label>60 días gratis</label>
								</div>
							</div>
						</div>
					</div>
					<div className="w3-margin-bottom">
						<h4 >Beneficios</h4>
						<div className="w3-row w3-margin-bottom">
							<div className="w3-cell">
								<img src="../../../assets/iconos/fixcoin.png" style={{ height: 25, width: 25 }} alt="Icono" />
							</div>
							<div className="w3-cell w3-container">
								<label>Recibe 20 fixcoins, estos te permitirán realizar ofertas.</label>
							</div>
						</div>
						<div className="w3-row w3-margin-bottom">
							<div className="w3-cell">
								<img src="../../../assets/iconos/activo.png" style={{ height: 25, width: 25 }} alt="Icono" />
							</div>
							<div className="w3-cell w3-container">
								<label>Activo en la plataforma.</label>
							</div>
						</div>
						<div className="w3-row w3-margin-bottom">
							<div className="w3-cell">
								<img src="../../../assets/iconos/capacitaciones.png" style={{ height: 25, width: 25 }} alt="Icono" />
							</div>
							<div className="w3-cell w3-container">
								<label>Capacitaciones.</label>
							</div>
						</div>
					</div>
					<div>
						<button className="w3-button btn w3-block" onClick={() => { this.registrar(); }}>Registrar</button>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default RegistroCompletado;