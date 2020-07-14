import React from "react";
const Experto = ({ experto, history }) => {
	const typo = (experto["type"] === 0) ? "profesional/" : (experto["type"] === 1) ? "empresa/" : experto["type"];
	let response_time = "";
	if (experto["emergency"] === 1) {
		let hora = experto["response_time"].split(":");
		response_time = hora[0] + "h " + hora[1] + " min";
	}
	//	onPress={() => history.navigate("DatosExperto", { expert: experto["id"] })}
	return (
		<React.Fragment>
			<div className="w3-section w3-cell-row experto" onClick={()=>{alert("OK")}}>
				<div className="w3-cell" style={{ width: 20 + "%" }}>
					<img className="imagen-experto"
						src={"https://api.fixperto.com/uploads/registros/" + typo + "/" + experto["avatar"]} alt="Imagen">
					</img>
				</div>
				<div className="w3-cell">
					<div className="w3-margin-bottom">
						<div className="w3-row">
							<div className="w3-col s12 m12">
								{experto.plan === 1 &&
								<img src="../../../assets/iconos/experto_premium.png" style={{ width:90 + "px", marginLeft : 8 }} alt="Imagen" />}
							</div>
							<div className="w3-col s12 m12">
								<div className="w3-row certif">
										<div className="">
											<img src="../../../assets/iconos/certificado.png" className="imagen-icono" alt="Imagen" style={{position : "relative", left: 13}} />
										</div>
									<div className="">
										<div className="w3-cell w3-container">
											<img src="../../../assets/iconos/star.png" className="imagen-icono" style={{width : 18, height : 18}} alt="Imagen" />
										</div>
										<p className="w3-cell " style={{position : "relative", width : 10,  fontSize : 9}}>	{(!experto.evaluation) ? experto.evaluation : 'Sin calificación'} </p>
									</div>
								</div>
							</div>
							
						</div>
						<div className="w3-cell w3-container w3-row">
							<b style={{marginTop : 10}}>{experto.name}</b>
						</div>
						
					</div>
					<div className="w3-cell-row w3-margin-bottom">
						{(experto.type === 0 && experto.salud_pension) &&
							<div className="w3-cell">
								<div className="w3-cell w3-container">
									<img src="../../../assets/iconos/check.png" className="imagen-icono" alt="Imagen"  style={{width : 20, height : 20}}/>
								</div>
								<p className="w3-cell">Parafiscales</p>
							</div>
						}
						{(experto.type === 0 && experto.arl) &&
							<div className="w3-cell">
								<div className="w3-cell w3-container">
									<img src="../../../assets/iconos/check.png" className="imagen-icono" alt="Imagen" style={{width : 20, height : 20}} />
								</div>
								<p className="w3-cell">ARL</p>
							</div>
						}
					</div>
					{experto.insured === 1 &&
						<div className="w3-margin-bottom">
							<div className="w3-cell w3-container">
								<img src="../../../assets/iconos/asegurado.png" className="imagen-icono" alt="Imagen"style={{width : 20, height : 20}} />
							</div>
							<p className="w3-cell">Asegurado</p>
						</div>
					}
					{(experto["emergency"] === 1) && <div className="w3-margin-bottom" >
						<div className="w3-cell w3-container">
							<img src="../../../assets/iconos/emergencia.png" className="imagen-icono" alt="Imagen" style={{width : 20, height : 20}} />
						</div>
						<p className="w3-cell">{response_time}</p>
					</div>}
				</div>
			</div>
		</React.Fragment >
	);
}
export default Experto;