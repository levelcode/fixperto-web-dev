import React from "react";
const HeaderInicio = (props) => {
	return (
		<React.Fragment>
			<div className="w3-bar w3-cell-row w3-border w3-card padd-general flex-aling header-blanco">
				<div className="w3-cell" style={{ width: 70 + "%" }}>
					<img src="./assets/fixperto1.png" className="headerFixperto" alt="Norway" />
				</div>
				<div className="w3-container w3-cell-row text-header">
					<div className="w3-cell">
						<a href="https://www.fixperto.com/"><b>Home</b></a>
					</div>
					<div className="w3-cell">
						<p> | </p>
					</div>
					<div className="w3-cell" style={{ width: 25 + "px" }}>
						<a href="https://www.fixperto.com/blog/"><b>Blog</b></a>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default HeaderInicio;


