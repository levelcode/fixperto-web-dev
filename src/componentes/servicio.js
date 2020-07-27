import React, { useState } from "react";
import httpClient from "../constantes/axios";
import Alerta from "./alertaVista";
import axios from "axios";
const Servicio = (props) => {
	const [service, setService] = useState({});
	const [showAlert, setShowAlert] = useState(false);
	const [textoAlert, setTextoAlert] = useState("");
	return (
		<React.Fragment>
			<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => setShowAlert(false)} />
		</React.Fragment >
	);
}
export default Servicio;