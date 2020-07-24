import React from 'react';
import axios from "axios";
import httpClient from "../../constantes/axios";
const queryString = require('query-string');
class ServiciosCateg extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false, categories: [], user_name: "", service_name: "", icon_name: ""
		}
	}
	componentDidMount() {console.log(this.props)
		var user = JSON.parse(localStorage.getItem("@USER"));
		if (!Object.keys(user).length) {
			if (this.props["location"] && this.props["location"]["search"] !== "") {
				let parsed = queryString.parse(this.props["location"]["search"]);
				parsed["service"]=JSON.parse(parsed["service"]);
				localStorage.setItem("@SEARCHCAT", JSON.stringify(parsed["service"]));
			}
			this.props["history"]["push"]("/ingreso");
		}
		else {
			if (user["type"] !== "cliente") {
				localStorage.setItem("@SEARCHCAT", JSON.stringify({}));
				localStorage.setItem("@USER", JSON.stringify({}));
				this.props["history"]["push"]("/ingreso");
			}
			else {
				if (this.props["location"] && this.props["location"]["search"] !== "") {
					let parsed = queryString.parse(this.props["location"]["search"]);
					parsed["service"]=JSON.parse(parsed["service"]);
					console.log(parsed);
					if (parsed["service"]) {
						this.props.history.location.item = {
							id: parsed["service"]['id'],
							icon: parsed["service"]['icon'],
							grouped: parsed["service"]['denomination'],
							denomination: parsed["service"]['denomination'],
							emergency: parsed["service"]['emergency']
						}
						this.setState({
							user_name: JSON.parse(localStorage.getItem("@USER"))["name"],
							service_name: parsed["service"]['denomination'],
							icon_name: parsed["service"]['icon']
						});
						this.getCategoriesByService();
					}
				}
				else if (this.props["history"]["location"]["item"]) {
					this.setState({
						user_name: JSON.parse(localStorage.getItem("@USER"))["name"],
						service_name: this.props.history.location.item['denomination'],
						icon_name: this.props.history.location.item['icon']
					});
					this.getCategoriesByService();
				}
			}
		}
	}
	getCategoriesByService = () => {
		var url = "";
		if (this.props.history.location.item['emergency'] === 0) { url = "/services/getCategoriesByService"; }
		else if (this.props.history.location.item['emergency'] === 1) { url = "/services/getCategoriesEmergency"; }
		var me = this;
		axios({
			method: 'post', url: httpClient.urlBase + url, data: { service: this.props.history.location.item['id'] }, headers: { Accept: 'application/json' }
		})
			.then(function (responseJson) {
				responseJson = responseJson['data']; me.setState({ categories: responseJson.categories });
			})
			.catch((error) => {
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			})
	}
	continuarSolicitud = (category) => {
		this.props.history.push({ pathname: '/fixperto/servicios-nueva', category, service: this.props.history.location.item });
	}
	render() {
		const { user_name, service_name, categories, icon_name } = this.state;
		return (
			<React.Fragment>
				<div className="padd-general">
					<div className="info_perfil_comp">
						<h1 className="titleRegister">Categorías</h1>
						<p> <b className="text_blue">{user_name}</b>, tu experto en {service_name} es para ... </p>
						<div className="categorias_serv">
							{categories.map((item, key) => (
								<div className="w3-row item flex-aling" key={key} style={{ cursor: "pointer" }}
									onClick={() => { this.continuarSolicitud(item); }}>
									<div className="w3-col s3 margin-cero">
										<img src={icon_name} className="" alt={item.denomination}></img>
									</div>
									<div className="w3-col s7 text margin-cero">
										<p style={{ textAlign: "left" }}>{item.denomination}</p>
									</div>
									<div className="w3-col s2 margin-cero">
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