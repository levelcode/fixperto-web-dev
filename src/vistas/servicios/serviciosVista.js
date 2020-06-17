import React from 'react';
import Alerta from "../../componentes/alertaVista";
import { Link } from "react-router-dom";

class ServiciosVista extends React.Component {

    constructor(props) { super(props); this.state = { servicios: true, }; }

	render() {
		return (
			<React.Fragment>

				<div className="servicios">

					<div className="buscador">
                        <h3> ¿<b>Maria</b>,</h3>
                        <h3>necesitas un experto en.. ?</h3>

                        <div>
                            <input className="w3-input" type="text"></input>
                        </div>
					</div>

                    <div className="list_servicios">

                        <div className="w3-row">
                            <div className="w3-col s6 m3 l2">
                                <Link to="/fixperto/servicios-categ" className="">
                                    <div className="w3-card card_serv">
                                        <img src="../../assets/iconos/services/0.png" className="img_serv" alt=""></img>
                                        <p>Servicios de emergencia</p>
                                    </div>
                                </Link>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <Link to="/fixperto/servicios-categ" className="">
                                    <div className="w3-card card_serv">
                                        <img src="../../assets/iconos/services/1.png" className="img_serv" alt=""></img>
                                        <p>Jardineros</p>
                                    </div>
                                </Link>
                                
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/2.png" className="img_serv" alt=""></img>
                                    <p>Electricistas</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/3.png" className="img_serv" alt=""></img>
                                    <p>Cerrajeros</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/4.png" className="img_serv" alt=""></img>
                                    <p>Pintores</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/5.png" className="img_serv" alt=""></img>
                                    <p>Plomeros</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/6.png" className="img_serv" alt=""></img>
                                    <p>Albañiles</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/7.png" className="img_serv" alt=""></img>
                                    <p>Carpinteros</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/8.png" className="img_serv" alt=""></img>
                                    <p>Impermeabilización</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/0.png" className="img_serv" alt=""></img>
                                    <p>Servicios de emergencia</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/1.png" className="img_serv" alt=""></img>
                                    <p>Jardineros</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/2.png" className="img_serv" alt=""></img>
                                    <p>Electricistas</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/3.png" className="img_serv" alt=""></img>
                                    <p>Cerrajeros</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/4.png" className="img_serv" alt=""></img>
                                    <p>Pintores</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/5.png" className="img_serv" alt=""></img>
                                    <p>Plomeros</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/6.png" className="img_serv" alt=""></img>
                                    <p>Albañiles</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/7.png" className="img_serv" alt=""></img>
                                    <p>Carpinteros</p>
                                </div>
                            </div>

                            <div className="w3-col s6 m3 l2">
                                <div className="w3-card card_serv">
                                    <img src="../../assets/iconos/services/8.png" className="img_serv" alt=""></img>
                                    <p>Impermeabilización</p>
                                </div>
                            </div>
                        </div>
                    
                    </div>
				</div>
			</React.Fragment >
		);
	}
}

export default ServiciosVista;