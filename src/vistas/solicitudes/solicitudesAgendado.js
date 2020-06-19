import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import httpClient from "../../constantes/axios";

class SolicitudesProgreso extends React.Component {

	constructor(props) { 
        super(props); 
        this.state = { 
            textoAlert  : "", 
            showAlert   : false, 
            cargador    : false, 
            requests    : [], 
            user        : [],
        } 
    }

    componentDidMount() { 
        var user = JSON.parse(localStorage.getItem("@USER"))
        this.state['user'].push(user)

        this.getRequests()
    }

    getRequests = () => {

        var me = this
        var typeId = this.state['user'][0]['typeId']
        axios({
            method  : 'post',
            url     : httpClient.urlBase + '/cliente/getRequestsScheduled',
            data    : { id : typeId},
            headers : { Accept: 'application/json' }
        })
        .then(function (responseJson) {

            responseJson = responseJson['data']
            
            if (responseJson.success) { 
                me.setState({ requests: responseJson.requests }); 
            }
			else { 
                me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, por favor pruebe nuevamente" }); 
            }
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
        })
	}

	render() {

		const { textoAlert, showAlert, notificaciones, notificaciones_chat } = this.state;

		return (
			<React.Fragment>

				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

				<div className="solicitudes">

                    {
                    this.state["requests"].length > 0 && 
                        <div className="copy w3-row progreso">
                            <div className="w3-col s3 m1 l3">
                                <img src="../../assets/iconos/progreso.png" className="img_star" alt="star"></img>
                            </div>

                            <div className="w3-col s9 m11 l9">
                                <p>Pronto recibirás una notificación <span>fixperto están evaluando tu servicio</span> </p>
                                
                            </div>
                        </div>
                    }


					<div className="info_perfil_config">
						<h1 className="titleRegister">Agendados</h1>
                        
                        <div className="w3-row serv">
                            {
                            this.state["requests"].length > 0 &&
                                this.state.requests.map((item, key )=> (
                                    <div className="cont_srv w3-row">
                                        <div className="w3-col s2 m3 ">
                                            {(item.icon) ?
                                                <img src={item.icon } className="img_serv" />
                                                : <img src="../../../assets/iconos/alert_icon.png" className="img_serv" />
                                            }
                                        </div>

                                        <div className="w3-col s10 m7 ">
                                            {
                                            item.emergency === 1 && <div >
                                                    <p className="text_blue_dark">  
                                                        <img src="../../../assets/iconos/emergencia.png" style={{ width: 18, height: 18, marginTop : -8, marginRight : 10 }} />

                                                        Solicitud de emergencia 
                                                    </p>
												</div>
                                            }
                                            <p> <span className="text_blue_dark">{item.service}</span> / {item.category} </p>

                                            <p>{item.fixperto}</p>
                                            <p>Fecha agendada: {(item.scheduled_date) ? item.scheduled_date : "Pendiente"}</p>

                    

                                            {
                                                item.emergency === 1 && 
												<p className="text_blue_dark">
                                                    Tiempo de respuesta: {item.response_time}
                                                </p>
                                            }

                                            <p>  
                                                <img src="../../assets/iconos/mas.png" className="img_mas" alt="star"></img>
                                                Ver más
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }

                            
                        </div>

					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default SolicitudesProgreso;