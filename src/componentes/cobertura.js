import React from 'react';
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhaW5jaGFjb24iLCJhIjoiY2tidGlmOWlpMGE0NDJ3cGkxM3VlZ3lwdyJ9.IvvBaCR9SJUnElA6b8kwkw';
var map = {}
class Cobertura extends React.Component {
	mapRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = { showSelect: false, routes: [], center: [-74.081749, 4.6097102], zoom: 5, regions: [] };
	}
	componentDidMount() {
		const { center, zoom } = this.state;
		map = new mapboxgl.Map({
			container: this.mapRef.current,
			style: 'mapbox://styles/alainchacon/ckbv0v5xo10g81ipkfh8q6fcp',
			zoom,
			center
		});
		if (this.state["routes"].length === 0) {
			let me = this;
			return axios({
				method: 'post',
				url: httpClient.urlBase + '/seguridad/getRegions',
				headers: { Accept: 'application/json' }
			})
				.then(function (responseJson) {
					if (responseJson["data"]["success"]) { me.setState({ routes: responseJson["data"].regions }); }
					else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error intente nuevamente" }); }
				})
				.catch(function (response) {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				});
		}
	}
	createCoordinates = (selectedItem) => {
		selectedItem.regions.map(r => {
			let key = `${r.city}_${r.id}`;
			let selected = this.props["selectedRegion"].find(route => r.id === route["id"]);
			if (!map.getSource(key)) {
				map.addSource(key, {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [{
							type: "Feature",
							properties: { key, name: r.name, id: r.id },
							geometry: {
								type: "Polygon",
								coordinates: [r.coordinates.concat(r.coordinates.slice(0, 1)).map(c => [c.longitude, c.latitude])]
							}
						}]
					}
				});
				map.addLayer({
					id: `${key}-fill`,
					type: "fill",
					source: key,
					paint: { "fill-color": "#43AECC", "fill-opacity": (selected) ? 0.3 : 0 }
				});
				map.addLayer({
					id: `${key}-line`,
					type: "line",
					source: key,
					paint: { "line-width": 2, "line-color": "#43AECC" }
				});
				map.on('click', `${key}-fill`, e => {
					let item = this.props["selectedRegion"].find(route => e.features[0].properties.id === route["id"]);
					if (item) {
						this.props["remove"](item);
						map.setPaintProperty(`${key}-fill`, "fill-opacity", 0);
					} else {
						this.props["add"](e.features[0].properties);
						map.setPaintProperty(`${key}-fill`, "fill-opacity", 0.3);
						new mapboxgl.Popup()
							.setLngLat(e.lngLat)
							.setHTML(e.features[0].properties.name)
							.addTo(map);
					}
				});
			}
		});
	}
	selectedCity = selectedItem => {
		this.setState({ center: [selectedItem["coordinate"]["longitude"], selectedItem["coordinate"]["latitude"]] });
		this.createCoordinates(selectedItem);
		map.jumpTo({ 'center': [selectedItem["coordinate"]["longitude"], selectedItem["coordinate"]["latitude"]], 'zoom': 8 });
	}
	confirmar = () => {
		if (this.props["selectedRegion"].length > 0) { this.setState({ showSelect: false }); }
		else { this.setState({ showAlert: true, textoAlert: "Debe seleccionar al menos una región" }); }
	}
	render() {
		const { showSelect, showAlert, textoAlert, routes } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="container_web">
					<div style={{ cursor: "pointer", display: (!showSelect) ? "block" : "none", padding: 10 + "px" }} className="w3-margin-top w3-border"
						onClick={() => { this.setState({ showSelect: true }); }}>
						<label>Seleccione su cobertura</label>
					</div>
					<ul style={{ display: (!showSelect) ? "block" : "none" }} className="w3-ul w3-border" >
						{this.props["selectedRegion"].map((selected, ke) => {
							return (
								<li key={ke}>
									<div className="w3-cell"><label>{selected["name"]}</label></div>
									<div className="w3-cell" style={{ cursor: "pointer" }} onClick={() => { this.props["remove"](selected) }}>
										<img src="../../assets/iconos/eliminar.png"
											style={{ width: 15 + "px", height: 15 + "px" }}
											alt="Imagen" />
									</div>
								</li>
							)
						})}
					</ul>
					<div className="w3-bar" style={{ display: (showSelect) ? "flex" : "none", }}>
						{routes.map((route, ind) => {
							let ref = React.createRef();
							return (
								<button key={ind} ref={refs => ref = refs} style={{ cursor: "pointer", width : 100 + "%" }}
									className="testbtn w3-bar-item w3-border tablink" onClick={() => {
										var i, x, tablinks;
										x = document.getElementsByClassName("tablink");
										tablinks = document.getElementsByClassName("tablink");
										for (i = 0; i < x.length; i++) {
											tablinks[i].className = tablinks[i].className.replace(" w3-blue", "");
										}
										ref.className += " w3-blue"; this.selectedCity(route)
									}}>{route["title"]}</button>
							)
						})}
					</div>
					<div style={{ display: (showSelect) ? "block" : "none" }} ref={this.mapRef} className="mapContainer w3-container" />
					<button style={{ display: (showSelect) ? "block" : "none" }} onClick={() => { this.confirmar(); }}
						className="w3-button w3-block btn w3-round-large">Confirmar</button>
				</div>
			</React.Fragment >
		);
	}
}
export default Cobertura;