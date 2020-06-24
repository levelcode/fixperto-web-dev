import React from "react";
import httpClient from "../constantes/axios";
import axios from "axios";

const CambiarImagenes = (props) => {

	const onChange = (foto) => {
		const data = new FormData();
		data.append("id", JSON.parse(localStorage.getItem("@USER")).typeId);
		data.append("docs", foto.target.files[0]);
		var photo = foto.target.files[0];
		var name = foto.target.files[0]['name'];

		var reader = new FileReader();
		reader.onload = function (e) { photo = e.target.result; }
		reader.readAsDataURL(foto.target.files[0]);

		axios({
			method: 'post',
			url: httpClient.urlBase + '/cliente/modAvatar',
			data: data, headers: { Accept: 'application/json' }
		})
			.then(function (response) {
				let responseJson = response["data"];
				if (responseJson["success"]) {
					props['mod'](photo, name);
				}
			})
	}


	return (
		<React.Fragment>
			<div>
				<input type="file" style={{ width: 0.1 + "px", height: 0.1 + "px", opacity: 0, overflow: "hidden", position: "absolute", zIndex: -1 }}
					id="img_avatar" onChange={onChange} accept="image/png, .jpeg, .jpg, image/gif" />

				<div style={{ backgroundColor: "#43AECC", cursor: "pointer", width: 40 + "px", height : 40,  margin: "auto", marginLeft: 0, marginTop: 5, padding : 5, borderRadius : 50 + "%", position : "absolute", top : 110, left : 100 }}>
					<label htmlFor="img_avatar" style={{ color: "white", textAlign: "center", fontWeight : "bold", }}> <img src="../../assets/iconos/photo_white.png" style={{width : 20, marginLeft : 5, marginTop : 5 }} /></label>
				</div>
			</div>
		</React.Fragment>
	)
}
export default CambiarImagenes