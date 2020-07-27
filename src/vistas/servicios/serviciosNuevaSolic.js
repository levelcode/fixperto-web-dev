import React from 'react';
import Alerta from "../../componentes/alertaVista";
import httpClient from "../../constantes/axios";
import axios from "axios";
import MapBox from "../../componentes/mapBox";
import { fechaActual } from "../../constantes/funciones_auxiliares";
const queryString = require('query-string');
class ServiciosNuevaSol extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMapBox: false, textoAlert: "", showAlert: false, start_date: new Date(), hour: "", buttonDisabled: false,
			user: JSON.parse(localStorage.getItem("@USER")), description: "",
			region: { name: "", id: "" }, photos: [], photoss: [], emergency: false,
			icon_mame: "", serv_den: "", cat_den: ""
		};
	}
	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("@USER"));
		if (Object.keys(user).length === 0) {
			if (this.props["location"] && this.props["location"]["search"] !== "") {
				let parsed = queryString.parse(this.props["location"]["search"]);
				if (parsed["service"]) {
					localStorage.setItem("@CAT_ADD", JSON.stringify({}));
					parsed["service"] = JSON.parse(parsed["service"]);
					localStorage.setItem("@SEARCHCAT", JSON.stringify(parsed["service"]));
				}
				else if (parsed["cat_add"]) {
					localStorage.setItem("@SEARCHCAT", JSON.stringify({}));
					localStorage.setItem("@CAT_ADD", JSON.stringify(parsed["cat_add"]));
				}
			}
			this.props["history"]["push"]("/ingreso");
		}
		else {
			if (user["type"] !== "cliente") {
				localStorage.setItem("@SEARCHCAT", JSON.stringify({}));
				localStorage.setItem("@CAT_ADD", JSON.stringify({}));
				localStorage.setItem("@USER", JSON.stringify({}));
				this.props["history"]["push"]("/ingreso");
			}
			else {console.log(this.props)
				if (this.props["location"] && this.props["location"]["search"] !== "") {
					let parsed = queryString.parse(this.props["location"]["search"]);
					if (parsed["service"]) {
						localStorage.setItem("@CAT_ADD", JSON.stringify({}));
						parsed["service"] = JSON.parse(parsed["service"]);
						let denomination = parsed["service"]['label'].split("/");
						this.props.history.location.service = {
							icon: parsed["service"]['icon'],
							denomination: denomination[0],
							emergency: parsed["service"]['emergency']
						}
						this.props.history.location.category = {
							id: parsed["service"]['id'],
							denomination: denomination[1],
						}
						this.setState({
							icon_mame: parsed["service"]['icon'],
							serv_den: denomination[0],
							cat_den: denomination[1],
							emergency: parsed["service"]['emergency']
						});
					}
					else if (parsed["cat_add"]) {
						localStorage.setItem("@SEARCHCAT", JSON.stringify({}));
						localStorage.setItem("@CAT_ADD", JSON.stringify(parsed["cat_add"]));
						this.props.history.push({ pathname: '/fixperto/servicios', cat_add: parsed["cat_add"] });
					}
				}
				else {
					if (!this.props["history"]["location"]["category"]) { this.props.history.push({ pathname: '/fixperto/servicios' }); }
					else this.setState({
						icon_mame: this.props["history"]["location"]["category"]['icon'],
						emergency: this.props["history"]["location"]["service"]["emergency"],
						serv_den: this.props["history"]["location"]["service"]["denomination"],
						cat_den: this.props["history"]["location"]["category"]["denomination"]
					});
				}
			}
		}
	}
	guardar = () => {
		let vacios = [];
		if (this.state["region"]["id"] === "") { vacios.push("  *Región"); }
		if (this.state["description"] === "") { vacios.push("  *Descripción de la solicitud"); }
		if (this.props.history.location["service"]["emergency"]) {
			if (this.state["start_date"] === "") { vacios.push("  *Fecha"); }
			if (this.state["hour"] === "") { vacios.push("  *Hora"); }
		}
		if (!vacios.length) {
			const datos = new FormData();
			for (var x = 0; x < this.state["photos"].length; x++) { datos.append("photos", this.state["photos"][x]); }
			datos.append("customer", this.state["user"]["typeId"]);
			datos.append("category", this.props.history.location["category"]["id"]);
			datos.append("region", this.state["region"]["id"])
			datos.append("emergency", this.props.history.location["service"]["emergency"]);
			datos.append("description", this.state["description"]);
			datos.append("start_date", (this.props.history.location["service"]["emergency"]) ? this.state["start_date"] : "");
			datos.append("hour", (this.props.history.location["service"]["emergency"]) ? this.state["hour"] : "");
			let me = this;
			axios({
				method: 'post', url: httpClient.urlBase + '/cliente/sendRequest',
				data: datos, headers: { Accept: 'application/json' }
			}).then(function (response) {
				let responseJson = response["data"];
				if (responseJson["success"]) {
					me.props["history"]["push"]("solicitudes/solicitud-progreso");
				} else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, inténtelo nuevamente" }); }
			}).catch(function (response) {
				if (response.message === 'Timeout' || response.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			});
		}
		else { return this.setState({ showAlert: true, textoAlert: "Los siguientes campos son obligatorios: " + vacios.toString() }); }
	}
	addFoto = (foto) => {
		let photo = foto.target.files[0];
		this.setState(prevState => ({ photos: [...prevState["photos"].concat(photo)] }));
		var reader = new FileReader();
		let me = this;
		reader.onload = function (e) {
			let fot = e.target.result;
			me.setState(prevState => ({ photoss: [...prevState["photoss"].concat(fot)] }));
		}
		reader.readAsDataURL(photo);
	}
	deleteFoto = (photo) => {
		let photos = this.state["photos"];
		let photoss = this.state["photoss"];
		var i = photoss.indexOf(photo);
		if (i !== -1) { photos.splice(i, 1); photoss.splice(i, 1); }
		if (photoss.length > 0) this.setState({ photos, photoss });
		else this.setState({ photos: [], photoss: [] });
	}
	selectRegion = region => { this.setState({ region, showMapBox: false }) };
	render() {
		const { emergency, showMapBox, textoAlert, showAlert, description, user, photoss, start_date, hour, region, icon_mame, serv_den, cat_den } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				{showMapBox
					? <div className=""><MapBox selectedRegion={region} onSelect={(region) => { this.selectRegion(region) }} /></div>
					: <div className="padd-general">
						<div className="nueva_solicitud">
							<h1 className="titleRegister">Nueva solicitud</h1>
							<div className="w3-container">
								<div className="w3-row item">
									<div className="w3-cell">
										<img src={icon_mame} className="" alt="Imagen"></img>
									</div>
									<div className="w3-cell text">
										<p style={{ margin: "auto", position: "relative", left: -30 }}>
											<b>{serv_den}</b> /
                                        	{cat_den}
										</p>
									</div>
								</div>
								{(emergency) ? <div className="">
									<div className="">
										<label>Fecha de prestación del servicio</label>
										<input className="w3-input w3-border w3-round-large" type="date" value={start_date}
											min={fechaActual()} onChange={(e) => this.setState({ start_date: e.target.value })} />
									</div>
									<div className="">
										<label>Hora</label>
										<input className="w3-input w3-border w3-round-large" type="time" value={hour}
											onChange={(e) => this.setState({ hour: e.target.value })} />
									</div>
								</div>
									: ""
								}
								<div>
									<label> <span className="text_blue">{user['name']}</span>, a continuación has una descripción detallada del servicio a solicitar, por ejemplo metros  cuadrados, espacio del servicio (sala, cocina…), si es para tu casa, conjunto, empresa, se lo más específico posible será de gran ayuda para brindarte la asesoría y cotización más precisa.* </label>
									<textarea className="w3-input w3-border w3-round-large" value={description} style={{ marginTop: 10 }}
										onChange={(e) => this.setState({ description: e.target.value })} />
								</div>
								<div className="ubicacion w3-margin-top">
									<label className="text_blue">
										<img src="../../assets/iconos/ubicacion.png" className="" alt="1" style={{ width: 25, marginRight: 10 }}></img>
                                    Ubicación *
                                	</label>
									<label> Con esta información ubicaremos los expertos en tu zona</label>
									{
										(region["id"] !== "") && <div className="">
											<p style={{ marginLeft: 35 }}><b >{region["name"]}</b></p>
										</div>
									}
									<div>
										<button className="w3-button btn_ubicacion" style={{ marginTop: 5 }}
											onClick={() => { this.setState({ showMapBox: true }) }}>
											ELEGIR UBICACIÓN
									</button>
									</div>
								</div>
								<div className="ubicacion  w3-margin-top">
									<label>
										<img src="../../assets/iconos/fotos.png" className="" alt="1" style={{ width: 25, marginRight: 10 }}></img>
                                    Comparte tus fotos *
                                	</label>
									<label> Esta información es de utilidad para los expertos</label>
									<div>
										<input type="file" style={{ width: 0.1 + "px", height: 0.1 + "px", opacity: 0, overflow: "hidden", position: "absolute", zIndex: -1, marginTop: 5 }}
											id="img_galeria" onChange={(foto) => { this.addFoto(foto) }} accept="image/png, .jpeg, .jpg, image/gif" />
										<label className="w3-button btn_ubicacion" htmlFor="img_galeria">GALERÍA</label>
									</div>
									<div className="w3-row-padding" >
										{photoss.length > 0 && photoss.map((photo, key) => (
											<div className="w3-quarter" key={key}>
												<div className="w3-row ">
													<div style={{ cursor: "pointer" }} onClick={() => { this.deleteFoto(photo) }}>
														<img src="../../../assets/iconos/eliminar.png" className="img_elim" />
													</div>
													<img src={photo} className="imagen-experto img_new" alt="Foto"></img>
												</div>
											</div>
										))
										}
									</div>
								</div>
								<div className="">
									<button className="w3-button btn"
										onClick={() => { this.guardar(); }}>
										Enviar solicitud
							    </button>
								</div>
							</div>
						</div>
					</div>}
			</React.Fragment >
		);
	}
}
export default ServiciosNuevaSol;