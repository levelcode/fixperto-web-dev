import React from "react";
const Footer = (props) => {
	return (
		<React.Fragment>
			<div className="w3-bar fondPage w3-border-top w3-border-blue padd-footer flex-aling-footer">
				<div className="logo-footer" >
					<img src="./assets/fixperto.png" className="footerFixperto image" alt="Norway" />
				</div>
				<div className="w3-half w3-right w3-section w3-text-white apps" >
					<div className="w3-row">
						<div style={{ marginBottom: 10 + "px" }}>
							<b>Descarga fixperto</b>
						</div>
						<div className="w3-cell">
							<img src="./assets/google-play.png" className="footerFixperto" alt="Norway" />
						</div>
						<div className="w3-cell w3-container">
							<img src="./assets/app-store.png" className="footerFixperto" alt="Norway" />
						</div>
						<p style={{ fontSize: 10 + "px" }}>2020 fixperto Todos los derechos reservados</p>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default Footer;