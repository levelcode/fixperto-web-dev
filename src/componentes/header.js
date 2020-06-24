import React from "react";
const HeaderInicio = (props) => {
	return (
		<React.Fragment>
			<div className="w3-bar w3-cell-row w3-border w3-card padd-general flex-aling">
				<div className="w3-cell" style={{width:70+"%"}}>
					<img src="../../assets/fixperto1.png" className="headerFixperto" alt="Norway" />
				</div>
				<div className="w3-container w3-cell-row text-header">
					<div className="w3-cell">
						<b onClick={() => { }}>Home</b>
					</div>
					<div className="w3-cell">
						<p> | </p>
					</div>
					<div className="w3-cell" style={{width:25+"px"}}>
						<b onClick={() => { }}>Blog</b>
					</div>
					<div className="w3-cell" >
						<img src="../../assets/iconos/bell.png" style={{width:25+"px", marginLeft : 20}}/>
					</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default HeaderInicio;