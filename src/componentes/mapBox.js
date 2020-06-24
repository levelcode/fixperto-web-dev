import React from 'react';
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
var map = {}
class MapBox extends React.Component {
	mapRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = { center: [-74.081749, 4.6097102], zoom: 5, routes: [], selectedItem: 0, regions: [], selectedRegion: this.props["selectedRegion"] };
	}
	componentDidMount() {
		const { center, zoom } = this.state;
		map = new mapboxgl.Map({ container: this.mapRef.current, style: 'mapbox://styles/mapbox/streets-v9', zoom, center });
		this.getRegiones();
	}
	getRegiones = () => {
		if (this.state["routes"].length === 0) {
			let me = this;
			return axios({
				method: 'post', url: httpClient.urlBase + '/seguridad/getRegions', headers: { Accept: 'application/json' }
			})
				.then(function (responseJson) {
					if (responseJson["data"]["success"]) {
						me.setState({ routes: responseJson["data"]["regions"] });
					}
					else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, intente nuevamente" }); }
				})
				.catch(function (response) { me.setState({ showAlert: true, textoAlert: "Problemas de conexión" }); });
		}
	}
	createCoordinates = (selectedItem) => {
		var me = this;
		let coordinates = [];
		function create(coor) { coor.map((co, ind) => coordinates.push([co["longitude"], co["latitude"]])); return coordinates; }
		selectedItem["regions"].map((region, ind) => {
			if (!map.getSource(region['city'] + "_" + region["id"])) {
				map.addSource(region['city'] + "_" + region["id"], {
					'type': 'geojson',
					'data': {
						'type': 'Feature',
						'properties': { name: region["name"], id: region["id"] },
						'geometry': { 'type': 'Polygon', 'coordinates': [create(region["coordinates"])] }
					}
				});
				map.addLayer({
					'id': region['city'] + "_" + region["id"],
					'type': 'fill',
					'source': region['city'] + "_" + region["id"],
					'layout': {},
					'paint': { 'fill-color': '#088', 'fill-opacity': 0.1 }
				});
				map.on('click', region['city'] + "_" + region["id"], function (e) {
					if (me.state["selectedRegion"]["id"] === e.features[0].properties.id) { me.setState({ selectedRegion: { name: "", id: "" } }); }
					else { me.setState({ selectedRegion: e.features[0].properties }); }
					new mapboxgl.Popup()
						.setLngLat(e.lngLat)
						.setHTML(e.features[0].properties.name)
						.addTo(map);
				});
			}
		})
	}
	selectedCity = id => {
		if (id !== 0) {
			let selectedItem = this.state["routes"].find(route => id === route["id"].toString());
			this.setState({ selectedItem: id, center: [selectedItem["coordinate"]["longitude"], selectedItem["coordinate"]["latitude"]] });
			this.createCoordinates(selectedItem);
			map.jumpTo({ 'center': [selectedItem["coordinate"]["longitude"], selectedItem["coordinate"]["latitude"]], 'zoom': 9 });
		}
	}
	selectedRegion = () => {
		if (this.state["selectedRegion"]["id"] !== "") {
			this.props["onSelect"](this.state["selectedRegion"]);
		}
		else { this.setState({ showAlert: true, textoAlert: "Debe seleccionar una región" }); }
	}
	render() {
		const { showAlert, textoAlert, routes, selectedItem } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="w3-container w3-section">
					<label>Seleccione una región*</label>
					<select className="w3-select w3-border w3-round-large" name="type"
						value={selectedItem} onChange={(e) => this.selectedCity(e.target.value)}>
						<option value={0} >Seleccione...</option>
						{routes.map((route, key) => (
							<option key={key} value={route.id} >{route.title}</option>
						))}
					</select>
				</div>
				<div ref={this.mapRef} className="mapContainer w3-container" />
				<div className=" w3-container w3-section">
					<button className="w3-button btn w3-block"
						onClick={() => { this.selectedRegion(); }}>
						Aceptar
					</button>
				</div>
			</React.Fragment >
		);
	}
}
export default MapBox;
