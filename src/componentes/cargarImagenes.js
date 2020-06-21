import React, { useState } from "react";
import httpClient from "../constantes/axios";
import axios from "axios";

const CambiarImagenes = (props) => {

    const onChange = (foto) =>{
        const data = new FormData();
        data.append("id", JSON.parse(localStorage.getItem("@USER")).typeId);
        data.append("docs", foto.target.files[0]);
        var photo   =  foto.target.files[0];
        var name    = foto.target.files[0]['name'];

        var reader = new FileReader();
		reader.onload = function (e) { photo =  e.target.result; }
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

                <div style={{ backgroundColor: "#DDDDDD", cursor: "pointer", width: 100 + "px", margin: "auto" }}>
                    <label htmlFor="img_avatar" style={{ color: "#676767" }}>Cambiar Imagen</label>
                </div>
            </div>
		</React.Fragment>
	)
}
export default CambiarImagenes