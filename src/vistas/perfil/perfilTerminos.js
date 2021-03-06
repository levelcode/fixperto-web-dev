import React from 'react';
import Alerta from "../../componentes/alertaVista";
import axios from "axios";
import parse from 'html-react-parser';
class Terminos extends React.Component {
	constructor(props) { super(props); this.state = { contenido: "", user: {} } }
	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("@USER"))
		this.setState({ user }); this.getData();
	}
	getData = () => {
		var me = this
		axios({
			method: 'get',
			url: "https://backoffice.fixperto.com/wp-json/wp/v2/pages/20",
			headers: { Accept: 'application/json' }
		}).then(function (responseJson) {
			responseJson = responseJson['data'];
			me.setState({ contenido: responseJson["content"]["rendered"] });
		}).catch((error) => {
			if (error.message === 'Timeout' || error.message === 'Network request failed') {
				me.setState({ showAlert: true, textoAlert: "Problemas de conexión" });
			}
		})
	}
	render() {
		const { textoAlert, showAlert, contenido } = this.state;
		return (
			<React.Fragment>
				<Alerta showAlert={showAlert} textoAlert={textoAlert} close={() => this.setState({ showAlert: false })} />
				<div className="">
					<div className="info_perfil_config">
						<h1 className="titleRegister">Términos y condiciones</h1>
						<div className="w3-padding text_left">{parse(contenido)}</div>
					</div>
				</div>
			</React.Fragment >
		);
	}
}
export default Terminos;