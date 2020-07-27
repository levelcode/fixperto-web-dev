import React from 'react';
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhaW5jaGFjb24iLCJhIjoiY2tidGlmOWlpMGE0NDJ3cGkxM3VlZ3lwdyJ9.IvvBaCR9SJUnElA6b8kwkw';
var map = {}
class MapBox extends React.Component {
	mapRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = { showAlert: false, textoAlert: "", center: [-74.081749, 4.6097102], zoom: 5, routes: [], selectedItem: 0, regions: [], selectedRegion: this.props["selectedRegion"] };
	}
	componentDidMount() {
		const { center, zoom } = this.state;
		map = new mapboxgl.Map({
			container: this.mapRef.current,
			style: 'mapbox://styles/alainchacon/ckbv0v5xo10g81ipkfh8q6fcp',
			zoom,
			center
		});
		this.getRegiones();
	}
	getRegiones = () => {
		if (this.state["routes"].length === 0) {
			let me = this;
			return axios({
				method: 'post', url: httpClient.urlBase + '/seguridad/getRegions', headers: { Accept: 'application/json' }
			}).then(function (responseJson) {
				if (responseJson["data"]["success"]) {
					me.setState({ routes: responseJson["data"]["regions"] });
				}
				else { me.setState({ showAlert: true, textoAlert: "Ha ocurrido un error, intente nuevamente" }); }
			}).catch(function (error) {
				if (error.message === 'Timeout' || error.message === 'Network request failed') {
					me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
				}
			});
		}
	}
	createCoordinates = (selectedItem) => {
		selectedItem.regions.map(r => {
			let key = `${r.city}_${r.id}`;
			if (!map.getSource(key)) {
				map.addSource(key, {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [{
							type: "Feature",
							properties: {
								key, name: r.name, id: r.id
							},
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
					paint: { "fill-color": "#43AECC", "fill-opacity": 0 }
				});
				map.addLayer({
					id: `${key}-line`,
					type: "line",
					source: key,
					paint: { "line-width": 2, "line-color": "#43AECC" }
				});
				map.on('click', `${key}-fill`, e => {
					if (this.state.selectedRegion.id === e.features[0].properties.id) {
						this.setState({ selectedRegion: { name: "", id: "" } });
						map.setPaintProperty(`${key}-fill`, "fill-opacity", 0);
					} else {
						if (this.state.selectedRegion.key) {
							map.setPaintProperty(`${this.state.selectedRegion.key}-fill`, "fill-opacity", 0);
						}
						this.setState({ selectedRegion: e.features[0].properties });
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
				<div className="container_web">
					<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />

					<div className="w3-container w3-section">
						<label>Seleccione una ciudad*</label>
						<select className="w3-select w3-border w3-round-large" name="type"
							value={selectedItem} onChange={(e) => this.selectedCity(e.target.value)}>
							<option value={0} >Seleccione...</option>
							{routes.map((route, key) => (
								<option key={key} value={route.id} >{route.title}</option>
							))}
						</select>
						<p className="text_blue" style={{ marginBottom: -10 }} >Selecciona el área <img src="../../assets/iconos/click.png" style={{ width: 25, height: 25 }} alt="Area" /> </p>
					</div>

					<div ref={this.mapRef} className="mapContainer w3-container" />
					<div className=" w3-container w3-section">
						<button className="w3-button btn w3-block"
							onClick={() => { this.selectedRegion(); }}>
							Aceptar
						</button>
					</div>


				</div>



			</React.Fragment >
		);
	}
}
export default MapBox;
