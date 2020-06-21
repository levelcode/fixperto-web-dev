import React from 'react';
import PerfilInformacion from "./perfilInformacion";
import PerfilAtencionCliente from "./perfilAtencionCliente";
import PerfilCambiarContr from "./perfilCambiarContr";
import PerfilConfig from "./perfilConfig";
import PerfilTerminos from "./perfilTerminos";
import PerfilQuienesSomos from "./perfilQuienesSomos"
import PerfilPolitica from "./perfilPolitica"
import CargarImagenes from "../../componentes/cargarImagenes";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";


class Perfil extends React.Component {
	constructor(props) {
		super(props); 
		this.state = { 
			textoAlert	: "", 
			showAlert	: false, 
			photo		: "", 
			cliente		: [],
			name        : ""
		};
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("@USER"))
		this.state['cliente'].push(user)

		var name = user['name']
		this.setState({name})

		this.setState({
			photo: "https://api.fixperto.com/uploads/registros/cliente/" + user["avatar"]
		});

	}

	render() {
		return (
			<React.Fragment>
				<div className="container">

					<div className="perfil">
						<div className="w3-cell-row w3-margin-bottom">
							<div className="w3-cell" style={{ width: 35 + "px" }}>
								<img src="../../assets/solicitudesUp.png" alt="Norway" />
							</div>
							<h2 className="w3-cell" >Perfil</h2>
						</div>
						<div className="w3-row">

							<div className="w3-col s12 m5">
								<div className="w3-card card_perfil">
									<div className="w3-row info_person">
										<div className="w3-col s12 l5">
											{ this.state['photo'] == "" ? 
												<div className="w3-center img_upl">
													<img src={this.state['photo']}  style={{width : 100, height:100}}/>
												</div>
												: <form>
													<div>
														<img src={this.state['photo']}  style={{width : 100, height:100}}/>

														<CargarImagenes mod={ (photo, name) => { 
															this.setState({ photo }); 
																var user = JSON.parse(localStorage.getItem("@USER"))
																user['avatar'] = name;
																localStorage.setItem("@USER", JSON.stringify(user))
															} 
														} />
													</div>
												</form>
											}
											
										</div>
										<div className="w3-col s10 l7">
											<h5>¡Hola!</h5>
											<h6>{this.state['name']}</h6>
										</div>
									</div>

									<div className="w3-row copy">
										<div className="w3-col s3">
											<img src="../../assets/iconos/alert.png" className=" img_alert" alt="alert"></img>
										</div>
										<div className="w3-col s9">
											<p>Completa todos los datos de tu perfil</p>
										</div>
									</div>

									<div>
										<div className="w3-row title_datos">
											<h2>
												<img src="../../assets/iconos/solicit.png" className=" img_tus_datos" alt="solicitud"></img>
											Tus datos</h2>
										</div>

										<div className="w3-row list_datos">

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/fixperto/perfil/perfil-informacion" className="">Información personal</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/fixperto/perfil/perfil-informacion" className="">
														<img src="../../assets/iconos/continuar.png" className=" img_continuar" alt="continuar"></img>
													</Link>
												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/fixperto/perfil/configuracion" className="">Configuración</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/fixperto/perfil/configuracion" className="">
														<img src="../../assets/iconos/continuar.png" className=" img_continuar" alt="continuar"></img>
													</Link>

												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/fixperto/perfil/cambio_password" className="">Cambiar contraseña</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/fixperto/perfil/cambio_password" className="">
														<img src="../../assets/iconos/continuar.png" className=" img_continuar" alt="continuar"></img>
													</Link>

												</div>
											</div>

										</div>
									</div>

									<div>
										<div className="w3-row title_datos">
											<h2>
												<img src="../../assets/iconos/solicit.png" className=" img_tus_datos" alt="solicitud"></img>
											Sobre Fixperto</h2>
										</div>

										<div className="w3-row list_datos">

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/fixperto/perfil/quienes_somos" className="">Quienes somos</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/fixperto/perfil/quienes_somos" className="">
														<img src="../../assets/iconos/continuar.png" className=" img_continuar" alt="continuar"></img>
													</Link>

												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/fixperto/perfil/atencion_cliente" className="">Atención al cliente</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/fixperto/perfil/atencion_cliente" className="">
														<img src="../../assets/iconos/continuar.png" className=" img_continuar" alt="continuar"></img>
													</Link>

												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/fixperto/perfil/terminos_condiciones" className="">Términos y condiciones</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/fixperto/perfil/terminos_condiciones" className="">
														<img src="../../assets/iconos/continuar.png" className=" img_continuar" alt="continuar"></img>
													</Link>

												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/fixperto/perfil/politica_privacidad" className="">Política y privacidad</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/fixperto/perfil/politica_privacidad" className="">
														<img src="../../assets/iconos/continuar.png" className=" img_continuar" alt="continuar"></img>
													</Link>

												</div>
											</div>
										</div>
									</div>

									<div className="w3-row btn_close">
										<button className="w3-button "
										onClick={() => { 
											localStorage.setItem("@USER", JSON.stringify({}))
											this.props.history.push({
												pathname: '/ingreso',
											})
										}}> CERRAR SESIÓN </button>
									</div>

								</div>

							</div>

							{this.props["history"]["location"]["pathname"] !== "/fixperto/perfil/" && <div className="w3-col s12 m7">
								<div className="w3-card card_info">
									<Switch>
										<Route path="/fixperto/perfil/perfil-informacion" component={PerfilInformacion} />
										<Route path="/fixperto/perfil/configuracion" component={PerfilConfig} />
										<Route path="/fixperto/perfil/cambio_password" component={PerfilCambiarContr} />
										<Route path="/fixperto/perfil/quienes_somos" component={PerfilQuienesSomos} />
										<Route path="/fixperto/perfil/atencion_cliente" component={PerfilAtencionCliente} />
										<Route path="/fixperto/perfil/terminos_condiciones" component={PerfilTerminos} />
										<Route path="/fixperto/perfil/politica_privacidad" component={PerfilPolitica} />
									</Switch>
								</div>
							</div>}
						</div>
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default Perfil;



