import React from 'react';
import Alerta from "../../componentes/alertaVista";

class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false,  notificaciones: "", notificaciones_chat: ""
		}
	}

	render() {

		const { textoAlert, showAlert, notificaciones, notificaciones_chat } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="info_perfil_config">
						<h1 className="titleRegister">En progreso</h1>
                        
                        <div className="w3-row serv">
                            <div className="w3-col s2 m3 ">
                                <img src="../../assets/iconos/services/1.png" className="img_serv" alt="star"></img>
                            </div>

                            <div className="w3-col s10 m7 ">
                                <p> <span className="text_blue_dark">Pintura</span> / Exterior </p>
                                <p>06/17/2019</p>
                                <p>  
                                    <img src="../../assets/iconos/esperando.png" className="img_esperando" alt="star"></img>
                                    Esperando servicios
                                </p>

                                <p>  
                                    
                                    <img src="../../assets/iconos/mas.png" className="img_mas" alt="star"></img>
                                    Ver más
                                </p>
                            </div>
                        </div>

                        <div className="w3-row serv">
                            <div className="w3-col s2 m3 ">
                                <img src="../../assets/iconos/services/2.png" className="img_serv" alt="star"></img>
                            </div>

                            <div className="w3-col s10 m7 ">
                                <p> <span className="text_blue_dark">Pintura</span> / Exterior </p>
                                <p>06/17/2019</p>
                                <p>  
                                    <img src="../../assets/iconos/esperando.png" className="img_esperando" alt="star"></img>
                                    Esperando servicios
                                </p>

                                <p>  
                                    
                                    <img src="../../assets/iconos/mas.png" className="img_mas" alt="star"></img>
                                    Ver más
                                </p>
                            </div>
                        </div>

                        <div className="w3-row serv">
                            <div className="w3-col s2 m3 ">
                                <img src="../../assets/iconos/services/3.png" className="img_serv" alt="star"></img>
                            </div>

                            <div className="w3-col s10 m7 ">
                                <p> <span className="text_blue_dark">Pintura</span> / Exterior </p>
                                <p>06/17/2019</p>
                                <p>  
                                    <img src="../../assets/iconos/esperando.png" className="img_esperando" alt="star"></img>
                                    Esperando servicios
                                </p>

                                <p>  
                                    
                                    <img src="../../assets/iconos/mas.png" className="img_mas" alt="star"></img>
                                    Ver más
                                </p>
                            </div>
                        </div>

                        <div className="w3-row serv">
                            <div className="w3-col s2 m3 ">
                                <img src="../../assets/iconos/services/4.png" className="img_serv" alt="star"></img>
                            </div>

                            <div className="w3-col s10 m7 ">
                                <p> <span className="text_blue_dark">Pintura</span> / Exterior </p>
                                <p>06/17/2019</p>
                                <p>  
                                    <img src="../../assets/iconos/esperando.png" className="img_esperando" alt="star"></img>
                                    Esperando servicios
                                </p>

                                <p>  
                                    
                                    <img src="../../assets/iconos/mas.png" className="img_mas" alt="star"></img>
                                    Ver más
                                </p>
                            </div>
                        </div>

                        <div className="w3-row serv">
                            <div className="w3-col s2 m3 ">
                                <img src="../../assets/iconos/services/5.png" className="img_serv" alt="star"></img>
                            </div>

                            <div className="w3-col s10 m7 ">
                                <p> <span className="text_blue_dark">Pintura</span> / Exterior </p>
                                <p>06/17/2019</p>
                                <p>  
                                    <img src="../../assets/iconos/esperando.png" className="img_esperando" alt="star"></img>
                                    Esperando servicios
                                </p>

                                <p>  
                                    
                                    <img src="../../assets/iconos/mas.png" className="img_mas" alt="star"></img>
                                    Ver más
                                </p>
                            </div>
                        </div>

					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default Registro;