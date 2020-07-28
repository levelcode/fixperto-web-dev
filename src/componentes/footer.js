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
							<b>Descarga fixperto®</b>
						</div>
						<div className="w3-row imagenes_apps">
							<div className="w3-col s12 m6">
								<a href="https://play.google.com/store/apps/details?id=com.shiftactive.fixperto&hl=es_CO" target="_blank">
									<img src="../../assets/google-play.png" className="footerFixperto" alt="Norway" />
								</a>
							</div>

							<div className="w3-col s12 m6">
								<a href="https://www.apple.com/co/ios/app-store/" target="_blank">
									<img src="../../assets/app-store.png" className="footerFixperto" alt="Norway" />
								</a>
							</div>

						</div>
						<p style={{ fontSize: 10 + "px" }}>2020 fixperto Todos los derechos reservados</p>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default Footer;