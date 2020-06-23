import React from 'react';
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import SolicitudesProgreso from "./solicitudesProgreso";
import SolicitudesAgendado from "./solicitudesAgendado";
import SolicitudesCompletado from "./solicitudesCompletados";
class Solicitudes extends React.Component {
	constructor(props) { super(props); this.state = { progreso: true, agendado: false, completado: false } }
	active = (text) => { let state = {}; Object.keys(this.state).map((key) => state[key] = (key === text)); this.setState(state); }

	componentDidMount() {
		switch (this.props["history"]["location"]["pathname"]) {
			case "/fixperto/solicitudes/solicitud-progreso":
				this.setState({ progreso: true, agendado: false, completado: false });
				break;
			case "/fixperto/solicitudes/solicitud-agendado":
				this.setState({ progreso: false, agendado: true, completado: false });
				break;
			case "/fixperto/solicitudes/solicitud-completado":
				this.setState({ progreso: false, agendado: false, completado: true });
				break;
			default:
				break;
		}
	}
	
	render() {
		const { progreso, agendado, completado } = this.state;
		const itemStyle = "active";
		return (
			<React.Fragment>
				<div className="container">
					<div className="perfil solicitudes">
						<div className="w3-cell-row w3-margin-bottom flex-aling">
							<div className="w3-cell" style={{ width: 35 + "px" }}>
								<img src="../../assets/solicitudesUp.png" alt="Norway" />
							</div>
							<h2 className="w3-cell azul-oscuro"><b>Solicitudes</b></h2>
						</div>
						<div className="w3-row">
							<div className="w3-col s12 m5">
								<div className="w3-card card_perfil card_info">
									<div>
										<div className="w3-row list_datos">
											<div className={(progreso) ? `${itemStyle}` : ``}>
												<Link to="/fixperto/solicitudes/solicitud-progreso" onClick={() => this.active("progreso")}>
													En progreso
                                                </Link>
											</div>
											<hr></hr>
											<div className={(agendado) ? `${itemStyle}` : ``}>
												<Link to="/fixperto/solicitudes/solicitud-agendado" onClick={() => this.active("agendado")}>
													Agendados
                                                </Link>
											</div>
											<hr></hr>
											<div className={(completado) ? `${itemStyle}` : ``}>
												<Link to="/fixperto/solicitudes/solicitud-completado" onClick={() => this.active("completado")}>
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



