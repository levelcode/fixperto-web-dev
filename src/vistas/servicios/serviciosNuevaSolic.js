import React from 'react';
import Alerta from "../../componentes/alertaVista";
import { Link } from "react-router-dom";

class ServiciosNuevaSol extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false,  detalle: ""
		}
	}

	guardar = () => {
		let vacios = [];
		if (this.state["detalle"] === "") { vacios.push("  *Nombre y Apellidos"); }
	}

	render() {

		const { textoAlert, showAlert,  detalle } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="nueva_solicitud">
						<h1 className="titleRegister">Nueva solicitud</h1>

						<form className="w3-container">

                            <div className="w3-row item">
                                 <Link to="/fixperto/perfil/perfil-informacion" className="">
                                    <div className="w3-col s1">
                                        <img src="../../assets/iconos/services/5.png" className="" alt="1"></img>
                                    </div>

                                    <div className="w3-col s11 text">
                                        <Link to="/fixperto/perfil/perfil-informacion" className="">
                                            <b>Carpinteros</b> / 
                                            Aluminio
                                        </Link>
                                    </div>
                                 </Link>
                            </div>

                            <div>
                                <label> <span className="text_blue">Ambar Ballen</span>, escribe el detalle del servicio que necesitas* </label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={detalle}
								onChange={(e) => this.setState({ detalle: e.target.value })} />
                            </div>

                            <div className="ubicacion">
                                <p className="text_blue">
                                    <img src="../../assets/iconos/ubicacion.png" className="" alt="1"></img>
                                    Ubicación *
                                </p>

                                <p>Con esta información ubicaremos los expertos en tu zona</p>

                                <p>
                                    <button className="w3-button btn_ubicacion"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.guardar();
                                    }}>ELEGIR UBICACIÓN</button>
                                </p>
                            </div>

                            <div className="ubicacion">
                                <p className="text_blue">
                                    <img src="../../assets/iconos/fotos.png" className="" alt="1"></img>
                                    Comparte tus fotos *
                                </p>

                                <p>Esta información es de utilidad para los expertos</p>

                                <p>
                                    <button className="w3-button btn_ubicacion"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.guardar();
                                    }}>GALERÍA</button>
                                </p>
                            </div>

							<p>
                                <button className="w3-button btn"
								onClick={(e) => {
									e.preventDefault();
									this.guardar();
								}}>Enviar solicitud</button>
                            </p>

						</form>
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default ServiciosNuevaSol;