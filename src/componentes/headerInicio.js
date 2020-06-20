import React from "react";
const HeaderInicio = (props) => {
	const registrar = () => { props["history"]["push"]("fixperto/registro"); }
	return (
		<React.Fragment>
			<div className="w3-bar w3-row-padding w3-border w3-card w3-padding-16">
				<div className="w3-quarter w3-container w3-center" >
					<img src="./assets/fixperto1.png" className="headerFixperto" alt="Norway" />
				</div>
				<div className="w3-half" ><p /></div>
				<div className="w3-quarter w3-container w3-center">
					<b onClick={()=>{}}>Home</b>
					<div className="w3-button w3-round-xlarge w3-margin-left w3-text-white"
						style={{ backgroundColor: "#43AECC" }} onClick={()=>{}}>Home</div>
				</div>
			</div>
		</React.Fragment >
	);
}
export default HeaderInicio;