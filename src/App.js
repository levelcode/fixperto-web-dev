import React from 'react';
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Header from "./componentes/header";
import Chat from "./vistas/chat/chatVista";
import Perfil from "./vistas/perfil/perfilVista";
import Servicios from "./vistas/servicios/serviciosVista";
import ServiciosCategorias from "./vistas/servicios/serviciosCategorias";
import ServiciosNuevaSolicitud from "./vistas/servicios/serviciosNuevaSolic";

const Solicitudes = () => { return <div>Solicitudes</div> }
class App extends React.Component {
	constructor(props) { super(props); this.state = { servicios: true, solicitudes: false, chat: false, perfil: false }; }
	componentDidMount() { }
	active = (text) => { let state = {}; Object.keys(this.state).map((key) => state[key] = (key === text)); this.setState(state); }
	render() {
		const { servicios, solicitudes, chat, perfil } = this.state;
		const itemStyle = "w3-mobile  w3-button ";
		return (
			<React.Fragment>
				<Header/>
				<div className="fondPage w3-text-white">
					<div className="menu">

						<Link to="/fixperto/servicios" className={(servicios) ? `blue_menu ${itemStyle}` : `blue_menu_dark ${itemStyle}`}
							onClick={() => this.active("servicios")}>
							<img src="/assets/iconos/servicios.png" alt="servicios" />
							Servicios 
						</Link>

						<Link to="/fixperto/solicitudes" className={(solicitudes) ? `blue_menu ${itemStyle}` : `blue_menu_dark ${itemStyle}`}
							onClick={() => this.active("solicitudes")}>
							<img src="/assets/iconos/solicitudes.png" alt="solicitud" />
							Solicitudes 
						</Link>

						<Link to="/fixperto/chat" className={(chat) ? `blue_menu ${itemStyle}` : `blue_menu_dark ${itemStyle}`}
							onClick={() => this.active("chat")}>
							<img src="/assets/iconos/chat.png" alt="chat" />
							Chat 
						</Link>

						<Link to="/fixperto/perfil" className={(perfil) ? `blue_menu ${itemStyle}` : `blue_menu_dark ${itemStyle}`}
							onClick={() => this.active("perfil")}>
							<img src="/assets/iconos/perfil.png" alt="perfil" />
							Perfil 
						</Link>
					
					</div>
				</div>
				<div className="w3-mobile" style={{ width: 100 + '%' }}>
					<Switch>
						<Route path="/fixperto/servicios" render={() => (<Servicios history={this.props["history"]} />)} />

						<Route path="/fixperto/servicios-categ" render={() => (<ServiciosCategorias history={this.props["history"]} />)} />

						<Route path="/fixperto/servicios-nueva" render={() => (<ServiciosNuevaSolicitud history={this.props["history"]} />)} />

						<Route path="/fixperto/solicitudes" render={() => (<Solicitudes history={this.props["history"]} />)} />

						<Route path="/fixperto/chat" render={() => (<Chat history={this.props["history"]} />)} />

						<Route path="/fixperto/perfil" render={() => (<Perfil history={this.props["history"]} />)} />
					</Switch>
				</div>
			</React.Fragment >
		);
	}
}
export default App;