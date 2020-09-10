import React, { useState } from "react";
import Alerta from "./alertaVista";
const Servicio = (props) => {
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert] = useState("");
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
		</React.Fragment >
	);
}
export default Servicio;