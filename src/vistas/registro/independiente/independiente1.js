import React from 'react';
import Alerta from "../../../componentes/alertaVista";
import Header from "../../../componentes/header";
import Seleccionador from "../../../componentes/seleccionador";
import FileUpload from "../../../componentes/fileUpload";
import Footer from "../../../componentes/footer";
import httpClient from "../../../constantes/axios";
import axios from "axios";
class Independiente1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAlert: false, textoAlert: "",
			categories: [], categoriesSelected: [], profile_description: "", category_proposal: "",
			educational_level: 1, title: "", isModalVisibleCert: false, certifications: [], certification_type: [], type: 0, certification: "", cert_type: "", jobs: [], emergency: false,
			isModalVisible: false, photo: "", name: "", clear: true, clearT: true
		}
	}
	componentDidMount() { this.getServicesConcatCategories(); }
	getServicesConcatCategories = () => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/services/getServicesConcatCategories',
			data: { selected: false }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) { me.getCertificationsType(responseJson["data"].categories); }
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	getCertificationsType = (categories) => {
		let me = this;
		return axios({
			method: 'post', url: httpClient.urlBase + '/services/getCertificationsType',
			data: { selected: false }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				if (responseJson["data"]["success"]) {
					me.setState({
						categories,
						certification_type: responseJson["data"].certification_type
					});
				}
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
			})
			.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión." }); });
	}
	addCategory = (elemento) => {
		this.setState(prevState => ({ categoriesSelected: [...prevState["categoriesSelected"].concat(elemento)] }));
	}
	removeCategory = (elemento) => {
		let categoriesSelected = this.state["categoriesSelected"];
		var i = categoriesSelected.indexOf(elemento);
		if (i !== -1) { categoriesSelected.splice(i, 1); }
		if (categoriesSelected.length > 0) this.setState({ categoriesSelected });
		else this.setState({ categoriesSelected: [] });
	}
	educational_level = [
		{ id: 1, denomination: 'Bachiller' }, { id: 2, denomination: 'Técnico' },
		{ id: 3, denomination: 'Tecnólogo' }, { id: 4, denomination: 'Profesional' },
		{ id: 5, denomination: 'Especialista' },
		{ id: 7, denomination: 'No aplica' }
	];
	almacenarCert = () => {

		if (this.state["type"] !== 0 && this.state["certification"] !== "") {
			let me = this
			var reader = new FileReader();
			reader.onload = function (e) {
				me.setState(prevState => (
					{
						certifications: prevState["certifications"].concat({ certificationBold: e.target.result, certification: me.state["certification"], type: me.state["type"], cert_type: me.state["cert_type"] }),
						isModalVisibleCert: false, certification: "", type: 0, cert_type: "",
						clear: true
					}));
			}
			reader.readAsDataURL(this.state["certification"]);

		}
	}
	deleteCert(certification) {
		let certifications = this.state["certifications"];
		var i = certifications.indexOf(certification);
		if (i !== -1) { certifications.splice(i, 1); }
		this.setState({ certifications: (certifications.length > 0) ? certifications : [] });
	}
	almacenarJob = () => {
		if (this.state["photo"] !== "" && this.state["name"] !== "") {
			let me = this
			var reader = new FileReader();
			reader.onload = function (e) {
				me.setState(prevState => (
					{
						jobs: prevState["jobs"].concat({ photoBold: e.target.result, name: me.state["name"], photo: me.state["photo"] }),
						isModalVisible: false, photo: "", name: "", clearT: true
					}));
			}
			reader.readAsDataURL(this.state["photo"]);
			this.setState({ photo: "" })
		}
	}
	deleteJob(job) {
		let jobs = this.state["jobs"];
		var i = jobs.indexOf(job);
		if (i !== -1) { jobs.splice(i, 1); }
		this.setState({ jobs: (jobs.length > 0) ? jobs : [] });
	}
	continuar = () => {
		let vacios = [];
		if (!this.state["categoriesSelected"].length) { vacios.push("  *Categoría"); }
		if (this.state["profile_description"] === "") { vacios.push("  *Descripción"); }
		if (vacios.length) {
			return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() });
		}
		else {
			let categories = [];
			for (let index = 0; index < this.state["categoriesSelected"].length; index++) {
				categories.push(this.state["categoriesSelected"][index]["value"]);
			}
			let informacion = {};
			informacion["categoriesSelected"] = categories;
			if (this.state["category_proposal"] !== "") {
				informacion["category_proposal"] = this.state["category_proposal"];
			}
			informacion["profile_description"] = this.state["profile_description"];
			informacion["educational_level"] = this.state["educational_level"];
			if (this.state["title"] !== "")
				informacion["title"] = this.state["title"];
			if (this.state["certifications"].length > 0)
				informacion["certifications"] = this.state["certifications"];
			if (this.state["jobs"].length > 0)
				informacion["jobs"] = this.state["jobs"];
			this.props["history"]["push"]({ pathname: "independiente2", informacion });
		}
	}
	render() {
		const { showAlert, textoAlert, categories, categoriesSelected, profile_description, educational_level, title, isModalVisibleCert, certifications, isModalVisible,
			jobs, photo, name, type, certification, certification_type, clear, clearT, category_proposal } = this.state;
		return (
			<React.Fragment>
				<Header />
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="container_web">
					<h1 className="titleRegister">Paso 2 de 5</h1>
					<h3 className="w3-center">Perfil profesional</h3>
					<div className="w3-margin-bottom">
						<label>Selecciona las actividades en las que eres un experto*</label>
						<Seleccionador
							items={categories}
							selectedItems={categoriesSelected}
							add={(elemento) => { this.addCategory(elemento) }}
							remove={(elemento) => { this.removeCategory(elemento) }}
							cp={(category_proposal) => { this.setState({ category_proposal }) }}
							category_proposal={category_proposal}
							deselectNoExiste={(categoriesSelected) => { this.setState({ categoriesSelected }) }}
						/>
					</div>
					<div className="w3-margin-bottom">
						<label> Describe tu perfil*</label>
						<textarea className="w3-input w3-border w3-round-large" value={profile_description}
							onChange={(e) => this.setState({ profile_description: e.target.value })} />
					</div>
					<div className="w3-margin-bottom">
						<label>Nivel educativo*</label>
						<select className="w3-select w3-border w3-round-large size200" name="educational_level"
							value={educational_level} onChange={(e) => this.setState({ educational_level: e.target.value })}>
							{this.educational_level.map((level, key) => (
								<option key={key} value={level.id} >{level.denomination}</option>
							))}
						</select>
					</div>
					<div className="w3-margin-bottom">
						<label>Titulo profesional </label>
						<input className="w3-input w3-border w3-round-large" type="text" value={title}
							onChange={(e) => this.setState({ title: e.target.value })} />
					</div>
					<div className="w3-margin-bottom w3-border" style={{ padding: 10 + "px" }}>
						<label>Adjunta tus certificaciones o cursos tomados</label>
						<button className="w3-button w3-circle w3-blue w3-margin-left"
							onClick={() => { this.setState({ isModalVisibleCert: true }); }}>
							+
							</button>
						<div className="w3-row-padding" style={{ marginTop: 15 }} >
							{certifications.length > 0 && certifications.map((cert, key) => {
								return <div className="w3-quarter" key={key}>
									<div className="w3-row">
										<div className="w3-center" style={{ cursor: "pointer" }} onClick={() => { this.deleteCert(cert); }}>
											<img src="../../../../assets/iconos/eliminar.png" className="imagen-icono" alt="Eliminar" style={{ position: "absolute", marginTop: -10, marginLeft: -15 }} />
										</div>

										<img src={cert["certificationBold"]} className="imagen-experto img_new" alt="Foto"></img>
										<p className="text_blue">{cert["cert_type"]}</p>

									</div>
								</div>
							})
							}
						</div>
						<div className="w3-modal w3-text-black" style={{ display: (isModalVisibleCert) ? "flex" : "none" }}>
							<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large modal_problem">
								<div className="w3-container w3-margin-top w3-margin-bottom">
									<span onClick={() => this.setState({ isModalVisibleCert: false })}
										className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
									<br />
									<div className="w3-center">
										<div className="w3-margin-bottom">
											<label>Certificado*</label>
											<FileUpload id="certification" clear={clear} onChange={(certification) => { this.setState({ certification, clear: false }); }} />
										</div>
										<div className="w3-margin-bottom">
											<label>Tipo de certificación*</label>
											<select className="w3-select w3-border w3-round-large size200" name="certification_type"
												value={type} onChange={(e) => {
													if (e.target.value !== 0) {
														this.setState({ type: e.target.value, cert_type: certification_type.find(cert => cert["id"].toString() === e.target.value)["denomination"] });
													}
												}}>
												<option value={0}>Seleccione...</option>
												{certification_type.map((type, key) => (
													<option key={key} value={type.id} >{type.denomination}</option>
												))}
											</select>
										</div>
										<button onClick={() => {
											this.almacenarCert();
										}}
											className={(certification === "" || type === "" || type === 0) ? "w3-button w3-disabled w3-block w3-round-large btn" : "w3-button w3-block btn w3-round-large"}>Agregar</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w3-margin-bottom w3-border" style={{ padding: 10 + "px" }}>
						<label>Adjunta las fotos de tus proyectos</label>
						<button className="w3-button w3-circle w3-blue w3-margin-left"
							onClick={() => { this.setState({ isModalVisible: true }); }}>
							+
							</button>
						<div className="w3-row-padding" style={{ marginTop: 15 }} >
							{jobs.length > 0 && jobs.map((job, key) => {
								return <div className="w3-quarter" key={key}>
									<div className="w3-row">
										<div className="w3-center" style={{ cursor: "pointer" }} onClick={() => { this.deleteJob(job); }}>
											<img src="../../../../assets/iconos/eliminar.png" className="imagen-icono" alt="Eliminar" style={{ position: "absolute", marginTop: -10, marginLeft: -15 }} />
										</div>
										<img src={job["photoBold"]} className="imagen-experto img_new" alt="Foto"></img>
										<p className="text_blue">{job["name"]}</p>

									</div>
								</div>
							})
							}
						</div>
						<div className="w3-modal w3-text-black" style={{ display: (isModalVisible) ? "flex" : "none" }}>
							<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large modal_problem">
								<div className="w3-container w3-margin-top w3-margin-bottom">
									<span onClick={() => this.setState({ isModalVisible: false })}
										className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
									<br />
									<div className="w3-center">
										<div className="w3-margin-bottom">
											<label>Imagen del trabajo*</label>
											<FileUpload id="job" clear={clearT} onChange={(photo) => { this.setState({ photo, clearT: false }); }} />
										</div>
										<div className="w3-margin-bottom">
											<label>Nombre del trabajo*</label>
											<input className="w3-input w3-border w3-round-large" type="text" value={name}
												onChange={(e) => this.setState({ name: e.target.value })} />
										</div>
										<button onClick={() => { this.almacenarJob(); }}
											className={(photo === "" || type === "") ? "w3-button w3-disabled w3-block w3-round-large btn" : "w3-button w3-block btn w3-round-large"}>Agregar</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<p style={{ textAlign: "left", marginLeft: 0, fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 10, fontFamily: 'Montserrat' }}>Nota: * (Campo obligatorio)</p>

					<div>
						<button className="w3-button btn w3-block"
							onClick={() => { this.continuar(); }}>Continuar</button>
					</div>
				</div>
				<Footer />
			</React.Fragment >
		);
	}
}
export default Independiente1;