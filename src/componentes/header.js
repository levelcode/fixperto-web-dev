import React from "react";
import { Link } from "react-router-dom";
const Header = (props) => {
	return (
		<React.Fragment>
			<div className="w3-bar w3-cell-row w3-border w3-card padd-general flex-aling">
				<div className="w3-cell" style={{ width: 70 + "%" }}>
					<Link to="/ingreso">
						<img src="../../assets/fixperto1.png" className="headerFixperto" alt="Norway" />
					</Link>

				</div>
				<div className="w3-container w3-cell-row text-header">
					<div className="w3-cell">
						<a href="https://www.fixperto.com/"><b>Inicio</b></a>
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
export default Header;