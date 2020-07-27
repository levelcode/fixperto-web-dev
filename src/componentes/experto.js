import React, { useState } from "react";
import httpClient from "../constantes/axios";
import axios from "axios";
import Alerta from "./alertaVista";
const Experto = ({ experto, history }) => {
	const [showExpert, setShowExpert] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert, setTextoAlert] = useState("");
	const [expert, setExpert] = useState({});
	const [jobs, setJobs] = useState([]);
	const [comments, setComments] = useState([]);
	const typo = (experto["type"] === 0) ? "profesional/" : (experto["type"] === 1) ? "empresa/" : experto["type"];
	let response_time = "";
	if (experto["emergency"] === 1) {
		let hora = experto["response_time"].split(":"); response_time = hora[0] + "h " + hora[1] + " min";
	}
	const getDatos = () => {
		return axios({
			method: 'post',
			url: httpClient.urlBase + '/fixperto/getExpertData',
			data: { expert: experto["id"] },
			headers: { Accept: 'application/json' }
		}).then(function (responseJson) {
			if (responseJson["data"]["success"]) {
				responseJson = responseJson["data"];
				var jobs = [];
				var type = (responseJson.expert["type"] === 0) ? "profesional/" : "empresa/";
				for (let index = 0; index < responseJson["jobs"].length; index++) {
					jobs.push({
						uri: httpClient.urlBase + "/uploads/registros/" + type + "jobs/" + responseJson["jobs"][index]["job"]
					})
				} setJobs(jobs); setComments(responseJson.comments); setExpert(responseJson.expert); setShowExpert(true);
			}
			else { setTextoAlert("Ha ocurrido un error intente nuevamente"); setShowAlert(true); }
		}).catch(function (error) {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				setTextoAlert("Problemas de conexión."); setShowAlert(true);
			}
		});
	}
	return (
		<React.Fragment>
			<div className="w3-section w3-cell-row experto" style={{ cursor: "pointer" }} onClick={() => { getDatos() }}>
				<div className="w3-cell" style={{ width: 20 + "%" }}>
					<img className="imagen-experto"
						src={httpClient.urlBase + "/uploads/registros/" + typo + "/" + experto["avatar"]} alt="Imagen">
					</img>
				</div>
				<div className="w3-cell">
					<div className="w3-margin-bottom">
						<div className="w3-row">
							<div className="w3-col s12 m12">
								{experto.plan === 1 &&
									<img src="../../../assets/iconos/experto_premium.png" style={{ width: 90 + "px", marginLeft: 8 }} alt="Imagen" />}
							</div>
							<div className="w3-col s12 m12">
								<div className="w3-row certif">
									{experto.certification_sena === 1 && <div className="">
										<img src="../../../assets/iconos/certificado.png" className="imagen-icono" alt="Imagen" style={{ position: "relative", left: 22 }} />
									</div>}
									<div className="">
										<div className="w3-cell w3-container" style={{ position: "relative", left: 10 }}>
											<img src="../../../assets/iconos/star.png" className="imagen-icono" style={{ width: 18, height: 18 }} alt="Imagen" />
										</div>
										<p className="w3-cell " style={{ position: "relative", width: 10, fontSize: 13 }}>{(experto.evaluation) ? experto.evaluation : 'Sin calificación'} </p>
									</div>
								</div>
							</div>
						</div>
						<div className="w3-cell w3-container w3-row">
							<b style={{ marginTop: 10 }}>{experto.name}</b>
						</div>
					</div>
					<div className="w3-cell-row w3-margin-bottom">
						{(experto.type === 0 && experto.salud_pension) &&
							<div className="w3-cell">
								<div className="w3-cell w3-container">
									<img src="../../../assets/iconos/check.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20 }} />
								</div>
								<p className="w3-cell">Parafiscales</p>
							</div>
						}
						{(experto.type === 0 && experto.arl) &&
							<div className="w3-cell">
								<div className="w3-cell w3-container">
									<img src="../../../assets/iconos/check.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20 }} />
								</div>
								<p className="w3-cell">ARL</p>
							</div>
						}
					</div>
					{experto.insured === 1 &&
						<div className="w3-margin-bottom">
							<div className="w3-cell w3-container">
								<img src="../../../assets/iconos/asegurado.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20 }} />
							</div>
							<p className="w3-cell">Asegurado</p>
						</div>
					}
					{(experto["emergency"] === 1) && <div className="w3-margin-bottom" >
						<div className="w3-cell w3-container">
							<img src="../../../assets/iconos/emergencia.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20 }} />
						</div>
						<p className="w3-cell">{response_time}</p>
					</div>}
				</div>
			</div>
			<div className="w3-modal w3-text-black" style={{ display: (showExpert) ? "flex" : "none" }}>
				<div className="w3-modal-content w3-animate-top w3-card-2 w3-round-large  modal_problem">
					<div className="w3-container w3-margin-top w3-margin-bottom">
						<span onClick={() => setShowExpert(false)}
							className="w3-button w3-display-topright w3-round-small w3-hover-red">&times;</span>
						<div className="w3-section">
							<div className="w3-row w3-margin-bottom">
								<div className="w3-cell" style={{ width: 20 + "%" }}>
									<img className="imagen-experto"
										src={httpClient.urlBase + "/uploads/registros/" + typo + "/" + experto["avatar"]} alt="Imagen">
									</img>
								</div>
								<div className="w3-cell w3-container">
									<div className="w3-row">
										{experto.plan === 1 && <div className="w3-cell">
											<img src="../../../assets/iconos/experto_premium.png" style={{ width: 90 + "px", }} alt="Imagen" />
										</div>
										}
										<div className="w3-cell w3-container"></div>
										<div className="w3-cell">
											<div className="w3-cell">
												<img src="../../../assets/iconos/star.png" className="imagen-icono" style={{ width: 18, height: 18, marginRight: 5 + "px" }} alt="Imagen" />
											</div>
											<div className="w3-cell" style={{ marginLeft: 10 + "px" }}>
												<p style={{ fontSize: 13 }}>{(experto.evaluation) ? experto.evaluation : 'Sin calificación'} </p>
											</div>
										</div>
									</div>
									<div className=""><b style={{ marginTop: 10 }}>{experto.name}</b>									</div>
								</div>
							</div>
							<div className="">
								<div className="w3-margin-bottom">
									<div className=""><b style={{}}>Perfil profesional</b></div>
									<div className="">{expert.profile_description}</div>
								</div>
								{(experto.type === 0 && (experto.salud_pension || experto.arl)) &&
									<div className="w3-margin-bottom">
										<b style={{}}>Seguridad social</b>
										<div className="w3-row">
											{(experto.type === 0 && experto.salud_pension) &&
												<div className="w3-cell">
													<div className="w3-cell">
														<img src="../../../assets/iconos/check.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20, marginRight: 5 + "px" }} />
													</div>
													<p className="w3-cell">Parafiscales</p>
												</div>
											}
											{(experto.type === 0 && experto.arl) &&
												<div className="w3-cell">
													<div className="w3-cell">
														<img src="../../../assets/iconos/check.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20, marginLeft: 10 + "px", marginRight: 5 + "px" }} />
													</div>
													<p className="w3-cell">ARL</p>
												</div>
											}
										</div>
									</div>
								}
								{experto.insured === 1 &&
									<div className="w3-margin-bottom">
										<div className="w3-cell">
											<img src="../../../assets/iconos/asegurado.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20, marginRight: 5 + "px" }} />
										</div>
										<p className="w3-cell">Asegurado</p>
									</div>
								}
								{expert.certification_sena === 1 &&
									<div className="">
										<b style={{}}>Certificaciones</b>
										<div className="w3-cell">
											<img src="../../../assets/iconos/certificado.png" className="imagen-icono" alt="Imagen" style={{ width: 20, height: 20, marginRight: 5 + "px" }} />
										</div>
										<div className="w3-cell"><p className="">Sena</p></div>
									</div>
								}
								{jobs.length > 0 &&
									<div className="w3-row-padding" style={{}}>
										<div className=""><b style={{}}>Proyectos</b></div>
										{jobs.map((job, key) => (
											<div className="w3-quarter" key={key}>
												<div className="w3-row ">
													<img src={job.uri} className="imagen-experto img_new" alt="Foto"></img>
												</div>
											</div>
										))}
									</div>
								}
								{comments.length > 0 && <div className=""><b style={{}}>Comentarios de clientes</b></div>}
								{comments.length > 0 && <ul className="w3-ul w3-border">
									{comments.map((item, index) => {
										return <li key={index}  >
											<div style={{ marginHorizontal: 10, flexDirection: "row", alignItems: "center", marginTop: 5 }}>
												<div className="w3-row">
													<div className="w3-cell">
														<img src="../../../assets/iconos/star.png" className="imagen-icono" style={{ width: 18, height: 18, marginRight: 5 + "px" }} alt="Imagen" />
													</div>
													<p className="w3-cell">{item.evaluation}</p>
												</div>
											</div>
											<div>
												<label style={{ textAlign: "justify", paddingHorizontal: 10, marginTop: 5 }}>{item.commentary}</label>
											</div>
											<div>
												<label style={{ textAlign: "justify", paddingHorizontal: 10, marginBottom: 10, color: "silver", marginTop: 3 }}>{item.name}</label>
											</div>
										</li>
									})}
								</ul>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default Experto;