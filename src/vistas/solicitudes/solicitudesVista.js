import React from 'react';
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import SolicitudesProgreso from "./solicitudesProgreso";
import SolicitudesAgendado from "./solicitudesAgendado";
import SolicitudesCompletado from "./solicitudesCompletados";
class Solicitudes extends React.Component {

	constructor(props) { super(props); this.state = { textoAlert: "", showAlert: false, cargador: false, requests: [] } }

	render() {
		return (
			<React.Fragment>
				<div className="container">


					<div className="perfil solicitudes">

						<div className="w3-row">

							<div className="w3-col s12 m5">
								<div className="w3-card card_perfil">


									<div>
										<div className="w3-row list_datos">

                                            <div className="active">
                                                <Link to="/fixperto/solicitudes/solicitud-progreso" className="">
                                                   En progreso
                                                </Link>
                                            </div>  

                                            <hr></hr>

                                            <div>
                                                <Link to="/fixperto/solicitudes/solicitud-agendado" className="">
                                                   Agendados
                                                </Link>
                                            </div>

                                            <hr></hr>

                                            <div>
                                                <Link to="/fixperto/solicitudes/solicitud-completado" className="">
                                                   Completados
                                                </Link>
                                            </div>
                                            

										</div>
									</div>

								</div>

							</div>

							
                            <div className="w3-col s12 m7">
								<div className="w3-card card_info">
									<Switch>
										<Route path="/fixperto/solicitudes/solicitud-progreso" component={SolicitudesProgreso} />
										<Route path="/fixperto/solicitudes/solicitud-agendado" component={SolicitudesAgendado} />
										<Route path="/fixperto/solicitudes/solicitud-completado" component={SolicitudesCompletado} />
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
export default Solicitudes;



