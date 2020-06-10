import React from 'react';
import PerfilInformacion from "../perfil/perfilInformacion";
import Ingreso from "../ingreso/ingresoVista";
import CodigoSms from "../registro/codigoVista";
import FileUpload from "../../componentes/fileUpload";

import { Link } from "react-router-dom"; import { Route, Switch } from "react-router";
class Perfil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() { }

	olvidoPassword = () => {
	}
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div class="w3-bar w3-border w3-card-4 ey seccion_nav">
						<div  className="w3-row container_web">
							<div className="w3-col s12 m6">
								<div className="img_logo">
									<img src="../assets/fixperto1.png" className="w3-round" alt="Norway" />
								</div>
							</div>

							<div className="w3-col s12 m6">
								<div className="text_nav">
									<p>Iniciar sesion</p>
									<button className="w3-button "
									onClick={(e) => {
										e.preventDefault();
										this.continuar();
									}}>Registrate</button>
								</div>
							</div>
						</div>
					</div>

					<div className="perfil">
                        
						<div className="w3-row">

							<div className="w3-col s12 m7">
								<div class="w3-card card_perfil">
									<div className="w3-row info_person">
										<div className="w3-col s12 m5">
											<div className="w3-center img_upl">
												<FileUpload onChange={(photo) => { this.setState({ photo }) }} />
											</div>
										</div>
										<div className="w3-col s10 m5">
											<h5>¡Hola!</h5>
											<h6>Maria Hurtado</h6>
										</div>
										<div className="w3-col s2 m2">
											<p>
											<img src="../assets/iconos/star.png" class="img_star" alt="star"></img>
											4.9</p>
										</div>
									</div>

									<div className="w3-row copy">
										<div className="w3-col s3">
											<img src="../assets/iconos/alert.png" class=" img_alert" alt="alert"></img>
										</div>
										<div className="w3-col s9">
											<p>Completa todos los datos de tu perfil</p>
										</div>
									</div>

									<div>
										<div className="w3-row title_datos">
											<h2>
											<img src="../assets/iconos/solicit.png" class=" img_tus_datos" alt="solicitud"></img>
											Tus datos</h2>
										</div>

										<div className="w3-row list_datos">

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/perfil/perfil-informacion" className="">Información personal</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/perfil/perfil-informacion"><img src="../assets/iconos/continuar.png" class=" img_continuar" alt="continuar"></img></Link>
													
												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/perfil/registro" className="">Configuración</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/perfil/registro" ><img src="../assets/iconos/continuar.png" class=" img_continuar" alt="continuar"></img></Link>
													
												</div>
											</div>
											
										</div>
									</div>

									<div>
										<div className="w3-row title_datos">
											<h2>
											<img src="../assets/iconos/solicit.png" class=" img_tus_datos" alt="solicitud"></img>
											Sobre Fixperto</h2>
										</div>

										<div className="w3-row list_datos">

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/perfil/login" className="">Quienes somos</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/perfil/registro" ><img src="../assets/iconos/continuar.png" class=" img_continuar" alt="continuar"></img></Link>
												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/perfil/login" className="">Atención al cliente</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/perfil/registro" ><img src="../assets/iconos/continuar.png" class=" img_continuar" alt="continuar"></img></Link>
												</div>
											</div>

											<div className="w3-row list">
												<div className="w3-col s10">
													<Link to="/perfil/login" className="">Términos y condiciones</Link>
												</div>
												<div className="w3-col s2">
													<Link to="/perfil/registro" ><img src="../assets/iconos/continuar.png" class=" img_continuar" alt="continuar"></img></Link>
												</div>
											</div>
											
										</div>
									</div>

									<div className="w3-row btn_close">
										<button class="w3-button "> CERRAR SESIÓN </button>
									</div>

								</div>

							</div>

							<div className="w3-col s12 m5">
								<div class="w3-card card_info">
									<Switch>
										<Route path="/perfil/perfil-informacion" component={PerfilInformacion} />
										<Route path="/perfil/registro" component={Ingreso} />
										<Route path="/perfil/codigosms" component={CodigoSms} />
									</Switch>
								</div>
							</div>
						</div>
					</div>

				</div>

				
			</React.Fragment >
		);
	}
}

export default Perfil;



