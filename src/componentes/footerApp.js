import React from "react";
const FooterApp = (props) => {
	return (
		<React.Fragment>
			<div className="w3-bar fondPage w3-border-top w3-border-blue ">
				<div className="w3-quarter w3-container w3-section w3-center" >
					<img src="../../assets/fixperto.png" className="footerFixperto" alt="Norway" />
				</div>
				<div className="w3-half w3-right w3-section w3-text-white" >
					<b>Descarga fixperto</b>
					<div>
						<img src="../../assets/google_play.png" className="footerFixperto" alt="Norway" />
						<img src="../../assets/app_store.png" className="footerFixperto" alt="Norway" />
					</div>
					<p style={{ fontSize: 10 + "px" }}>2020 fixperto Todos los derechos reservados</p>
				</div>
			</div>
		</React.Fragment >
	);
}
export default FooterApp;