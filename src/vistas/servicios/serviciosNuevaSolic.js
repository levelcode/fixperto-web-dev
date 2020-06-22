import React from 'react';
import Alerta from "../../componentes/alertaVista";
import { Link } from "react-router-dom";

class ServiciosNuevaSol extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
            textoAlert      : "", 
            showAlert       : false, 
            show_start_date : false, 
            start_date      : "", 
            show_hour       : false, 
            hour            : "", 
            buttonDisabled  : false, 
            user            : [], 
            description     : "", 
            region          : [], 
            photos          : [], 
            emergency       : false,
            user_name       : "",
            user_service    : "",
            user_categoria  : "",
        };
	}

    componentDidMount() { 
        var user = JSON.parse(localStorage.getItem("@USER"))
        this.state['user'].push(user)


        var serv = this.props.history.location

        var user_ser = serv.service[0].denomination
        this.setState({user_service : user_ser})

        var user_cat = serv.item.denomination
        this.setState({user_categoria : user_cat})

        var nom = this.state['user'][0]['name']
        this.setState({user_name : nom});


        console.log(serv);
        

    }

	guardar = () => {
		let vacios = [];
		if (this.state["detalle"] === "") { vacios.push("  *Nombre y Apellidos"); }
	}

	render() {

		const { textoAlert, showAlert,  description } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="">

					<div className="nueva_solicitud">
						<h1 className="titleRegister">Nueva solicitud</h1>

						<form className="w3-container">

                            <div className="w3-row item">
                                <div className="w3-col s1">
                                    <img src="../../assets/iconos/services/5.png" className="" alt="1"></img>
                                </div>

                                <div className="w3-col s11 text">
                                        <b>{this.state['user_service']}</b> /  
                                        {this.state['user_categoria']}
                                </div>
                            </div>

                            <div>
                                <label> <span className="text_blue">{this.state['user_name']}</span>, escribe el detalle del servicio que necesitas* </label>

							    <input className="w3-input w3-border w3-round-large" type="text" value={description}
								onChange={(e) => this.setState({ description: e.target.value })} />
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