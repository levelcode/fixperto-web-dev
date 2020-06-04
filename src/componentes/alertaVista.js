import React from 'react';
class Alerta extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="w3-modal w3-text-black" style={{ display: (this.props["showAlert"]) ? "flex" : "none" }}>
					<div className="w3-modal-content w3-animate-top w3-card-2" style={{ width: 25 + '%' }}>
						<div className="w3-container w3-center">
							<div className="w3-margin-top w3-margin-bottom">
								<label><b>{this.props["textoAlert"]}</b></label>
							</div>
							<div className="w3-margin-bottom">
								<button onClick={this.props["close"]}
									className="w3-button w3-indigo w3-hover-indigo w3-round-large">Aceptar</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default Alerta;