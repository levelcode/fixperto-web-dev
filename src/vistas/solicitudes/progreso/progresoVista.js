import React from "react";
import DetalleProgreso from "./detalleProgresoVista";
class SolicitudProgreso extends React.Component {
	constructor(props) { super(props); this.state = { detalle: true, status: false }; }
	active = (text) => { let state = {}; Object.keys(this.state).map((key) => state[key] = (key === text)); this.setState(state); }
	render() {
		const { detalle } = this.state;
		return (
			<React.Fragment>
				<div className="w3-mobile">
					<div style={{ display: (detalle) ? "block" : "none" }}>
						<DetalleProgreso request={this.props["request"]} back={(status) => this.props["back"](status)} />
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default SolicitudProgreso;



