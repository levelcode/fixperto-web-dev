import React from 'react';
import Alerta from "../../componentes/alertaVista";
import { Link } from "react-router-dom";
import axios from "axios";
import httpClient from "../../constantes/axios";

class ServiciosVista extends React.Component {

    constructor(props) { 
        super(props); 
        this.state = { 
            textoAlert      : "", 
            showAlert       : false, 
            user            : [], 
            services        : [], 
            copy            : [], 
            search          : "", 
            new_categori    : "",
            name            : "",
        }
    }

    componentDidMount() { 
        var user = JSON.parse(localStorage.getItem("@USER"))
        this.setState({user})

        this.state['user'].push(user)

        this.setState({name : this.state['user'][0]['name']});

        this.getServices()
    }

    getServices = () => {
        var me = this
        axios({
            method: 'post',
            url: httpClient.urlBase + '/services/getServices',
            headers: { Accept: 'application/json' }
        })
        .then(function (responseJson) {

            responseJson = responseJson['data']
            this.setState({ 
                services: responseJson.services, 
                copy: responseJson.services 
            })
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
                me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
            }
        })	
	}

    updateSearch = search => {
		let copy = this.state["services"].filter(service => (service["denomination"].toLowerCase()).indexOf(search.toLowerCase()) !== -1);
		this.setState({ search, copy });
	};

    servicioSelected(item) { 
        this.props["history"]["push"]("fixperto/servicios");
    }

    keyExtractor = (item, index) => index.toString()

    addCategory = () => {
        var me = this
        axios({
            method: 'post',
            url: httpClient.urlBase + '/services/addCategoriaSugerida',
            data: { 
                denomination: this.state["new_categori"]
            },
            headers: { Accept: 'application/json' }
        })
        .then(function (responseJson) {

            responseJson = responseJson['data']

            if (responseJson.success) {
                me.setState({ showAlert: true, textoAlert: "Gracias por tu mensaje", new_categori: "", search: "", copy: this.state["services"] });
            }else { 
                me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, inténtelo nuevamente" });
            }
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
                me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
            }
        })
	}

	render() {
        const { textoAlert, showAlert, search, new_categori} = this.state;

		return (
			<React.Fragment>

				<div className="servicios">

					<div className="buscador">
                        <h3> ¿<b>{this.state['name']}</b>,</h3>
                        <h3>necesitas un experto en.. ?</h3>

                        <div>
                            <input className="w3-input" type="text" value={search} 
							onChange={(e) => this.updateSearch(e.target.value)} />
                        </div>

					</div>

                    <div className="list_servicios">

                        {
                        this.state["copy"].length === 0 && this.state["search"] !== "" &&
                            <div className="add_cat">
                                <p>Escribe aquí la categoría que estás buscando : </p>

                                <input className="w3-round-large" type="text" value={new_categori} 
								onChange={(e) => this.setState({ new_categori: e.target.value })} />
                
                                <p className="p_btn">
									<button className="w3-button btn"
										onClick={(e) => {
											e.preventDefault();
											this.addCategory();
										}}>Enviar
									</button>
								</p>
                            </div>
                        }

                        <div className="ullll">
                            {this.state.services.map(item => (
                                <div id={item.id}>{item.denomination}</div>
                            ))}
                        </div>

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