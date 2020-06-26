import React from "react";
import DetalleAgendado from "./detalleAgendadoVista";
import Status from "../../../componentes/statusSolicitud";
class SolicitudAgendada extends React.Component {
	constructor(props) { super(props); this.state = { detalle: true, status: false }; }
	active = (text) => { let state = {}; Object.keys(this.state).map((key) => state[key] = (key === text)); this.setState(state); }
	render() {
		const { detalle, status } = this.state;
		const itemStyle = "w3-bar-item w3-button w3-mobile ";
		return (
			<React.Fragment>
				<div className="w3-mobile">
					<div className="w3-bar">
						<div className={(detalle) ? `w3-border-bottom w3-border-blue ${itemStyle}` : ` ${itemStyle}`}
							style={{ width: 50 + "%" }}
							onClick={() => this.active("detalle")} >Detalle</div>
						<div className={(status) ? `w3-border-bottom w3-border-blue ${itemStyle}` : `${itemStyle}`}
							style={{ width: 50 + "%" }}
							onClick={() => this.active("status")} >Status</div>
					</div>
					<div style={{ display: (detalle) ? "block" : "none" }}>
						<DetalleAgendado request={this.props["request"]}
							history={this.props["history"]}
							backCancelar={(status) => this.props["backCancelar"](status)}
							backRechazar={(status) => this.props["backRechazar"](status)}
							backProblema={(status) => this.props["backProblema"](status)}
						/>
					</div>
					<div style={{ display: (status) ? "block" : "none" }}>
						<Status request={this.props["solicitud"]} type="scheduled" />
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default SolicitudAgendada;



