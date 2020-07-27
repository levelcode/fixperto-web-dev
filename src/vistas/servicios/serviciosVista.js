import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import httpClient from "../../constantes/axios";
class Categorias extends React.Component {
	constructor(props) { super(props); this.state = { isShown: true }; }
	render() {
		return (
			<div className="">
				<div className="w3-border w3-white"
					onClick={() => { this.setState({ isShown: !this.state["isShown"] }); }}
					style={{ padding: 5, cursor: "pointer" }}>
					<b>{this.props["item"]["grouped"]}</b>
				</div>
				<ul style={{ cursor: "pointer", display: (this.state["isShown"]) ? "block" : "none" }} className="w3-ul w3-border" >
					{this.props["item"]["elementos"].map((elem, k) => {
						return (<li
							key={k}
							onClick={() => { this.props["categorySelect"](elem, this.props["item"]); }} >
							<div className=""><label>{elem["label"]}</label></div>
						</li>)
					})}
				</ul>
			</div>
		)
	}
}
class ServiciosVista extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textoAlert: "", showAlert: false, user: {}, services: [], copy: [], search: "", new_categori: "", name: "",
		}
	}
	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("@USER")); this.setState({ user, name: user["name"] }); this.getServices();
	}
	getServices = () => {
		var me = this;
		axios({
			method: 'post',
			url: httpClient.urlBase + '/services/getServicess',
			headers: { 'Content-Type': 'text/plain' }
		}).then(function (responseJson) {
			responseJson = responseJson['data'];
			let categories = responseJson.categories;
			categories.unshift(responseJson.categoriesEmergency);
			me.setState({ services: categories, copy: categories });
		}).catch((error) => {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			} else { /*me.getServices();*/ }
		})
	}
	updateSearch = search => {
		let copy = []
		this.state["services"].map((service, ind) => {
			let cop = [];
			cop = service["elementos"].filter(elemento => (elemento["label"].toLowerCase()).indexOf(search.toLowerCase()) !== -1);
			if (cop.length > 0) { service["elementos"] = cop; copy.push(service); };
		});
		this.setState({ search, copy });
	};
	continuarCateg(item) {
		item["denomination"] = item["grouped"];
		this.props.history.push({ pathname: '/fixperto/servicios-categ', item });
	}
	addCategory = () => {
		var me = this;
		axios({
			method: 'post',
			url: httpClient.urlBase + '/services/addCategoriaSugerida',
			data: { denomination: this.state["new_categori"] },
			headers: { 'Content-Type': 'text/plain' }
		}).then(function (responseJson) {
			responseJson = responseJson['data'];
			if (responseJson.success) {
				me.setState({ showAlert: true, textoAlert: "Gracias por tu mensaje", new_categori: "", search: "", copy: this.state["services"] });
			} else {
				me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, inténtelo nuevamente" });
			}
		}).catch((error) => {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		})
	}
	categorySelect = (category, service) => {
		service["denomination"] = service["grouped"];
		this.setState({ search: "" });
		this.props.history.push({ pathname: '/fixperto/servicios-nueva', category, service });
	}
	render() {
		const { search, copy, new_categori } = this.state;
		return (
			<React.Fragment>
				<div className="servicios">
					<div className="buscador padd-ingreso">
						<div className="w3-cell-row">
							<h2 className="w3-cell aling-center azul-oscuro"><b>Servicios</b></h2>
						</div>
						<h3> <b className="text_blue">{this.state['name']}</b></h3>
						<h3> ¿necesitas un experto en... ?</h3>
						<div>
							<input className="w3-input" type="text" value={search} placeholder="Buscar"
								onChange={(e) => this.updateSearch(e.target.value)} />
						</div>
					</div>
					<div className="list_servicios">
						{(search !== "") ?
							(copy.length === 0) ?
								<div className="add_cat">
									<p>Tu búsqueda no arrojó resultados, escribe aquí la categoría que estas buscando</p>
									<input className="w3-round-large" type="text" value={new_categori}
										onChange={(e) => this.setState({ new_categori: e.target.value })} />
									<p className="p_btn">
										<button className="w3-button btn" onClick={() => { this.addCategory(); }}>Enviar</button>
									</p>
								</div>
								: <div className="w3-section">
									{copy.map((item, i) => {
										return <Categorias key={i} item={item} categorySelect={(category, service) => { this.categorySelect(category, service) }} user={this.state["user"]} />
									})}
								</div>
							: <div className="w3-row">
								{this.state.services.map((item, key) => (
									<div className="w3-col s6 m3 l2" key={key}
										onClick={() => { this.continuarCateg(item); }}>
										<div className="w3-card card_serv box-servicio">
											<img src={item.icon} className="img_serv" alt=""></img>
											<p>{item.grouped}</p>
										</div>
									</div>
								))}
							</div>
						}
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default ServiciosVista;