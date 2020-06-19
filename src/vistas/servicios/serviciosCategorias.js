import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import httpClient from "../../constantes/axios";

class ServiciosCateg extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
            textoAlert      : "", 
            showAlert       : false, 
            user            : [], 
            categories      : [],
            user_name       : "",
            service_name    : "",
            icon_name       : "",
            service         : [],
            
        }
	}

    componentDidMount() { 
        var user = JSON.parse(localStorage.getItem("@USER"))
        this.state['user'].push(user)

        var nom = this.state['user'][0]['name']
        this.setState({user_name : nom});

        var serv = this.props.history.location.item
        this.state['service'].push(serv)

        var nom_serv = this.state['service'][0]['denomination']
        this.setState({service_name : nom_serv});

        var icon = this.state['service'][0]['icon']
        this.setState({icon_name : icon});

        this.getCategoriesByService(); 

    }

    getCategoriesByService = () => {

        if(this.state['service'][0]['emergency'] == 0){
             var url = "/services/getCategoriesByService";
        }

        if(this.state['service'][0]['emergency'] == 1){
            var url = "/services/getCategoriesEmergency";
        }

        var id = this.state['service'][0]['id']
        var me = this

        axios({
            method: 'post',
            url: httpClient.urlBase + url,
            data : { service : id },
            headers: { Accept: 'application/json' }
        })
        .then(function (responseJson) {
            responseJson = responseJson['data']

            me.setState({ categories: responseJson.categories})
            
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
        })

    }

    continuarSolicitud = (item) =>{
        this.props.history.push({
            pathname: '/fixperto/servicios-nueva',
            item,
            service : this.state['service']
        })
    }


	render() {


		return (
			<React.Fragment>


				<div className="">

					<div className="info_perfil_comp">
						<h1 className="titleRegister">Categorias</h1>

                        <p> <b>{this.state['user_name']}</b> Tu expero en servicios de {this.state['service_name']} para ... </p>

                        <div className="categorias_serv">

                            {this.state.categories.map((item, key )=> (
                            <div className="w3-row item" key={key} 
                                onClick={(e) => {
									e.preventDefault();
									this.continuarSolicitud(item);
								}}>
                                <div className="w3-col s3">
                                    <img src={this.state['icon_name']} className="" alt={item.denomination}></img>
                                </div>

                                <div className="w3-col s7 text">
                                    <p style={{textAlign : "left"}}>{item.denomination}</p>
                                </div>

                                <div className="w3-col s2">
                                    <img src="../../assets/iconos/continuar.png" className="img_continue" alt="1"></img>
                                </div>
                            </div>
                            ))}

                           
                        </div>
						
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default ServiciosCateg;