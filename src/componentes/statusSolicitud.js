import React from "react";
const StatusSolicitud = (props) => {
	return (
		<React.Fragment>
			<div className="w3-section w3-center status">
				<div className="w3-margin-bottom">
					<div className="w3-cell w3-container">
						<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
					</div>
					<h4 className="w3-cell text_blue">Creación de solicitud</h4>
				</div>
				<div className="w3-margin-bottom">
					<div className="w3-cell w3-container">
						<img src="../../../../assets/iconos/activo.png" className="imagen-icono" alt="Imagen" />
					</div>
					<p className="w3-cell">Fecha de solicitud del servicio: {props["request"]["registry_date"]}</p>
				</div>
				<br />
				{
					(props["type"] === "scheduled" || props["type"] === "completed") && <div>
						<div className="w3-margin-bottom">
							<div className="w3-cell w3-container">
								<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
							</div>
							<h4 className="w3-cell text_blue">Solicitud agendada</h4>
						</div>
						<div className="w3-margin-bottom">
							<div className="w3-cell w3-container">
								<img src="../../../../assets/iconos/activo.png" className="imagen-icono" alt="Imagen" />
							</div>
							<p className="w3-cell">Fecha del servicio: {(props["request"]["scheduled_date"]) ? props["request"]["scheduled_date"] : "Pendiente"}</p>
						</div>
					</div>
				}
				<br />
				{
					(props["type"] === "completed") && <div>
						<div className="w3-margin-bottom">
							<div className="w3-cell w3-container">
								<img src="../../../../assets/iconos/calendar.png" className="imagen-icono" alt="Imagen" />
							</div>
							<h4 className="w3-cell text_blue">Solicitud completada</h4>
						</div>
						<div className="w3-margin-bottom">
							<div className="w3-cell w3-container">
								<img src="../../../../assets/iconos/activo.png" className="imagen-icono" alt="Imagen" />
							</div>
							<p className="w3-cell">Fecha completada: {(props["request"]["completed_date"]) ? props["request"]["completed_date"] : "Pendiente"}</p>
						</div>
					</div>
				}
			</div>
		</React.Fragment >
	);
}
export default StatusSolicitud;