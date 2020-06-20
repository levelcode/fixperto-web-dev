import React from "react";
const HeaderInicio = (props) => {
	return (
		<React.Fragment>
			<div className="w3-bar w3-cell-row w3-border w3-card w3-padding-16">
				<div className="w3-cell w3-container" style={{width:80+"%"}}>
					<img src="./assets/fixperto1.png" className="headerFixperto" alt="Norway" />
				</div>
				<div className="w3-cell w3-container w3-cell-row">
					<div className="w3-cell" style={{width:25+"px"}}>
						<b onClick={() => { }}>Home</b>
					</div>
					<div className="w3-cell">
						<p> | </p>
					</div>
					<div className="w3-cell" style={{width:25+"px"}}>
						<b onClick={() => { }}>Blog</b>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default HeaderInicio;


