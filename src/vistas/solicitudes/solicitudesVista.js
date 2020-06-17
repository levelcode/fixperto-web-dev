import React from 'react';
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import SolicitudesProgreso from "./solicitudesProgreso";
class Perfil extends React.Component {
	constructor(props) { super(props); this.state = {}; }
	render() {
		return (
			<React.Fragment>
				<div className="container">


					<div className="perfil solicitudes">

                        <div className="copy w3-row progreso">
                            <div className="w3-col s3 m1 l3">
                                <img src="../../assets/iconos/progreso.png" className="img_star" alt="star"></img>
                            </div>

                            <div className="w3-col s9 m11 l9">
                                <p>Pronto recibirás una notificación <span>fixperto están evaluando tu servicio</span> </p>
                                
                            </div>
                        </div>

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
                                                <Link to="/fixperto/perfil/perfil-informacion" className="">
                                                   Agendados
                                                </Link>
                                            </div>

                                            <hr></hr>

                                            <div>
                                                <Link to="/fixperto/perfil/perfil-informacion" className="">
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



