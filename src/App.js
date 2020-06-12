import React from 'react';
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Header from "./componentes/header";
import Chat from "./vistas/chat/chatVista";
import Perfil from "./vistas/perfil/perfilVista";
const Servicios = () => { return <div>Servicios</div> }
const Solicitudes = () => { return <div>Solicitudes</div> }
class App extends React.Component {
	constructor(props) { super(props); this.state = { servicios: true, solicitudes: false, chat: false, perfil: false }; }
	componentDidMount() { }
	active = (text) => { let state = {}; Object.keys(this.state).map((key) => state[key] = (key === text)); this.setState(state); }
	render() {
		const { servicios, solicitudes, chat, perfil } = this.state;
		const itemStyle = "w3-mobile w3-bar-item w3-button w3-border";
		return (
			<React.Fragment>
				<Header />
				<div className="w3-bar fondPage w3-text-white w3-padding">
					<Link to="/fixperto/servicios" className={(servicios) ? `w3-blue ${itemStyle}` : `w3-indigo ${itemStyle}`}
						onClick={() => this.active("servicios")}>
						Servicios </Link>
					<Link to="/fixperto/solicitudes" className={(solicitudes) ? `w3-blue ${itemStyle}` : `w3-indigo ${itemStyle}`}
						onClick={() => this.active("solicitudes")}>
						Solicitudes </Link>
					<Link to="/fixperto/chat" className={(chat) ? `w3-blue ${itemStyle}` : `w3-indigo ${itemStyle}`}
						onClick={() => this.active("chat")}>
						Chat </Link>
					<Link to="/fixperto/perfil" className={(perfil) ? `w3-blue ${itemStyle}` : `w3-indigo ${itemStyle}`}
						onClick={() => this.active("perfil")}>
						Perfil </Link>
				</div>
				<div className="w3-mobile" style={{ width: 100 + '%' }}>
					<Switch>
						<Route path="/fixperto/servicios" render={() => (<Servicios history={this.props["history"]} />)} />
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