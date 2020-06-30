import React from "react";
const HeaderExperto = (props) => {
	const cerrarSesion = () => {
		localStorage.setItem("@USER", JSON.stringify({}));
		props.history.push({ pathname: '/ingreso' });
	}
	return (
		<React.Fragment>
			<div className="w3-bar w3-cell-row w3-border padd-general flex-aling w3-white">
				<div className="w3-cell" style={{ width: 70 + "%" }}>
					<img src="../../assets/fixperto1.png" className="headerFixperto" alt="Norway" />
				</div>
			</div>
			<div className="w3-bar w3-border padd-general flex-aling fondPage w3-right" style={{ flexDirection: "row-reverse" }}>
				<div className="w3-row w3-text-white">
					<div className="w3-cell">
						<a href="https://www.fixperto.com/" target="_blank"><b>Home</b></a>
					</div>
					<div className="w3-cell">
						<button className="w3-button w3-round-xxlarge"
							style={{ marginLeft: 10 + "px", backgroundColor: "#42AFCA" }}
							onClick={() => { cerrarSesion() }}
						><b>Cerrar sesión</b></button>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default HeaderExperto;